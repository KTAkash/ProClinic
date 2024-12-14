import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OfferList.css';

const OfferList = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    // Fetch the offers from the backend
    axios
      .get('http://localhost:8085/offer/get')
      .then((response) => {
        console.log('Fetched offers:', response.data); 
        setOffers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching offers:', error);
        alert('Error fetching offers. Please try again.');
      });
  }, []);

  return (
    <div className="offer-list-container">
      <h1>All Submitted Offers</h1>
      <table className="offer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Months</th>
            <th>Offer Type</th>
          </tr>
        </thead>
        <tbody>
              {offers.map((offer) => (
            <tr key={offer.id}>
              <td>{offer.name}</td>
              <td>{offer.address}</td>
              <td>{offer.phoneNumber || 'N/A'}</td>
              <td>{offer.numberOfMonths || 'N/A'}</td>
              <td>{offer.offerType || 'N/A'}</td>
            </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default OfferList;
