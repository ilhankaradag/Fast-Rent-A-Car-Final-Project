import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="home">
      <h1>Login</h1>
      <Link to="/register">Create new user</Link>
    </div>
  );
};

export default Login;
