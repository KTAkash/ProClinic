import React from 'react';
import './StockCheck.css';

const StockCheck = ({ inventory }) => {
    const inStockItems = inventory.filter(item => item.stock > 0);

    return (
        <div className="stock-container">
        <h2 className="stock-title">Items in Stock</h2>
        <ul className="stock-list">
          {inStockItems.length > 0 ? (
            inStockItems.map((item) => (
              <li className="stock-item" key={item.id}>
                <span className="stock-name">Name: {item.name}</span> | 
                <span className="stock-price">Price: ${item.price.toFixed(2)}</span> | 
                <span className="stock-quantity">Stock: {item.stock}</span>
              </li>
            ))
          ) : (
            <p className="stock-empty-message">No items in stock.</p>
          )}
        </ul>
      </div>
    );
};

export default StockCheck;
