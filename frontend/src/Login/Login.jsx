import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';

import calmBackground from "../assets/images/mode1.gif";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loginLoader, setLoginLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginLoader(true);
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.userID);
      onLogin();
      setLoginLoader(false);
      navigate('/play');
    } catch (error) {
      setLoginLoader(false);
      if (error.response && error.response.status === 400) {
        setError('User not found. Please register first.');
      } else {
        setError(error.response?.data.message || 'Error logging in');
      }
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div
      className={styles.loginWrapper}
      style={{
        backgroundImage: `url(${calmBackground})`,
      }}
    >
      <div className={styles.formWrapper}>
        <div className={styles.mainTitle}>
          WonderCards
        </div>
        <div className={styles.formContainer}>

          <div className={styles.titleWrapper}>
            <div>Login</div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className={styles.input}
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={styles.input}
            />
          </div>
          <div className={styles.buttonsWrapper}>

            <button onClick={handleSubmit} className={`${styles.button} ${styles.loginButton}`}>
              {
                !loginLoader
                  ? 'Login'
                  : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="16" strokeDashoffset="16" d="M12 3c4.97 0 9 4.03 9 9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="16;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path><path strokeDasharray="64" strokeDashoffset="64" strokeOpacity="0.3" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="64;0"/></path></g></svg>
              }
              
            </button>
            <button type="button" onClick={handleRegisterRedirect} className={`${styles.button} ${styles.registerButton}`}>
              Register
            </button>
          </div>
          {error.length > 0 && <div className={styles.errorsWrapper}>
            {error && <p className={styles.error}>{error}</p>}
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Login;