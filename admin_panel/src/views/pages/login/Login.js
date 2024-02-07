// AdminLoginForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useHistory hook
import './Login.css'; // Import the CSS file
import http from "../../../utils/http-client";

const AdminLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Create a history object

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await http.post('/admin_login', {
        username,
        password,
      });

      
      console.log(response.data);

      // If login is successful, redirect to the dashboard
      if (response.data.status === "success") {
                   
        navigate('/dashboard');
    } else {
        alert("Login failed. " + response.data.message);
    }


    } catch (error) {
      console.error(error.message);
    }
  };


  

  return (
    <section className='login-page'>
      <div className="login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          <button className='login-btn' type="submit">Login</button>
        </form>
      </div>
    </section>
  );
};

export default AdminLoginForm;
