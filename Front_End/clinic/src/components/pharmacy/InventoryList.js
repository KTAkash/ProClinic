import React, { useState } from 'react';
import './InventoryList.css';

const InventoryList = ({ inventory, onDelete, refreshInventory }) => {
    const [editingItem, setEditingItem] = useState(null);
    const [updatedItem, setUpdatedItem] = useState({ name: '', price: 0.0, stock: 0 });

    const handleEditClick = (item) => {
        setEditingItem(item);
        setUpdatedItem({ name: item.name,  price: item.price, stock: item.stock });
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8085/ht/Pharmacist/inventory/${editingItem.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // If the update is successful
            await refreshInventory(); // Refresh the inventory list
            setEditingItem(null); // Close the edit form
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div className="inventory-container">
        <h2 className="inventory-title">Inventory List</h2>
        <ul className="inventory-list">
          {inventory.map((item) => (
            <li className="inventory-item" key={item.id}>
              <span className="inventory-details">
                Name: <span className="inventory-name">{item.name}</span> | 
                Price: <span className="inventory-price">${item.price.toFixed(2)}</span> | 
                Stock: <span className="inventory-stock">{item.stock}</span>
              </span>
              <button className="inventory-edit-button" onClick={() => handleEditClick(item)}>Edit</button>
              <button className="inventory-delete-button" onClick={() => onDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
  
        {editingItem && (
          <div className="inventory-edit-container">
            <h3 className="inventory-edit-title">Edit Item</h3>
            <input
              className="inventory-edit-input"
              type="text"
              value={updatedItem.name}
              onChange={(e) => setUpdatedItem({ ...updatedItem, name: e.target.value })}
            />
            <input
              className="inventory-edit-input"
              type="number"
              step="0.01" // Allow for decimal values
              value={updatedItem.price}
              onChange={(e) => setUpdatedItem({ ...updatedItem, price: parseFloat(e.target.value) })}
            />
            <input
              className="inventory-edit-input"
              type="number"
              value={updatedItem.stock}
              onChange={(e) => setUpdatedItem({ ...updatedItem, stock: Number(e.target.value) })}
            />
            <button className="inventory-update-button" onClick={handleUpdate}>Update</button>
            <button className="inventory-cancel-button" onClick={() => setEditingItem(null)}>Cancel</button>
          </div>
        )}
      </div>
    );
};

export default InventoryList;