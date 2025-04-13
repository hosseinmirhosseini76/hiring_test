import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

import calmBackground from "../assets/images/memory-bg.gif";

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [regLoading, setRegLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      setMessage(response.data.message);
      setRegLoading(false)
      setTimeout(() => handleLoginRedirect(), 2000)
    } catch (error) {
      setMessage(error.response?.data.message || 'Error registering');
      setRegLoading(false)
      setTimeout(() => setMessage(''), 5000)
    }
  };

  return (
    <div
      className={styles.registerWrapper}
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
            <div>Register</div>
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
                !regLoading
                  ? 'Register'
                  : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="16" strokeDashoffset="16" d="M12 3c4.97 0 9 4.03 9 9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="16;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path><path strokeDasharray="64" strokeDashoffset="64" strokeOpacity="0.3" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="64;0"/></path></g></svg>
              }
              
            </button>
            <button type="button" onClick={handleLoginRedirect} className={`${styles.button} ${styles.registerButton}`}>
              Login
            </button>
          </div>
          {message.length > 0 && <div className={styles.errorsWrapper}>
            {message && <p className={styles.error}>{message}</p>}
          </div>}
        </div>
      </div>
    </div>











    /* <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Register
        </button>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div> */
  );
};

export default Register;