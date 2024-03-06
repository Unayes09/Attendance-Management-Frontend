import React,{useState} from 'react';
import styles from './SL.module.css';

const StudentLogin = () => {
  const [reg,setReg] = useState('');
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div>
          <h1>SUST</h1>
          <p>Shahjalal University of Science and Technology</p>
          <p>Student can see their attendance report from here.</p>
        </div>
        <div>
          <div action="" method="post">
            <div className="form-outline">
              <input
                type="text"
                id="form3Example2"
                className="form-control"
                name="reg"
                placeholder="Registration number"
                onChange={async(e)=>{setReg(e.target.value)
                }}
              />
            </div>

            <a href={"/report?key="+reg}>
              {/* Submit button */}
              <button type="submit" className={`btn btn-primary btn-block mb-4 ${styles.btnPrimary}`}>
                See Report
              </button>
            </a>
            {/*Change this div into form,i change it for just see.*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
