import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
import './AllAppoinments.css';

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all appointments from the backend
    axios.get('http://localhost:8085/sa/all')
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  }, []);

  const handleUpdate = (Id) => {
    // Navigate to the update page with the appointment ID as a parameter
    navigate(`/Update/${Id}`);
  };

  const handleDelete = (Id) => {
    // Delete the appointment from the backend
    axios.delete(`http://localhost:8085/sa/Appointment/delete/${Id}`)
      .then(() => {
        // Remove the deleted appointment from the UI
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== Id)
        );
        alert('Appointment deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting appointment:', error);
      });
  };

  const handleSend = (Id) => {
    // Mark the appointment as sent
    axios.put(`http://localhost:8085/sa/Appointment/send/${Id}`)
      .then(() => {
        // Update the appointment's sent status
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === Id ? { ...appointment, sent: true } : appointment
          )
        );
        alert('Appointment sent successfully');
      })
      .catch((error) => {
        console.error('Error sending appointment:', error);
      });
  };

  return (
    <div className="all-appointments-container">
      <h2 className="all-appointments-header">All Appointments</h2>
      <button><Link to="/send">View Confirmations</Link></button>
      <table className="table-appointments" border="1">
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th>Phone Number</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Action</th>
            <th>Confirmation</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.userName}</td>
              <td>{appointment.userEmail}</td>
              <td>{appointment.phoneNumber}</td>
              <td>{appointment.date}</td>
              <td>{appointment.reason}</td>
              <td>
                <button className="button-update" onClick={() => handleUpdate(appointment.id)}>Update</button>
                <button className="button-delete" onClick={() => handleDelete(appointment.id)}>
                  Delete
                </button>
              </td>
              <td>
                <button
                  className="button-send"
                  onClick={() => handleSend(appointment.id)}
                  disabled={appointment.sent}
                >
                  {appointment.sent ? 'Sent' : 'Send'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllAppointments;
