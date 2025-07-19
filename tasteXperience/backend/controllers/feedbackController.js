// controllers/feedbackController.js
const pool = require('../config/db');

const feedbackController = {
  // Submit new feedback
  submitFeedback: async (req, res) => {
    try {
      const { name, surname, email, message } = req.body;
      
      // Validation
      if (!name || !surname || !email || !message) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required'
        });
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address'
        });
      }
      
      // Insert feedback into database
      const query = `
        INSERT INTO feedback (name, surname, email, message)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, surname, email, created_at
      `;
      
      const values = [
        name.trim(),
        surname.trim(),
        email.toLowerCase().trim(),
        message.trim()
      ];
      
      const result = await pool.query(query, values);
      
      // Log successful submission
      console.log(`New feedback submitted by: ${name} ${surname} (${email})`);
      
      res.status(201).json({
        success: true,
        message: 'Feedback submitted successfully',
        data: {
          id: result.rows[0].id,
          name: result.rows[0].name,
          surname: result.rows[0].surname,
          email: result.rows[0].email,
          submitted_at: result.rows[0].created_at
        }
      });
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      
      // Handle duplicate email constraint if you add one later
      if (error.code === '23505') {
        return res.status(409).json({
          success: false,
          message: 'Feedback from this email already exists'
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Error submitting feedback. Please try again.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Get all feedback (for admin purposes)
  getAllFeedback: async (req, res) => {
    try {
      const { status, limit = 50, offset = 0 } = req.query;
      
      let query = `
        SELECT 
          id, name, surname, email, message, status, admin_notes,
          created_at, updated_at
        FROM feedback
      `;
      
      const values = [];
      
      // Filter by status if provided
      if (status && ['unread', 'read', 'responded'].includes(status)) {
        query += ` WHERE status = $1`;
        values.push(status);
      }
      
      query += ` ORDER BY created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
      values.push(parseInt(limit), parseInt(offset));
      
      const result = await pool.query(query, values);
      
      // Get total count
      let countQuery = 'SELECT COUNT(*) FROM feedback';
      let countValues = [];
      
      if (status && ['unread', 'read', 'responded'].includes(status)) {
        countQuery += ' WHERE status = $1';
        countValues.push(status);
      }
      
      const countResult = await pool.query(countQuery, countValues);
      const totalCount = parseInt(countResult.rows[0].count);
      
      res.json({
        success: true,
        data: result.rows,
        pagination: {
          total: totalCount,
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: (parseInt(offset) + parseInt(limit)) < totalCount
        }
      });
      
    } catch (error) {
      console.error('Error fetching feedback:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching feedback',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Get single feedback by ID
  getFeedbackById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const query = `
        SELECT 
          id, name, surname, email, message, status, admin_notes,
          created_at, updated_at
        FROM feedback 
        WHERE id = $1
      `;
      
      const result = await pool.query(query, [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Feedback not found'
        });
      }
      
      res.json({
        success: true,
        data: result.rows[0]
      });
      
    } catch (error) {
      console.error('Error fetching feedback:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching feedback',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Update feedback status (for admin)
  updateFeedbackStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, admin_notes } = req.body;
      
      // Validate status
      if (status && !['unread', 'read', 'responded'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be: unread, read, or responded'
        });
      }
      
      let query = 'UPDATE feedback SET ';
      const values = [];
      const updates = [];
      
      if (status) {
        updates.push(`status = $${values.length + 1}`);
        values.push(status);
      }
      
      if (admin_notes !== undefined) {
        updates.push(`admin_notes = $${values.length + 1}`);
        values.push(admin_notes);
      }
      
      if (updates.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No valid fields to update'
        });
      }
      
      query += updates.join(', ');
      query += ` WHERE id = $${values.length + 1} RETURNING *`;
      values.push(id);
      
      const result = await pool.query(query, values);
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Feedback not found'
        });
      }
      
      res.json({
        success: true,
        message: 'Feedback updated successfully',
        data: result.rows[0]
      });
      
    } catch (error) {
      console.error('Error updating feedback:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating feedback',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Delete feedback (for admin)
  deleteFeedback: async (req, res) => {
    try {
      const { id } = req.params;
      
      const query = 'DELETE FROM feedback WHERE id = $1 RETURNING *';
      const result = await pool.query(query, [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Feedback not found'
        });
      }
      
      res.json({
        success: true,
        message: 'Feedback deleted successfully',
        data: result.rows[0]
      });
      
    } catch (error) {
      console.error('Error deleting feedback:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting feedback',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Get feedback statistics (for admin dashboard)
  getFeedbackStats: async (req, res) => {
    try {
      const statsQuery = `
        SELECT 
          COUNT(*) as total_feedback,
          COUNT(CASE WHEN status = 'unread' THEN 1 END) as unread_count,
          COUNT(CASE WHEN status = 'read' THEN 1 END) as read_count,
          COUNT(CASE WHEN status = 'responded' THEN 1 END) as responded_count,
          COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as this_week,
          COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as this_month
        FROM feedback
      `;
      
      const result = await pool.query(statsQuery);
      
      res.json({
        success: true,
        data: result.rows[0]
      });
      
    } catch (error) {
      console.error('Error fetching feedback stats:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching feedback statistics',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};

module.exports = feedbackController;