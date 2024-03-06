import React from 'react';
import styles from './Firstpage.module.css'; // Import CSS module file

const Firstpage = () => {
  return (
    <section className={styles.container}>
      <div className={styles.logo}>SUST</div>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Welcome to <br /> Attendance Management System
        </h1>
        <p className={styles.description}>
          Simplify attendance tracking with our advanced system. Join us now and experience seamless attendance management.
        </p>
        <div className={styles.buttons}>
          <a href='/teacherLogin'><button className={styles.button}>Teacher Login</button></a>
          <a href='/studentLogin'><button className={styles.button}>Student Login</button></a>
        </div>
      </div>
    </section>
  );
};

export default Firstpage;
