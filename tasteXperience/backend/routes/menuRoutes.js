// routes/menuRoutes.js - Updated with subcategory items route
const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Category routes
router.get('/categories', menuController.getCategories);
router.get('/categories/:id/items', menuController.getItemsByCategory);
router.get('/categories/:id/subcategories', menuController.getSubcategoriesByCategory);

// NEW: Subcategory items route
router.get('/subcategories/:id/items', menuController.getItemsBySubcategory);

// Item routes
router.get('/items/:id', menuController.getItemDetails);
router.get('/items/search', menuController.searchItems);
router.post('/items', menuController.addMenuItem);
router.patch('/items/:id/availability', menuController.updateItemAvailability);

// Health check route
router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Menu API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;