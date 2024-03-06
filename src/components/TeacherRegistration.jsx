import React, { useState } from 'react';
import styles from './TR.module.css'; // Import CSS module file
import { useNavigate } from "react-router-dom";

const TeacherRegister = () => {
  // State variables for name, email, and password
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function routetohome() {
    navigate("/teacherLogin");
  }
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/teacherRegistration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name:name, email:email, password:password }),
      });

      if (response.status === 200) {
        // Registration successful
        alert('Registration successful! Please login with your credentials.');
        routetohome()
        // Redirect or do anything else you need after successful registration
      } else {
        // Registration failed, display error message
        alert('Registration failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle other errors here
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Teacher Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input 
              type="text" 
              name="name" 
              className={`form-control ${styles.input}`} 
              placeholder="Your name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
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
          <button type="submit" className={`btn btn-primary btn-lg ${styles.button}`}>Register</button>
        </form>
        <p className={styles.loginText}>Already have an account? <a href="/teacherLogin" className={styles.loginLink}>Login here</a></p>
      </div>
    </section>
  );
};

export default TeacherRegister;
