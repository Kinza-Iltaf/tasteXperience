// src/pages/Contact.jsx
import React from 'react';
import './contactUs.css';

function Contact() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">We’d love to hear from you! Please fill out the form below.</p>

      <div className="contact-content">
        <form className="contact-form">
          <label>Name</label>
          <input type="text" placeholder="Your Name" required />

          <label>Email</label>
          <input type="email" placeholder="Your Email" required />

          <label>Message</label>
          <textarea rows="5" placeholder="Your Message" required></textarea>

          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p><i className="fas fa-envelope"></i> support@tastexperience.com</p>
          <p><i className="fas fa-phone"></i> +92 300 1234567</p>
          <p><i className="fas fa-map-marker-alt"></i> Lahore, Pakistan</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
