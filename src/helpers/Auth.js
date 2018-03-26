import auth0 from 'auth0-js';
import history from './History';

const {
  REACT_APP_AUTH0_CALLBACK,
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_CLIENT_ID
} = process.env;

const AUDIENCE = `https://${REACT_APP_AUTH0_DOMAIN}/userinfo`;

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: REACT_APP_AUTH0_DOMAIN,
    clientID: REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: REACT_APP_AUTH0_CALLBACK,
    audience: AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  userProfile;

  login = () => {
    this.auth0.authorize();
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/dashboard');
      } else if (err) {
        history.replace('/dashboard');
        console.log(err);
      }
    });
  }

  setSession = (authResult) => {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the dashboard route
    history.replace('/dashboard');
  }

  getProfile = (cb) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) return null;

    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  logout = () => {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.userProfile = null;
    history.replace('/');
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
