import React, { useState } from 'react';
import axios from 'axios';
import './OfferForm.css';
import { useLocation } from 'react-router-dom';

function OfferForm() {
  const location = useLocation();
   // Initialize navigate
  const { offerType } = location.state || {}; // Extract offerType from state

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    numberOfMonths: '',
    offerType: offerType || '', // Set the initial offerType
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8085/offer/create', formData);
      if (response.status === 200) {
        alert('Successfully created');
         // Navigate to offer-list page
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
  <div className='bod'>  
    <div className="container">
      <h2>PATIENT OFFER FORM</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="offerType">Offer Type</label>
        <input
          type="text"
          id="offerType"
          name="offerType"
          value={formData.offerType}
          readOnly // Make the field readonly
        />

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="John"
          value={formData.name}
          onChange={handleInputChange}
        />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Colombo"
          value={formData.address}
          onChange={handleInputChange}
        />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="0752345678"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />

        <label htmlFor="numberOfMonths">Number of Months</label>
        <input
          type="text"
          id="numberOfMonths"
          name="numberOfMonths"
          placeholder="Number of Months"
          value={formData.numberOfMonths}
          onChange={handleInputChange}
        />

        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={() => setFormData({ name: '', address: '', phoneNumber: '', numberOfMonths: '', offerType })}
        >
          Cancel
        </button>
      </form>
    </div>
  </div>  
  );
}

export default OfferForm;
