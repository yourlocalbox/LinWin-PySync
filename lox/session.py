'''

Module that controls synchronization session per account

Usage:

    import config
    from session import Session
    
    for Name in config.sessions()
        S = Session(Name)

'''
import os
import mimetypes
import time
from datetime import datetime
from threading import Thread
import Queue
import traceback
import iso8601
from api import LoxApi
from logger import LoxLogger
import config
from error import LoxError
from cache import LoxCache

class FileInfo:
    '''
    Simple class used as record/struct of file info
    '''
    isdir = None
    modified = None
    size = None



class LoxSession(Thread):
    '''
    Class that definess the session to synchronize a local folder with a LocalBox store
    '''

    def __init__(self,Name):
        Thread.__init__(self)
        self.name = Name
        cache_name = os.environ['HOME']+'/.lox/.'+Name+'.cache'
        self.__cache = LoxCache(cache_name)
        local_dir = config.session(Name)['local_dir']
        self.root = os.path.expanduser(local_dir)
        self.logger = LoxLogger(Name)
        self.api = LoxApi(Name)
        self.queue = Queue.Queue()
        self.interval = float(config.session(Name)['interval'])
        self.running = True

    def run(self):
        while self.running:
            self.sync()
            time.sleep(self.interval)

    def sync(self,Path='/'):
        self.reconcile(Path)
        Worker = Thread(target=self._sync_worker)
        Worker.daemon = True
        Worker.start()
        self.queue.join()
        #while not self.queue.empty():
        #    time.sleep(2)
        time.sleep(5) # UGLY!!
        
    def _sync_worker(self):
        while True:
            path = self.queue.get()
            try:
                local = self.file_info_local(path)
                remote = self.file_info_remote(path)
                cached = self.file_info_cache(path)
                action = self.resolve(local,remote,cached)
                self.logger.info("Resolving '%s' leads to %s" %(path,action.__name__))
                action(path)
            except Exception as e:
                traceback.print_exc()
            self.queue.task_done()
                
    def reconcile(self,path):
        self.logger.debug("Reconcile: %s" % path)
        # fetch local directory
        local_files = set()
        local_dir = self.root+path
        if os.path.isdir(local_dir):
            for item in os.listdir(local_dir):
                filename = os.path.join(path,item)
                local_files.add(filename)
        else:
            raise LoxError('Not a directory (local)')
        # fetch remote directory
        remote_files = set()
        meta = self.api.meta(path)
        if meta[u'is_dir']:
            if u'children' in meta:
                for child_meta in meta[u'children']:
                    child_path = child_meta[u'path']
                    remote_files.add(child_path)
        else:
            raise LoxError('Not a directory (remote)')
        # reconcile
        files = local_files | remote_files
        for f in files:
            self.logger.debug("Added to queue '%s'" % f)
            self.queue.put(f)

    def resolve(self,Local,Remote,Cached):
        '''
        Resolve what to do
        Original rules are given as comment
        FileInfo is always given so 'FileInfo unknown' is uniformly translated with 'FileInfo.size is None'
        '''
        print "    [DEBUG] local:  ",Local.isdir,Local.modified,Local.size
        print "    [DEBUG] remote: ",Remote.isdir,Remote.modified,Remote.size
        print "    [DEBUG] cached: ",Cached.isdir,Cached.modified,Cached.size
        #-------------------
        #resolve({file   ,Modified ,Size },{file   ,Modified ,Size },{file   ,Modified ,Size }) -> same;
        if (Local.isdir==Remote.isdir==Cached.isdir and 
                Local.modified==Remote.modified==Cached.modified and 
                Local.size==Remote.size==Cached.size):
            return self.same
        #resolve({dir    ,_        ,_    },{dir    ,_        ,_    },{dir    ,_        ,_    }) -> walk_dir;
        if (Local.isdir and Remote.isdir and Cached.isdir):
            return self.walk
        #resolve({dir    ,_        ,_    },{dir    ,_        ,_    },unknown                  ) -> update_and_walk;
        if (Local.isdir and Remote.isdir and Cached.size is None):
            return self.update_and_walk
        #resolve(unknown                  ,{_Type  ,_Modified,_Size},unknown                  ) -> download;
        if (Local.size is None and not (Remote.size is None) and Cached.size is None):
            return self.download
        #resolve({_Type  ,_Modified,_Size},unknown                  ,unknown                  ) -> upload;
        if (not (Local.size is None) and Remote.size is None and Cached.size is None):
            return self.upload
        #resolve({file   ,Modified ,Size },{file   ,Modified ,Size },unknown                  ) -> update_cache;
        if (Local.isdir==Remote.isdir==False and 
                Local.modified==Remote.modified and 
                Cached.size is None):
            return self.update_cache
        #resolve({file   ,ModifiedL,SizeL},{file   ,ModifiedR,_    },{file   ,ModifiedL,SizeL}) when ModifiedR > ModifiedL -> download;
        if (Local.isdir==Remote.isdir==Cached.isdir==False and 
                Local.modified < Remote.modified and 
                Local.modified == Cached.modified and 
                Local.size == Cached.size):
            return self.download
        #resolve({file   ,ModifiedL,_    },{file   ,ModifiedR,SizeR},{file   ,ModifiedR,SizeR}) when ModifiedL > ModifiedR -> upload;
        if (Local.isdir==Remote.isdir==Cached.isdir==False and 
                Local.modified > Remote.modified and 
                Remote.modified == Cached.modified and 
                Remote.size == Cached.size):
            return self.download
        #resolve({file   ,Modified ,Size },unknown                  ,{file   ,Modified ,Size }) -> delete_local;
        if (Local.isdir==Cached.isdir==False and
                Remote.size is None and
                Local.modified == Cached.modified and
                Local.size == Cached.size):
            return self.delete_local
        #resolve(unknown                  ,{file   ,Modified ,Size },{file   ,Modified ,Size }) -> delete_remote;
        if (Remote.isdir==Cached.isdir==False and
                Local.size is None and
                Remote.modified == Cached.modified and
                Remote.size == Cached.size):
            return self.delete_remote
        #resolve({dir    ,_        ,_    },unknown                  ,{dir    ,_        ,_    }) -> delete_local;
        if (Local.isdir==Cached.isdir==True 
                and Remote.size is None):
            return self.delete_local
        #resolve(unknown                  ,{dir    ,_        ,_    },{dir    ,_        ,_    }) -> delete_remote;
        if (Remote.isdir==Cached.isdir==True and
                Local.size is None):
            return self.delete_remote
        #resolve({file   ,_        ,_    },{dir    ,_        ,_    },{_      ,_        ,_    }) -> conflict;
        #resolve({dir    ,_        ,_    },{file   ,_        ,_    },{_      ,_        ,_    }) -> conflict;
        if (Local.isdir != Remote.isdir):
            return self.conflict
        #resolve(unknown                  ,unknown                  ,unknown                  ) -> strange;
        if (Local.size is None and Remote.size is None and Cached.size is None):
            return self.strange
        #resolve(_OtherL                  ,_OtherR                  ,_OtherC                  ) -> not_resolved.
        return self.not_resolved

    def file_info_local(self,path):
        fullpath = self.root+path
        f = FileInfo()
        if os.path.exists(fullpath):
            f.isdir = os.path.isdir(fullpath)
            mtime = os.path.getmtime(fullpath)
            m = datetime.utcfromtimestamp(mtime)
            # normalize the date with a timezone and omit microseconds (UGLY)
            f.modified = datetime(m.year,m.month,m.day,m.hour,m.minute,m.second,tzinfo=iso8601.UTC)
            if f.isdir:
                files = os.listdir(fullpath)
                f.size = len(files)
            else:
                f.size = os.path.getsize(fullpath)
        return f

    def file_info_remote(self,path):
        f = FileInfo()
        meta = self.api.meta(path)
        if not (meta is None):
            f.isdir = meta[u'is_dir']
            modified_at = meta[u'modified_at']
            f.modified = iso8601.parse_date(modified_at)
            if f.isdir:
                if u'children' in meta:
                    files = meta[u'children']
                    f.size = len(files)
                else:
                    f.size = 0
            else:
                f.size = meta[u'size']
        return f

    def file_info_cache(self,path):
        key = path.encode('utf8')
        file_info = self.__cache.get(key,FileInfo())
        return file_info

    # actions
    def same(self,path):
        pass
    
    def walk(self,path):
        self.reconcile(path)
    
    def update_cache(self,path):
        file_info = self.file_info_local(path)
        self.__cache[path] = file_info

    def update_and_walk(self,path):
        file_info = self.file_info_local(path)
        self.__cache[path] = file_info
        self.reconcile(path)

    def download(self,path):
        self.logger.info("Download %s" % path)
        meta = self.api.meta(path)
        if not (meta is None):
            filename = self.root+path
            if meta[u'is_dir']:
                os.mkdir(filename)
                if u'children' in meta:
                    for child_meta in meta[u'children']:
                        child_path = child_meta[u'path']
                        # put in worker queue?
                        self.download(child_path)
            else:
                contents = self.api.download(path)
                f = open(filename,'wb')
                f.write(contents)
                f.close()
                modified_at = meta[u'modified_at']
                modified = iso8601.parse_date(modified_at)
                mtime = self._totimestamp(modified)
                os.utime(filename,(os.path.getatime(filename),mtime))
                # update cache
                file_info = FileInfo()
                file_info.isdir = False
                file_info.modified = modified
                file_info.size = os.path.getsize(filename)
                self.__cache[path] = file_info
            
    def upload(self,path):
        self.logger.info("Upload %s" % path)
        local_dir = self.root+path
        if os.path.isdir(local_dir):
            self.api.create_folder(path)
            for item in os.listdir(local_dir):
                filename = os.path.join(path,item)
                self.upload(filename)
            file_info = self.file_info_local(path)
            self.__cache[path] = file_info
        else:
            # (1) file timestamp must be same as on server after upload, can this be done more efficient?
            content_type,encoding = mimetypes.guess_type(path)
            filename = self.root+path
            f = open(filename,'rb')
            contents = f.read()
            f.close()
            self.api.upload(path,content_type,contents)
            # file timestamp must be same as on server:
            # (1) can this be done more efficient?
            # (2) put in separate function _touch()?
            meta = self.api.meta(path)
            modified_at = meta[u'modified_at']
            modified = iso8601.parse_date(modified_at)
            mtime = self._totimestamp(modified)
            os.utime(filename,(os.path.getatime(filename),mtime))
            # update cache
            file_info = FileInfo()
            file_info.isdir = False
            file_info.modified = modified
            file_info.size = os.path.getsize(filename)
            self.__cache[path] = file_info

    def delete_local(self,path):
        self.logger.debug("Delete (local) %s" % path)
        full_path = self.root+path
        if os.path.isdir(full_path):
            for item in os.listdir(full_path):
                filename = os.path.join(path,item)
                self.delete_local(filename)
            os.rmdir(full_path)
            del self.__cache[path]
        else:
            os.remove(full_path)
            del self.__cache[path]
            
    def delete_remote(self,path):
        self.logger.debug("Delete (remote) %s" % path)
        meta = self.api.meta(path)
        if not (meta is None):
            if meta[u'is_dir']:
                if u'children' in meta:
                    for child_meta in meta[u'children']:
                        child_path = child_meta[u'path']
                        self.delete_remote(child_path)
            self.api.delete(path)
            del self.__cache[path]

            
    def conflict(self,path):
        
        # (1) download remote to tmp/unique file (like maildir) 
        # (2) rename local with .conflict_nnnn extension
        # (3) hard link to tmp with orignal filename
        # (4) delete tmp/unique
        pass
    
    def strange(self,path):
        self.logger.error("Resolving "+path+" led to strange situation")

    def not_resolved(self,path):
        self.logger.error(path+" could not be resolved")

    # INTERNALS
    # move this conversion functio to a library?
    
    def _totimestamp(self,dt, epoch=datetime(1970,1,1,tzinfo=iso8601.UTC)):
        td = dt - epoch
        # return td.total_seconds()
        return (td.microseconds + (td.seconds + td.days * 24 * 3600) * 10**6) / 1e6 

    # TODO: make real short tempname based on internal timer
    def _tmpname(self):
        return "AF3D48"