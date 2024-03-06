import React, { useState } from 'react';
import styles from './TL.module.css'; // Import CSS module file
import { useNavigate } from "react-router-dom";

const BiometricAttendanceData = () => {
  // State variables for form inputs
  const navigate = useNavigate();
  function routetohome() {
    navigate("/teacher");
  }
  const urlSearchParams = new URLSearchParams(window.location.search);
  const courseId = urlSearchParams.get("id");
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [machine, setMachine] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert start and end date-time to seconds
      const startTimeInSeconds = new Date(start).getTime() / 1000;
      const endTimeInSeconds = new Date(end).getTime() / 1000;

      const response = await fetch('http://localhost:8000/api/biometric', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: courseId, start: startTimeInSeconds, end: endTimeInSeconds, machine:machine }),
      });

      if (response.status!=201) {
        throw new Error('Failed to start biometric attendance');
      }

      // Reset form inputs after successful submission
      setStart('');
      setEnd('');
      setMachine('');
      routetohome();
    } catch (error) {
      console.error('Error:', error);
      // Handle error here
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Biometric Attendance</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className={`form-label ${styles.formLabel}`} htmlFor="start">Starting time :</label>
            <input 
              type="datetime-local" 
              id="start" 
              className={`form-control ${styles.input}`} 
              name="start" 
              value={start} 
              onChange={(e) => setStart(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className={`form-label ${styles.formLabel}`} htmlFor="end">Ending time :</label>
            <input 
              type="datetime-local" 
              id="end" 
              className={`form-control ${styles.input}`} 
              name="end" 
              value={end} 
              onChange={(e) => setEnd(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className={`form-label ${styles.formLabel}`} htmlFor="machine">Enter machine number :</label>
            <input 
              type="number" 
              id="machine" 
              className={`form-control ${styles.input}`} 
              name="machine" 
              value={machine} 
              onChange={(e) => setMachine(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className={`btn btn-primary btn-lg ${styles.button}`}>Start</button>
        </form>
      </div>
    </section>
  );
};

export default BiometricAttendanceData;
