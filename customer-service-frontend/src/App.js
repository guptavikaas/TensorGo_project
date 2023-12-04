// App.js

import React, { useState } from 'react';
import AuthButton from './components/AuthButton';
import CustomerServiceForm from './components/CustomerServiceForm';
import CustomerServiceRequests from './components/CustomerServiceRequests';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (response) => {
    setLoggedIn(true);
    setUser(response.profileObj);
  };

  const logout = () => {
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <div>
      <h1>Customer Service App</h1>
      <AuthButton isLoggedIn={isLoggedIn} login={login} logout={logout} />
      {isLoggedIn && (
        <div>
          <p>Welcome, {user?.name}!</p>
          <CustomerServiceForm user={user} />
          <CustomerServiceRequests />
        </div>
      )}
    </div>
  );
};

export default App;
