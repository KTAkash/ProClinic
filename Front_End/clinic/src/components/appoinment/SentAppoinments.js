
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Appoinments.css'; // Import the shared CSS file
import { useNavigate } from 'react-router-dom';

const SentAppointments = () => {
  const navigate = useNavigate();
  const [sentAppointments, setSentAppointments] = useState([]);
  

  useEffect(() => {
    axios.get('http://localhost:8085/sa/sent')
      .then((response) => {
        setSentAppointments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching sent appointments:', error);
      });
  }, []);

  return (
    <div className="appointments-container">
      
      <h2 className="appointments-header">Sent Appointments</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th>Phone Number</th>
            <th>Date</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {sentAppointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.userName}</td>
              <td>{appointment.userEmail}</td>
              <td>{appointment.phoneNumber}</td>
              <td>{appointment.date}</td>
              <td>{appointment.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default SentAppointments;
