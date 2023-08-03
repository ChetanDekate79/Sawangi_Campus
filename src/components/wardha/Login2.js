// Login.js
import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import './Login.css';
import logo from './Login.js';
import Top_Bar from './too_bar';
import Sidebar_wardha from './side_bar';
import TopBar from './Top';
import {loginapi2, decryptPassword } from './api';

function Login2() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [apiData, setApiData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  // useEffect(() => {
  //   fetchData();
  // }, []);


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsButtonDisabled(!e.target.value);
    setErrorMessage('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginResponse = await loginapi2(email, password);

      if (loginResponse && loginResponse.message === 'Login successful') {
        setIsLoggedIn(true);
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('API request failed:', error);
      setErrorMessage('Invalid email or password');
    }
  };
  

  useEffect(() => {
    if (isLoggedIn) {
      // Perform successful login logic here
      console.log('Successful login');
    }
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return (
      <div>
        <Sidebar_wardha />
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="white-box">
        <img src="JNMC_LOGO.png" alt="Logo" className="logo-login" />
        <h2 className="centered" style={{ fontFamily: 'Comic Sans MS', textAlign: 'center' }}>Datta Meghe Institute of Higher Education & Research</h2>
 
        <form onSubmit={handleSubmit} className="form1">
          <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
          <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          <div className="button-container">
            <button type="submit" disabled={isButtonDisabled}>
              Submit
            </button>
          </div>
          {errorMessage && (
            <div className="error-container">
              <p className="error-message">{errorMessage}</p>
            </div>
          )}
          <p    style={{
      fontFamily: "Comic Sans MS",
    }}>Energy Monitoring System</p>
          <img src="log.png" alt="Logo Right" className="heta-login" />
        </form>
      </div>
      <div className="bottom-bar">
        <p>
          © 2023 Copyright: Conceptualized, Designed, Installed & Maintained
          By <b>Heta Datain</b>
        </p>
      </div>
    </div>
  );
}

export default Login2;
