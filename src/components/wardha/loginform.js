import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
// import './Login.css';
import { loginapi2 } from './api';


// const BASE_URL = 'https://your-api-base-url'; // Replace with your actual API base URL

const decryptPassword = (password, encryptedPassword) => {
  // Implement your decryption logic here
  // For example, using bcrypt.compareSync:
  return bcrypt.compareSync(password, encryptedPassword);
};

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

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
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Call the loginapi2 function with the entered email and password
      const response = await loginapi2(email, password);

      console.log('API Response:', response);

      if (response.success) {
        // Decrypt the stored password from the API response using the decryptPassword function
        const decryptedPassword = decryptPassword(password, response.encryptedPassword);

        console.log('Entered Email:', email);
        console.log('Entered Password:', password);
        console.log('Decrypted Password:', decryptedPassword);

        if (decryptedPassword) {
          // Set isLoggedIn to true to trigger the login process
          setIsLoggedIn(true);
        } else {
          setErrorMessage('Invalid email or password');
        }
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('API request failed:', error);
      setErrorMessage('API request failed. Please try again later.');
    }
  };

  if (isLoggedIn) {
    // Replace this with your desired component/render when the user is logged in
    return <div>You are logged in!</div>;
  }

  return (
    <div className="login-container">
      <div className="white-box">
        <img src="JNMC_LOGO.png" alt="Logo" className="logo-login" />
        <h2 className="centered" style={{ fontFamily: 'Comic Sans MS', textAlign: 'center' }}>
           Meghe Institute of Higher Education & Research
        </h2>

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
          <p style={{ fontFamily: 'Comic Sans MS' }}>Energy Monitoring System</p>
          <img src="log.png" alt="Logo Right" className="heta-login" />
        </form>
      </div>
      <div className="bottom-bar">
        <p>
          © 2023 Copyright: Conceptualized, Designed, Installed & Maintained By <b>Heta Datain</b>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;