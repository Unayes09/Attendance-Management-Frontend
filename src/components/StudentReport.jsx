import React, { useState, useEffect } from 'react';
import styles from './SR.module.css'; // Import CSS module

function StudentReport() {
  // State variables to store student data
  const urlSearchParams = new URLSearchParams(window.location.search);
  const student = urlSearchParams.get("key");
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to fetch student data based on registration number
  useEffect(() => {
    // Function to fetch student data
    const fetchStudentData = async () => {
      try {
        // Assuming you have an API endpoint to fetch student data by registration number
        const response = await fetch(`http://localhost:8000/api/report?student=${student}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setStudentData(data); // Update state with fetched data
        setLoading(false); // Set loading to false
      } catch (error) {
        setError(error.message); // Set error state if fetch fails
        setLoading(false); // Set loading to false
      }
    };

    fetchStudentData(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs only once after initial render

  // Render loading state if data is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error message if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Calculate total number of courses

  // Render the component with fetched data
  return (
    <div className={styles.container}>
      <div className={styles.title}>Shahjalal University of Science and Technology</div>
      <div className={styles.subtitle}>Student Report</div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <span className={styles.label}>Registration No:</span> {student}
        </div>
        <div className={styles.info}>
          <span className={styles.label}>Total Course:</span> {studentData.courses.length}
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table className={`table table-striped ${styles.table}`}>
          <thead>
            <tr>
              <th scope="col">Course Code</th>
              <th scope="col">Attendance</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {studentData.courses.map((course, index) => (
              <tr key={index}>
                <td>{course.course_code}</td>
                <td>{course.att}</td>
                <td>{course.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.printButtonContainer}>
        <button className={`btn btn-primary ${styles.printButton}`} onClick={() => window.print()}>Print</button>
      </div>
    </div>
  );
}

export default StudentReport;
