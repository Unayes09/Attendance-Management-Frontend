import React, { useState } from 'react';
import axios from 'axios';
import styles from './Admin.module.css'; // Import CSS file

function Admin() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);
      await axios.post('http://localhost:8000/process-all-timeslots');
      alert('Timeslots processed successfully.');
    } catch (error) {
      console.error('Error processing timeslots:', error);
      alert('An error occurred while processing timeslots.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }
  };

  return (
    <div className={`${styles.admincontainer}`}>
      <div className={`${styles.adminbox}`}>
        <h1>Welcome to Admin Panel</h1>
        <p>Manage your CSV files and process timeslots here.</p>
        <div className={`${styles.fileupload}`}>
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <button className={`${styles.uploadbutton}`} onClick={handleUpload}>Upload</button>
        </div>
        <button className={`${styles.refreshbutton}`} onClick={handleRefresh} disabled={loading}>
          {loading ? 'Processing...' : 'Count Attendance'}
        </button>
      </div>
    </div>
  );
}

export default Admin;
