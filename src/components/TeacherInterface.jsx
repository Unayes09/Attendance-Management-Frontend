import React, { useState, useEffect } from 'react';
import styles from './TI.module.css'; // Import CSS module

function TeacherInterface() {
  // State variable to store course data
  const [courses, setCourses] = useState([]);
  const [email,setEmail] = useState('');
  useEffect(() => {
    // Function to fetch course data
    const fetchCourseData = async () => {
      try {
        // Get teacher email from local storage
        const teacherEmail = localStorage.getItem('token');
        if (!teacherEmail) {
          throw new Error('Teacher email not found');
        }
        const response = await fetch(`http://localhost:8000/api/course?teacher=${encodeURIComponent(teacherEmail)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
        const data = await response.json();
        setCourses(data.course); // Update state with fetched data
        setEmail(data.email)
      } catch (error) {
        console.error('Error:', error);
        // Handle error here
      }
    };

    fetchCourseData(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs only once after initial render
  // Function to handle course deletion
  const handleDelete = async (courseId,code) => {
    const confirmation = window.confirm(`Do you want to delete the course with code ${code}?`);
    if (confirmation) {
      try {
        const response = await fetch('http://localhost:8000/api/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ courseId:courseId }),
        });

        if (!response.ok) {
          throw new Error('Failed to delete course');
        }

        // Remove the deleted course from the local state
        setCourses(courses.filter(course => course._id !== courseId));
      } catch (error) {
        console.error('Error:', error);
        // Handle error here
      }
    }
  };

  return (
    <div className={styles.containerFluid}>
      <section className={styles.vh100}>
        <div className={styles.py0 + ' ' + styles.h100}>
          <div className={styles.row + ' ' + styles.justifyContentCenter + ' ' + styles.alignItemsCenter + ' ' + styles.h100}>
            <div className={styles.card + ' ' + styles.w100 + ' ' + styles.rounded3}>
              <div className={styles.cardBody + ' ' + styles.p0}>
                <h4 className={styles.textCenter + ' ' + styles.my3 + ' ' + styles.pb3 + ' ' + styles.cardTitle}>Shahjalal University of Science and Technology</h4>
                <h6 className={styles.textCenter + ' ' + styles.my3 + ' ' + styles.pb1 + ' ' + styles.courseInfo}>Teacher's email : {email}   |   Added course : {courses.length}</h6>

                <div className={styles.row + ' ' + styles.rowColsLgAuto + ' ' + styles.g3 + ' ' + styles.justifyContentCenter + ' ' + styles.alignItemsCenter + ' ' + styles.mb4 + ' ' + styles.pb2}>
                  <div className="col-12">
                    <a href="/add">
                      <button type="submit" className={`btn btn-primary ${styles.buttons}`}>Add new course</button>
                    </a>
                  </div>
                </div>

                <table className={styles.table + ' ' + styles.mb4 + ' ' + styles.ms4}>
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Course code</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{course.course_code}</td>
                        <td>
                          <a href={"/biometric?id="+course._id}><button type="submit" className={`btn ${styles.button_biometric}`}>Start Biometric Attendance</button></a>
                          <a href={"/manual?id="+course._id}><button type="submit" className={`btn ${styles.button_manual}`}>Start Manual Attendance</button></a>
                          <a href={"/attendance?id="+course._id}><button type="submit" className={`btn ${styles.button_report}`}>Attendance Report</button></a>
                          <button type="submit" onClick={() => handleDelete(course._id,course.course_code)} className={`btn ${styles.button_delete}`}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TeacherInterface;
