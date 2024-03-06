import React, { useState, useEffect } from 'react';
import styles from './MA.module.css'; // Import CSS module
import { useNavigate } from "react-router-dom";

function ManualAttendance() {
  // State to store manual attendance data
  const navigate = useNavigate();
  function routetohome() {
    navigate("/teacher");
  }
  const [attendanceData, setAttendanceData] = useState([]);
  const [code, setCode] = useState();

  // Function to fetch attendance data from the previous report
  const fetchAttendanceData = async () => {
    try {
      // Get courseId from URL search parameters
      const searchParams = new URLSearchParams(window.location.search);
      const courseId = searchParams.get('id');
      if (!courseId) {
        throw new Error('CourseId not found in URL parameters');
      }

      // Fetch attendance data from previous report using courseId
      const response = await fetch(`http://localhost:8000/api/student?id=${courseId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch attendance data');
      }
      const data = await response.json();
      const courses = data.courses
      setCode(courses.course_code)
      // Map student data into the required format
      const mappedData = courses.student.map(student => ({
        registrationNo: student.reg_no,
        attendance: '',
      }));

      setAttendanceData(mappedData);
    } catch (error) {
      console.error('Error:', error);
      // Handle error here
    }
  };

  useEffect(() => {
    fetchAttendanceData(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs only once after initial render

  // Handler function to update attendance data
  const handleAttendanceChange = (index, value) => {
    const newData = [...attendanceData];
    newData[index].attendance = value;
    setAttendanceData(newData);
  };

  // Function to submit manual attendance
  const handleSubmit = async () => {
    try {
      // Get courseId from URL search parameters
      const searchParams = new URLSearchParams(window.location.search);
      const courseId = searchParams.get('id');
      if (!courseId) {
        throw new Error('CourseId not found in URL parameters');
      }

      // Collect attendance data
      const attendance = attendanceData.map(({ registrationNo, attendance }) => ({
        reg_no: registrationNo,
        attendance: parseInt(attendance), // Parse attendance as integer
      }));

      // Get classes from input field
      const classes = document.getElementById('classesInput').value;

      // Send POST request to API
      const response = await fetch('http://localhost:8000/api/manual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId:courseId, classes:classes, attendance:attendance }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit manual attendance');
      }

      // Reset attendance data after successful submission
      setAttendanceData([]);
      routetohome();
    } catch (error) {
      console.error('Error:', error);
      // Handle error here
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Shahjalal University of Science and Technology</div>
      <div className={styles.subtitle}>Manual Attendance</div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <span className={styles.label}>Course Code:</span> {code}
        </div>
        <div className={styles.info}>
          <span className={styles.label}>Classes for Attendance:</span>
          <input type="number" id="classesInput" className={styles.input} />
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table className={`table table-striped ${styles.table}`}>
          <thead>
            <tr>
              <th scope="col">Registration No.</th>
              <th scope="col">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((data, index) => (
              <tr key={index}>
                <td>{data.registrationNo}</td>
                <td>
                  <input
                    type="number"
                    className={styles.input}
                    value={data.attendance}
                    onChange={(e) => handleAttendanceChange(index, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className={`btn btn-primary ${styles.button}`} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default ManualAttendance;
