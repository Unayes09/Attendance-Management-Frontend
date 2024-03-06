import React, { useState, useEffect } from 'react';
import styles from './AR.module.css'; // Import CSS module

function AttendanceReport() {
  // State variables to store attendance data and courseId
  const [attendanceData, setAttendanceData] = useState([]);
  const [courseId, setCourseId] = useState('');

  useEffect(() => {
    // Function to fetch attendance data based on courseId
    const fetchAttendanceData = async () => {
      try {
        // Get courseId from URL search parameters
        const searchParams = new URLSearchParams(window.location.search);
        const courseIdParam = searchParams.get('id');
        if (!courseIdParam) {
          throw new Error('CourseId not found in URL parameters');
        }

        // Fetch attendance data from API using courseId
        const response = await fetch(`http://localhost:8000/api/student?id=${courseIdParam}`);
        if (!response.ok) {
          throw new Error('Failed to fetch attendance data');
        }
        const data = await response.json();
        setAttendanceData(data.courses.student);
        setCourseId(data.courses.course_code);
      } catch (error) {
        console.error('Error:', error);
        // Handle error here
      }
    };

    fetchAttendanceData(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs only once after initial render

  return (
    <div className={styles.container}>
      <div className={styles.title}>Shahjalal University of Science and Technology</div>
      <div className={styles.subtitle}>Attendance Report</div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <span className={styles.label}>Course Code:</span> {courseId}
        </div>
        <div className={styles.info}>
          <span className={styles.label}>Total Course:</span> {attendanceData.length}
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table className={`table table-striped ${styles.table}`}>
          <thead>
            <tr>
              <th scope="col">Registration No.</th>
              <th scope="col">Attendance</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((student, index) => (
              <tr key={index}>
                <td>{student.reg_no}</td>
                <td>{student.att}</td>
                <td>{student.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.printButtonContainer}>
          <button className={`btn btn-primary ${styles.printButton}`} onClick={() => window.print()}>Print</button>
        </div>
      </div>
    </div>
  );
}

export default AttendanceReport;
