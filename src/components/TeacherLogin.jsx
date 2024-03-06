import React, { useState } from 'react';
import styles from './TL.module.css'; // Import CSS module file
import { useNavigate } from "react-router-dom";

const TeacherLogin = () => {
  // State variables for email and password
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function routetohome() {
    navigate("/teacher");
  }
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/teacherLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:email, password:password }),
      });
      if (response.status === 401) {
        // Alert for wrong email or password
        alert('Email or password is wrong');
      } else if (response.status === 200) {
        // Login successful, extract token from response
        const data = await response.json();
        const token = data.token
        // Save token to localStorage
        localStorage.setItem('token', token);
        routetohome();
        // Redirect or do anything else you need after successful login
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle other errors here
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Teacher Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input 
              type="email" 
              name="email" 
              className={`form-control ${styles.input}`} 
              placeholder="Your Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <input 
              type="password" 
              name="password" 
              className={`form-control ${styles.input}`} 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className={`btn btn-primary btn-lg ${styles.button}`}>Login</button>
        </form>
        <p className={styles.loginText}>Don't have an account? <a href="/teacherRegister" className={styles.loginLink}>Register here</a></p>
      </div>
    </section>
  );
};

export default TeacherLogin;
