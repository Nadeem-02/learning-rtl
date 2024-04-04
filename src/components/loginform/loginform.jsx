import React, { useState } from 'react';
import './loginForm.css'; // Import CSS file

import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if(username.length > 0 && password.length > 0){
      navigate('/posts')
    }else{
      setTimeout(() => {
       setError('All fields are required.')
      }, 500)
    }
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  return (
    <div id="loginFormdiv">
    <h2>Login Form</h2>
    {error && <h5 className="error-msg">{error}</h5>}    
    <form role="form" className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          data-testid="passwordInput"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">Role:</label>
        <select title='role' id="role" value={role} onChange={handleRoleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            data-testid="rememberMe"
            onChange={handleRememberMeChange}
          />{' '}
          Remember Me
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
    </div>
  );
};

export default LoginForm;
