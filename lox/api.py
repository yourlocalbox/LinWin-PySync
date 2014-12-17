'''

Module that implements communication with a LocalBox store

Usage: create an instance per account


'''

import config
import auth
from error import LoxError
from httplib import HTTPConnection,HTTPSConnection,HTTPResponse
import traceback
import urllib
import json
import time
import urlparse

class LoxApiResponse:
    
    status = None
    headers = None
    reason = None
    body = None
    
class LoxApi:
    '''
    Class that forms the API to a LocalBox store.
    Each instance containts its own HTTP(S)Connection, can be used to
    manage multiple connections.
    API calls are based on version 1.1.3
    '''

    def __init__(self,Name):
        authtype = config.session(Name)['auth_type']
        if authtype.lower() == 'oauth2':
            self.auth = auth.OAuth2(Name)
        else:
            raise LoxError('not supported')
        self.agent = {"Agent":"lox-client"} # use one time generated UUID in the future?
        url = config.session(Name)['lox_url']
        o = urlparse.urlparse(url)
        self.server = o.netloc
        self.port = o.port
        self.uri_path = o.path
        if o.path[-1:]!='/':
            self.uri_path +='/'
        if o.scheme == 'https':
            self.ssl = True
            #self.connection = HTTPSConnection(o.netloc,o.port)
        elif o.scheme == 'http' or o.scheme=='':
            self.ssl = False
            #self.connection = HTTPConnection(o.netloc,o.port)
        else:
            raise LoxError("Invalid server URL")


    def __do_request(self,Method,Url,Body="",Headers={}):
        try:
            response = LoxApiResponse()
            if self.ssl:
                connection = HTTPSConnection(self.server,self.port)
            else:
                connection = HTTPConnection(self.server,self.port)
            connection.connect()
            connection.request(Method,Url,Body,Headers)
            r = connection.getresponse()
            response.status = r.status
            response.reason = r.reason
            response.body = r.read()
            response.headers = r.getheaders()
            connection.close()
        except Exception as e:
            traceback.print_exc()
            raise LoxError("Error connecting to LocalBox server %s" % e)
        else:
            return response

    def identities(self,Begin):
        headers = self.auth.header()
        headers.update(self.agent)
        url = self.uri_path
        url += "lox_api/identities/"+Begin
        resp = self.__do_request("GET",url,"",headers)
        if resp.status == 200:
            return json.loads(resp.body)
        else:
            raise LoxError(resp.reason)

    def user_info(self):
        headers = self.auth.header()
        headers.update(self.agent)
        url = self.uri_path
        url += "lox_api/user"
        resp = self.__do_request("GET",url,"",headers)
        if resp.status == 200:
            return json.loads(resp.body)
        else:
            raise LoxError(resp.reason)

    def meta(self,path):
        headers = self.auth.header()
        headers.update(self.agent)
        url = self.uri_path
        url += "lox_api/meta/"+urllib.pathname2url(path)
        resp = self.__do_request("GET",url,"",headers)
        if resp.status == 200:
            return json.loads(resp.body)
        elif resp.status == 404:
            return None
        else:
            raise LoxError(resp.reason)

    def upload(self,path,content_type,body):
        headers = self.auth.header()
        headers.update(self.agent)
        headers.update({"Content-Type":content_type})
        url = self.uri_path
        url += "lox_api/files"+urllib.pathname2url(path)
        resp = self.__do_request("POST",url,body,headers)
        if resp.status != 201:
            raise LoxError(resp.reason)

    def download(self,path):
        headers = self.auth.header()
        headers.update(self.agent)
        url = self.uri_path
        url += "lox_api/files/"+urllib.pathname2url(path)
        resp = self.__do_request("GET",url,"",headers)
        if resp.status == 200:
            return resp.read()
        else:
            raise LoxError(resp.reason)

    def create_folder(self,path):
        headers = self.auth.header()
        headers.update(self.agent)
        headers.update({"Content-Type":"application/x-www-form-urlencoded"})
        url = self.uri_path
        url += "lox_api/operations/create_folder"
        body = "path="+urllib.pathname2url(path)
        resp = self.__do_request("POST",url,body,headers)
        if resp.status != 200:
            raise LoxError(resp.reason)

    def delete(self,path):
        headers = self.auth.header()
        headers.update(self.agent)
        headers.update({"Content-Type":"application/x-www-form-urlencoded"})
        url = self.uri_path
        url += "lox_api/operations/delete"
        body = "path="+urllib.pathname2url(path)
        resp = self.__do_request("POST",url,body,headers)
        if resp.status != 200:
            raise LoxError(resp.reason)

    def get_key(self,path):
        headers = self.auth.header()
        headers.update(self.agent)
        url = self.uri_path
        url += "lox_api/key/"+urllib.pathname2url(path)
        resp = self.__do_request("GET",url,"",headers)
        if resp.status == 200:
            return json.loads(resp.body)

    def set_key(self,path,user,key,iv):
        headers = self.auth.header()
        headers.update(self.agent)
        url = self.uri_path
        url += "lox_api/key/"+urllib.pathname2url(path)
        body = json.dumps({'username':user,'key':key,'iv':iv})
        resp = self.__do_request("POST",url,body,headers)
        if resp.status != 200:
            raise LoxError(resp.reason)
        else:
            resp.read()

    def key_revoke(self,path,user):
        headers = self.auth.header()
        headers.update(self.agent)
        url = self.uri_path
        url += "lox_api/key_revoke/"+urllib.pathname2url (path)
        body = json.dumps({'username':user})
        resp = self.__do_request("POST",url,body,headers)
        if resp.status != 200:
            raise LoxError(resp.reason)

    def invitations(self):
        headers = self.auth.header()
        headers.update(self.agent)
        url = self.uri_path
        url += "lox_api/invitations"
        resp = self.__do_request("GET",url,"",headers)
        if resp.status != 200:
            raise LoxError(resp.reason)

    def invite_accept(self,ref):
        headers = self.auth.header()
        headers.update(self.agent)
        url = self.uri_path
        url += "lox_api/invite/"+ref+"/accept"
        resp = self.__do_request("POST",url,"",headers)
        if resp.status == 200:
            return json.loads(resp.body)
        else:
            raise LoxError(resp.reason)

    def invite_revoke(self,ref):
        headers = self.auth.header()
        headers.update(self.agent)
        url = self.uri_path
        url += "lox_api/invite/"+ref+"/revoke"
        resp = self.__do_request("POST",url,"",headers)
        if resp.status == 200:
            return resp.body
        else:
            raise LoxError(resp.reason)

    def notifications(self):
        headers = self.auth.header()
        headers.update(self.agent)
        url = self.uri_path
        url += "notifications/unread/"
        headers.update({"X-Requested-With":"XMLHttpRequest"})
        resp = self.__do_request("GET",url,"",headers)
        if resp.status == 200:
            return json.loads(resp.body)
        else:
            raise LoxError(resp.reason)
