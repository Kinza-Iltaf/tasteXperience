import React, { useState, useRef } from 'react';
import './Feedback.css';

function Feedback() {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const formRef = useRef(null); // For resetting the form

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show popup
    setShowSuccessPopup(true);

    // Hide popup after 3 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);

    // Reset form
    formRef.current.reset();
  };

  return (
    <div className="feedback-container">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="feedback-popup">
          🎉 Your feedback has been submitted successfully!
        </div>
      )}

      <h1 className="feedback-title">We Value Your Feedback</h1>
      <p className="feedback-subtitle">
        Share your TasteXperience — What felt realistic? What can we improve?
      </p>

     <form className="feedback-form" onSubmit={handleSubmit} ref={formRef}>
  <label htmlFor="name">Your Name<span style={{ color: 'red' }}>*</span></label>
  <input type="text" id="name" required />

  <label htmlFor="email">Your Email<span style={{ color: 'red' }}>*</span></label>
  <input type="email" id="email" required />

  <label htmlFor="rating">How Realistic Was the Taste?<span style={{ color: 'red' }}>*</span></label>
  <select id="rating" required>
    <option value="">Choose a rating</option>
    <option>Very Realistic</option>
    <option>Somewhat Realistic</option>
    <option>Neutral</option>
    <option>Needs Improvement</option>
    <option>Didn’t Work</option>
  </select>

  <label htmlFor="comments">Your Feedback<span style={{ color: 'red' }}>*</span></label>
  <textarea id="comments" rows="4" required></textarea>

  <button type="submit">Submit Feedback</button>
</form>

    </div>
  );
}

export default Feedback;
