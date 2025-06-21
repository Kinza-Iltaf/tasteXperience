// src/components/ItemModal.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ItemModal.css';

function ItemModal({ item, onClose }) {
  const [message, setMessage] = useState('');

  const handleTaste = () => {
    setMessage(''); // Reset
    setTimeout(() => {
      setMessage('Please sanitize the device before tasting.');
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>×</button>
        <img src={item.image} alt={item.name} className="modal-image" />
        <h2>{item.name}</h2>
        <p>{item.desc}</p>

        <button className="taste-btn" onClick={handleTaste}>Taste It</button>

        {message && (
          <div className="taste-message">
            <p>{message}</p>
            <Link to="/feedback" className="feedback-link">Leave Feedback</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemModal;


