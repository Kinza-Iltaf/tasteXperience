// src/components/ItemModal.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ItemModal.css';

function ItemModal({ item, onClose }) {
  const [message, setMessage] = useState('');
  const [isTasting, setIsTasting] = useState(false);

  const handleTaste = () => {
    setIsTasting(true);
    setMessage('');
    setTimeout(() => {
      setMessage('😋 Mmm… that was tasty! Please sanitize before tasting again.');
      setIsTasting(false);
    }, 2500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="modal-image-wrapper">
          <img src={item.image} alt={item.name} className="modal-image" />
        </div>
        <h2>{item.name}</h2>
        <p>{item.desc}</p>

        <button className="taste-btn" onClick={handleTaste} disabled={isTasting}>
          {isTasting ? 'Tasting...' : 'Taste It'}
        </button>

        {isTasting && <div className="emoji-animation">😋</div>}

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
