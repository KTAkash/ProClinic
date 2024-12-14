// src/OfferCard.js
import React from 'react';
import './OfferCard.css';  // Import the CSS for styling
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

const OfferCard = () => {
  const navigate = useNavigate();  // Initialize the navigate function

  // Modified function to handle button click
  const handleButtonClick = (offerType, event) => {
    event.preventDefault(); // Prevent default button behavior

    // Navigate to the /offer-form page with the offerType in the state
    navigate('/offer-form', { state: { offerType } });
  };
  
  // Array of offer items
  const offerItems = [
    {
      name: 'Monthly Offer',
      image: 'https://th.bing.com/th/id/OIP.0R2Ok_0eIm9hZKJl8IHp4AHaE7?rs=1&pid=ImgDetMainn',
      description: 'Get 5% off for medicine'
    },
    {
      name: '3 Month Offer',
      image: 'https://th.bing.com/th/id/R.304dfd2b8db465fb8d06a16d728a9451?rik=HatBz20AjxWXNQ&pid=ImgRaw&r=0s',
      description: 'Get free physio therapy'
    },
    {
      name: '6 Month Offer',
      image: 'https://www.blissmedicines.com/wp-content/uploads/2020/04/FunctionalMedicineDoctorChicago-960w.jpeg',
      description: 'Get medical checkup for free'
    }
  ];

  return (
    <div className="app">
      <h1>Patient Care Offers</h1>
      <div className="card-container">
        {offerItems.map((item, index) => (
          <div key={index} className="offer-card">
            <img src={item.image} alt={item.name} className="offer-image" />
            <h2>{item.name}</h2>
            <p className="description">{item.description}</p>
            
            <button
              className="buy-btn"
              onClick={(event) => handleButtonClick(item.name, event)} // Pass item.name and event to handleButtonClick
            >
              GET NOW
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferCard;
