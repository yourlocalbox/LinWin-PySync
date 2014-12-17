'''

Module that implements authentication mechanisms

Usage:

    An authentication module implements both a header and a query part.

The OAuth2 class reads the following parameters from the configuration:

    [session]
    ...
    username=user
    password=userpasswd
    oauth_url=http://localhost/oauth



'''

import config
from logger import LoxLogger
from error import LoxError
from httplib import HTTPConnection,HTTPSConnection,HTTPResponse
import json
import time
import urlparse

class Auth:
    '''
    Abstract class to implement authentication plugins
    '''
    def __init__(self,Name):
        pass
        
    def _do_request(self,Method,Url,Body="",Headers={}):
        try:
            self.connection.connect()
            self.connection.request(Method,Url,Body,Headers)
            response = self.connection.getresponse()
        except Exception as e:
            raise LoxError("Error connecting to authentication server ("+str(e)+")")
        else:
            return response

    def _request(self):
        pass

    def header(self):
        pass
        
    def query(self):
        pass

class OAuth2(Auth):
    '''
    Class (plugin) for OAuth2 authentication
    '''

    client_id = "32yqjbq9u38koggk040w408cccss8og4c0ckso4sgoocwgkkoc" # taken from iOS app
    client_secret = "4j8jqubjrbi8wwsk0ocowooggkc44wcw0044skgscg4o4o44s4" # taken from iOS app

    def __init__(self,Name):
        self.grant_type = "password"
        self.username = config.session(Name)['username']
        self.password = config.session(Name)['password']
        url = config.session(Name)['auth_url']
        o = urlparse.urlparse(url)
        self.uri_path = o.path
        if o.path[-1:]!='/':
            self.uri_path +='/'
        if o.scheme == 'https':
            self.connection = HTTPSConnection(o.netloc,o.port)
        elif o.scheme == 'http' or o.scheme=='':
            self.connection = HTTPConnection(o.netloc,o.port)
        self.access_token = ""
        self.token_expires = 0

    def _request(self):
        url = self.uri_path
        url += "token"
        url += "?grant_type="+self.grant_type
        url += "&client_id="+self.client_id
        url += "&client_secret="+self.client_secret
        url += "&username="+self.username
        url += "&password="+self.password
        resp = self._do_request("GET",url)
        if resp.status == 200:
            data = json.loads(resp.read())
            self.access_token = str(data[u'access_token'])
            self.token_expires = time.time() + data[u'expires_in'] - 10 # invalidate 10 seconds before
        else:
            raise LoxError("Authentication failed, "+resp.reason)

    def header(self):
        if time.time() > self.token_expires:
            self._request()
        else:
            t = str(self.token_expires-time.time())
        return {"Authorization": "Bearer "+self.access_token}

    def query(self):
        "access_token="+self.access_token
        

class LinkedIn(Auth):
    '''
    Class (plugin) for LinkedIn authentication
    '''
    # TODO: find server that supports this and test
    #

    def __init__(self,Name):
        # API key and secret key to be delivered by server?
        # They are unique for redirect URL
        self.api_key = config.session(Name)['api_key']
        self.secret_key = config.session(Name)['secret_key']
        self.redirect_uri = config.session(Name)['redirect_uri']
        url = 'https://api.linkedin.com/uas/oauth2/'
        self.connection = httplib.HTTPSConnection(o.netloc,o.port)
        self.authorization_code = ""
        self.access_token = ""
        self.token_expires = 0
        self.state = "1234" # replace with random number

    def _request(self):
        url1 =self.uri_path
        url1 += "accessToken" # note: not 'token'
        url1 += "?response_type=code"
        url1 += "&redirect_uri="+self.redirect_uri
        url1 += "&client_id="+self.api_key 
        url1 += "&state="+self.state 
        resp = self._do_request("GET",url1)
        if resp.status == 301: # is it a 301 or other?
            loc = resp.header['Location']
            loc_parsed = urlparse.urlparse(loc)
            q = zurlparse.parse_qs(loc_parsed.query)
            self.authorization_code = q['code']
            if (not self.state == q['state']):
                raise LoxError("Authentication failed, CSRF")
        else:
            raise LoxError("Authentication failed, "+resp.reason)
        url2 =self.uri_path
        url2 += "accessToken" # note: not 'token'
        url2 += "?grant_type=authorization_code"
        url1 += "&redirect_uri="+self.redirect_uri
        url2 += "&code="+self.authorization_code
        url1 += "&client_id="+self.api_key 
        url1 += "&client_secret="+self.secret_key
        self._do_request("GET",url2)
        if resp.status == 200:
            data = json.loads(resp.read())
            self.access_token = str(data[u'access_token'])
            self.token_expires = time.time() + data[u'expires_in'] - 10 # invalidate 10 seconds before
        else:
            raise LoxError("Authentication failed, "+resp.reason)

    def header(self):
        if time.time() > self.token_expires:
            #print("refresh token")
            self._request()
        else:
            t = str(self.token_expires-time.time())
            #print("token expires after "+t+" seconds")
        return {"Authorization": "Bearer "+self.access_token}

    def query(self):
        "oauth2_access_token="+self.access_token