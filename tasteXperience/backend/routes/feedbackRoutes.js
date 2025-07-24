const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const feedbackFilePath = path.join(__dirname, '../data/feedback.json');

router.post('/', (req, res) => {
  const { name, email, rating, comments } = req.body;
  const newFeedback = {
    id: Date.now(),
    name,
    email,
    rating,
    comments,
    submitted_at: new Date().toISOString()
  };

  // Read existing feedbacks
  fs.readFile(feedbackFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Could not read feedback file.' });

    let feedbacks = [];
    try {
      feedbacks = JSON.parse(data);
    } catch (parseErr) {
      feedbacks = [];
    }

    feedbacks.push(newFeedback);

    fs.writeFile(feedbackFilePath, JSON.stringify(feedbacks, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Could not write feedback file.' });
      res.status(200).json({ message: 'Feedback saved successfully!' });
    });
  });
});

router.get('/', (req, res) => {
  fs.readFile(feedbackFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Could not read feedback file.' });

    try {
      const feedbacks = JSON.parse(data);
      res.status(200).json(feedbacks);
    } catch (parseErr) {
      res.status(500).json({ error: 'Could not parse feedback data.' });
    }
  });
});


module.exports = router;
