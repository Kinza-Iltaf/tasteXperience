// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const menuRoutes = require('./routes/menuRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Your React app URL
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api', menuRoutes);
app.use('/api/feedback', feedbackRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'TasteXperience Backend API',
    version: '1.0.0',
    endpoints: {
      // Menu endpoints
      categories: '/api/categories',
      items: '/api/categories/:id/items',
      itemDetails: '/api/items/:id',
      search: '/api/items/search?q=query',
      
      // Feedback endpoints
      submitFeedback: 'POST /api/feedback/submit',
      getAllFeedback: 'GET /api/feedback/all',
      getFeedbackStats: 'GET /api/feedback/stats',
      getFeedbackById: 'GET /api/feedback/:id',
      updateFeedbackStatus: 'PATCH /api/feedback/:id/status',
      deleteFeedback: 'DELETE /api/feedback/:id'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
  console.log(`Feedback API available at http://localhost:${PORT}/api/feedback`);
});