import { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom'; // Import useNavigate

function Newtherapy() {
  const [formData, setFormData] = useState({
    patientName: '',
    patientAddress: '',
    patientPhone: '',
    titleOfTherapy: '',
  });

  const [errors, setErrors] = useState({
    patientName: false,
    patientAddress: false,
    patientPhone: false,
    titleOfTherapy: false,
  });

  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false }); // Clear error for the field
  };

  const validateForm = () => {
    const newErrors = {
      patientName: !formData.patientName.trim(),
      patientAddress: !formData.patientAddress.trim(),
      patientPhone: !formData.patientPhone.trim(),
      titleOfTherapy: !formData.titleOfTherapy.trim(),
    };

    setErrors(newErrors);

    // Focus on the first invalid field
    const firstErrorKey = Object.keys(newErrors).find((key) => newErrors[key]);
    if (firstErrorKey) {
      document.getElementById(firstErrorKey).focus();
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; 
    }

    try {
      const response = await axios.post('http://localhost:8085/therapy/post', formData);
      console.log('Therapy created successfully:', response.data);
      setSuccessMessage('Therapy request submitted successfully!');
      setTimeout(() => {
        
        
      }, 2000); 
    } catch (error) {
      console.error('Error creating therapy:', error);
      alert('Failed to submit therapy request.');
    }
  };

  const handleCancel = () => {
    navigate('/patientportal'); 
  };

  // Inline styles
  const containerStyle = {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#4caf50',
    fontSize: '2rem',
    marginBottom: '20px',
  };

  const labelStyle = {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '8px',
    display: 'block',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  };

  const selectStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  };

  const buttonStyle = {
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
    fontSize: '1rem',
  };

  const errorTextStyle = {
    color: '#ff0000',
    fontSize: '0.9rem',
    marginTop: '5px',
  };

  const successTextStyle = {
    color: '#28a745',
    fontSize: '1rem',
    textAlign: 'center',
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>THERAPY REQUEST FORM</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="patientName" style={labelStyle}>Name</label>
        <input
          type="text"
          id="patientName"
          name="patientName"
          placeholder="Enter your name"
          value={formData.patientName}
          onChange={handleChange}
          style={inputStyle}
          className={errors.patientName ? 'error' : ''}
        />
        {errors.patientName && <p style={errorTextStyle}>Name is required</p>}

        <label htmlFor="patientAddress" style={labelStyle}>Address</label>
        <input
          type="text"
          id="patientAddress"
          name="patientAddress"
          placeholder="Enter your address"
          value={formData.patientAddress}
          onChange={handleChange}
          style={inputStyle}
          className={errors.patientAddress ? 'error' : ''}
        />
        {errors.patientAddress && <p style={errorTextStyle}>Address is required</p>}

        <label htmlFor="patientPhone" style={labelStyle}>Phone Number</label>
        <input
          type="text"
          id="patientPhone"
          name="patientPhone"
          placeholder="Enter your phone number"
          value={formData.patientPhone}
          onChange={handleChange}
          style={inputStyle}
          className={errors.patientPhone ? 'error' : ''}
        />
        {errors.patientPhone && <p style={errorTextStyle}>Phone number is required</p>}

        <label htmlFor="titleOfTherapy" style={labelStyle}>Title of Therapy</label>
        <select
          name="titleOfTherapy"
          id="titleOfTherapy"
          value={formData.titleOfTherapy}
          onChange={handleChange}
          style={selectStyle}
          className={errors.titleOfTherapy ? 'error' : ''}
        >
          <option value="">Select</option>
          <option value="Women’s health">Women’s health</option>
          <option value="Cardiovascular and pulmonary">Cardiovascular and pulmonary</option>
          <option value="Geriatric">Geriatric</option>
          <option value="Pediatric">Pediatric</option>
          <option value="Neurological">Neurological</option>
          <option value="Orthopedic">Orthopedic</option>
        </select>
        {errors.titleOfTherapy && <p style={errorTextStyle}>Please select a therapy title</p>}

        <button type="submit" style={buttonStyle}>Submit</button>
        
        <button type="button" onClick={handleCancel} style={buttonStyle}>Cancel</button> {/* Cancel button navigation */}
      </form>

      {successMessage && <p style={successTextStyle}>{successMessage}</p>} {/* Success message */}
    </div>
  );
}

export default Newtherapy;
