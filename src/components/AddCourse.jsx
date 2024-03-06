import React from 'react';
import styles from './TL.module.css'; // Import CSS module file
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  // Function to handle form submission
  const navigate = useNavigate();
  function routetohome() {
    navigate("/teacher");
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Retrieve email from localStorage
      const email = localStorage.getItem('token');
      if (!email) {
        throw new Error('Email not found in localStorage');
      }

      // Extract form data
      const formData = new FormData(event.target);
      const courseTitle = formData.get('title');
      const courseCode = formData.get('code');
      const regNumbers = formData.get('students');

      // Send POST request to API endpoint
      const response = await fetch('http://localhost:8000/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email:email,
          courseCode:courseCode,
          courseTitle:courseTitle,
          regNo: regNumbers,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add course');
      }

      // Reset form fields after successful submission
      event.target.reset();
      routetohome();
    } catch (error) {
      console.error('Error:', error);
      // Handle error here
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Add Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className={`form-label ${styles.formLabel}`} htmlFor="courseTitle">Course title :</label>
            <input type="text" id="courseTitle" className={`form-control ${styles.input}`} name="title" required />
          </div>
          <div className="mb-3">
            <label className={`form-label ${styles.formLabel}`} htmlFor="courseCode">Course Code :</label>
            <input type="text" id="courseCode" className={`form-control ${styles.input}`} name="code" required />
          </div>
          <div className="mb-3">
            <label className={`form-label ${styles.formLabel}`} htmlFor="regNumbers">Student Registration Numbers :</label>
            <textarea id="regNumbers" className={`form-control ${styles.input}`} name="students" required />
          </div>
          <button type="submit" className={`btn btn-primary btn-lg ${styles.button}`}>Add</button>
        </form>
      </div>
    </section>
  );
};

export default AddCourse;
