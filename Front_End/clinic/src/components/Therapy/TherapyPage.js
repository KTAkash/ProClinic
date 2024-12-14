import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TherapyPage = () => {
  const [therapies, setTherapies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all therapies when the page loads
  useEffect(() => {
    const fetchTherapies = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8085/therapy/get');
        setTherapies(response.data);
      } catch (error) {
        console.error('Error fetching therapies:', error);
        alert('Failed to load therapy data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTherapies();
  }, []);

  // Inline styles
  const containerStyle = {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#4caf50',
    fontSize: '2rem',
    marginBottom: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const thStyle = {
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '12px',
    textAlign: 'left',
  };

  const tdStyle = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #f1f1f1',
  };

  const loadingStyle = {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#007bff',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>All Therapy Requests</h2>
      {loading ? (
        <p style={loadingStyle}>Loading...</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Address</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Title of Therapy</th>
            </tr>
          </thead>
          <tbody>
            {therapies.length > 0 ? (
              therapies.map((therapy, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{therapy.patientName}</td>
                  <td style={tdStyle}>{therapy.patientAddress}</td>
                  <td style={tdStyle}>{therapy.patientPhone}</td>
                  <td style={tdStyle}>{therapy.titleOfTherapy}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={tdStyle}>
                  No therapy requests available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TherapyPage;
