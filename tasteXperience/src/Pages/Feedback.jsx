// src/pages/Feedback.jsx
import React from 'react';
import './Feedback.css';

function Feedback() {
  return (
    <div className="feedback-container">
      <h1 className="feedback-title">We Value Your Feedback</h1>
      <p className="feedback-subtitle">
        Share your TasteXperience — What felt realistic? What can we improve?
      </p>

      <form className="feedback-form">
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" placeholder="Enter your name" required />

        <label htmlFor="email">Your Email</label>
        <input type="email" id="email" placeholder="Enter your email" required />

        <label htmlFor="rating">How Realistic Was the Taste?</label>
        <select id="rating" required>
          <option value="">Choose a rating</option>
          <option>Very Realistic</option>
          <option>Somewhat Realistic</option>
          <option>Neutral</option>
          <option>Needs Improvement</option>
          <option>Didn’t Work</option>
        </select>

        <label htmlFor="comments">Your Feedback</label>
        <textarea id="comments" rows="5" placeholder="Share your thoughts..." required></textarea>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default Feedback;
