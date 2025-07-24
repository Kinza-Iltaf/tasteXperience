// src/pages/Contact.jsx
import React, { useState } from 'react';
import './contactUs.css';

function Contact() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);

    // Reset form fields
    e.target.reset();

    // Hide popup after 3 seconds
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">We’d love to hear from you! Please fill out the form below.</p>

      {showPopup && (
        <div className="popup-message">
          Message sent successfully!
        </div>
      )}

      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Name <span className="required">*</span></label>
          <input type="text" placeholder="Your Name" required />

          <label>Email <span className="required">*</span></label>
          <input type="email" placeholder="Your Email" required />

          <label>Message <span className="required">*</span></label>
          <textarea rows="5" placeholder="Your Message" required></textarea>

          <button type="submit">Send Message</button>
        </form>

        <div className="contact-support">
          <h3>Why Reach Out?</h3>
          <p>
            We’re here to assist with anything related to your TasteXperience.
            Whether it’s an issue with a recent order, a suggestion, or partnership inquiries — we’re listening!
          </p>

          <h4>Topics We Can Help With:</h4>
          <ul>
            <li>🍽️ Food quality or feedback</li>
            <li>📦 Order status & delivery questions</li>
            <li>💬 Suggestions or complaints</li>
            <li>🤝 Business collaborations</li>
          </ul>

          <h4>Response Time</h4>
          <p>
            We typically reply within <strong>24 hours</strong>.  
            For urgent queries, please reach us via our live chat or call support.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
