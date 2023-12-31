import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const AuthButton = ({ isLoggedIn, login, logout }) => {
  return isLoggedIn ? (
    <GoogleLogout
      clientId="187581357251-8g76ekmb55upcdrrdb8fduo2k1alu797.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
    />
  ) : (
    <GoogleLogin
      clientId="YOUR_GOOGLE_CLIENT_ID"
      buttonText="Login with Google"
      onSuccess={login}
      onFailure={login}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default AuthButton;
