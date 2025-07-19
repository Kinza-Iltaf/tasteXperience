// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Public routes
router.post('/submit', feedbackController.submitFeedback);

// Admin routes (you can add authentication middleware here later)
router.get('/all', feedbackController.getAllFeedback);
router.get('/stats', feedbackController.getFeedbackStats);
router.get('/:id', feedbackController.getFeedbackById);
router.patch('/:id/status', feedbackController.updateFeedbackStatus);
router.delete('/:id', feedbackController.deleteFeedback);

// Health check route
router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Feedback API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;