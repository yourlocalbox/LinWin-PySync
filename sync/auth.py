"""
Authentication module for LocalBox/loauth
"""
from pprint import pprint
from json import loads
from time import time
from .database import database_execute
from logging import getLogger

try:
    from urllib2 import urlopen
    from urllib import urlencode
    from urllib2 import HTTPError
except ImportError:
    from urllib.request import urlopen # pylint: disable=F0401,E0611
    from urllib.parse import urlencode # pylint: disable=F0401,E0611
    from urllib.error import HTTPError # Pylint: disable=F0401,E0611
from random import randint


# Time to take away from the expiration date before reauthenticating
# If zero, reauthentication will only happen when the token has expired
# If nonzero, it will reauthenticate EXPIRATION_LEEWAY seconds before
# expiration
EXPIRATION_LEEWAY = 5

class AuthenticationError(Exception):
    """
    Custom error class to signify problems in authentication
    """
    pass

def generate_client_id():
    """
    generate a client id
    """
    return 'id' + str(randint(1, 1000000000))


def generate_client_secret():
    """
    generate a client secret
    """
    return 'secret' + str(randint(1, 1000000000))

class Authenticator(object):
    """
    class implementing the authentication code
    """
    def __init__(self, authentication_url, label):
        self.authentication_url = authentication_url
        self.label = label
        self.client_id = None
        self.client_secret = None
        self.access_token = None
        self.expires = 0
        self.scope = None
        # todo:
        self.refresh_token = None
        self.load_client_data()


    def save_client_data(self):
        sql = "insert into sites (site, client_id, client_secret) values (?, ?, ?);"
        database_execute(sql, (self.label, self.client_id, self.client_secret))

    def load_client_data(self):
        sql = "select client_id, client_secret from sites where site = ?;"
        result = database_execute(sql, (self.label,))
        if result != [] and result != None:
            getLogger('auth').debug("loading data")
            self.client_id = str(result[0][0])
            self.client_secret = str(result[0][1])

    def has_client_credentials(self):
        if self.client_id != None and self.client_secret != None:
            return True
        else:
            return False
  

    def init_authenticate(self, username, password):
        """
        Do initial authentication with the resource owner password credentials
        """
        if (self.client_id is not None) or (self.client_secret is not None):
            raise AuthenticationError("Do not call init_authenticate w"
                                      "hen client_id and client_secret"
                                      " are already set")
        self.client_id = generate_client_id()
        self.client_secret = generate_client_secret()
        authdata = {'grant_type': 'password', 'username': username,
                    'password': password, 'client_id': self.client_id,
                    'client_secret': self.client_secret}
        self._call_authentication_server(authdata)
        if self.access_token != None:
            getLogger('auth').debug("Authentication Succesful. Saving Client Data")
            self.save_client_data()


    def authenticate(self):
        """
        Do authentication with the client credentials.
        """
        if (self.client_id == None) or (self.client_secret == None):
            raise AuthenticationError("Cannot authenticate on client c"
                                      "redentials without client_id an"
                                      "d client_secret")
        authdata = {'grant_type': 'client_credentials',
                    'client_id': self.client_id,
                    'client_secret': self.client_secret}
        self._call_authentication_server(authdata)


    def _call_authentication_server(self, authdata):
        """
        function responsible for the actual call to the authentication
        server and assignment of token data
        """
        request_data = urlencode(authdata).encode('utf-8')
        try:
            http_request = urlopen(self.authentication_url, request_data)
            json_text = http_request.read().decode('utf-8')
            json = loads(json_text)
            self.access_token = json.get('access_token')
            self.refresh_token = json.get('refresh_token')
            self.scope = json.get('scope')
            self.expires = time() + json.get('expires_in', 0) - EXPIRATION_LEEWAY
        except HTTPError as error:
            getLogger('auth').debug('HTTPError when calling the authentication server')
            if (error.code == 400):
                raise AuthenticationError()
            else:
                raise error


    def get_authorization_header(self):
        """
        Returns the Authorization header for authorizing against the
        LocalBox server proper.
        """
        if self.access_token is None and self.client_id is None and self.client_secret is None:
            raise AuthenticationError("Please authenticate with resource owner credentials first")
        if time() > self.expires:
            getLogger('auth').debug("Reauthenticating")
            self.authenticate()
        return 'Bearer ' + self.access_token
