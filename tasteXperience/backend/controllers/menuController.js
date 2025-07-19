// controllers/menuController.js - Updated to include details_paragraph
const pool = require('../config/db');

const menuController = {
  // Get all categories
  getCategories: async (req, res) => {
    try {
      const query = 'SELECT * FROM categories ORDER BY display_order, name';
      const result = await pool.query(query);
      
      res.json({
        success: true,
        data: result.rows
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching categories',
        error: error.message
      });
    }
  },

  // Get all items by category ID
  getItemsByCategory: async (req, res) => {
    try {
      const { id } = req.params;
      
      const query = `
        SELECT 
          mi.*,
          sc.name as subcategory_name,
          c.name as category_name
        FROM menu_items mi
        LEFT JOIN subcategories sc ON mi.subcategory_id = sc.id
        LEFT JOIN categories c ON mi.category_id = c.id
        WHERE mi.category_id = $1 AND mi.is_available = true
        ORDER BY sc.display_order, mi.name
      `;
      
      const result = await pool.query(query, [id]);
      
      // Group items by subcategory
      const groupedItems = result.rows.reduce((acc, item) => {
        const subcategory = item.subcategory_name || 'Other';
        if (!acc[subcategory]) {
          acc[subcategory] = [];
        }
        acc[subcategory].push(item);
        return acc;
      }, {});
      
      res.json({
        success: true,
        data: groupedItems
      });
    } catch (error) {
      console.error('Error fetching items by category:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching items',
        error: error.message
      });
    }
  },

  // Get items by subcategory ID (for header dropdown)
  getItemsBySubcategory: async (req, res) => {
    try {
      const { id } = req.params;
      
      const query = `
        SELECT 
          mi.*,
          c.name as category_name,
          sc.name as subcategory_name
        FROM menu_items mi
        LEFT JOIN categories c ON mi.category_id = c.id
        LEFT JOIN subcategories sc ON mi.subcategory_id = sc.id
        WHERE mi.subcategory_id = $1 AND mi.is_available = true
        ORDER BY mi.name
        LIMIT 1
      `;
      
      const result = await pool.query(query, [id]);
      
      res.json({
        success: true,
        data: result.rows
      });
    } catch (error) {
      console.error('Error fetching items by subcategory:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching subcategory items',
        error: error.message
      });
    }
  },

  // Get single item details
  getItemDetails: async (req, res) => {
    try {
      const { id } = req.params;
      
      const query = `
        SELECT 
          mi.*,
          c.name as category_name,
          sc.name as subcategory_name
        FROM menu_items mi
        LEFT JOIN categories c ON mi.category_id = c.id
        LEFT JOIN subcategories sc ON mi.subcategory_id = sc.id
        WHERE mi.id = $1
      `;
      
      const result = await pool.query(query, [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Item not found'
        });
      }
      
      res.json({
        success: true,
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error fetching item details:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching item details',
        error: error.message
      });
    }
  },

  // Get subcategories by category ID
  getSubcategoriesByCategory: async (req, res) => {
    try {
      const { id } = req.params;
      
      const query = `
        SELECT * FROM subcategories 
        WHERE category_id = $1 
        ORDER BY display_order, name
      `;
      
      const result = await pool.query(query, [id]);
      
      res.json({
        success: true,
        data: result.rows
      });
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching subcategories',
        error: error.message
      });
    }
  },

  // Search menu items
  searchItems: async (req, res) => {
    try {
      const { q } = req.query;
      
      if (!q) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }
      
      const query = `
        SELECT 
          mi.*,
          c.name as category_name,
          sc.name as subcategory_name
        FROM menu_items mi
        LEFT JOIN categories c ON mi.category_id = c.id
        LEFT JOIN subcategories sc ON mi.subcategory_id = sc.id
        WHERE 
          mi.is_available = true AND
          (LOWER(mi.name) LIKE LOWER($1) OR 
           LOWER(mi.description) LIKE LOWER($1))
        ORDER BY mi.name
        LIMIT 20
      `;
      
      const searchPattern = `%${q}%`;
      const result = await pool.query(query, [searchPattern]);
      
      res.json({
        success: true,
        data: result.rows
      });
    } catch (error) {
      console.error('Error searching items:', error);
      res.status(500).json({
        success: false,
        message: 'Error searching items',
        error: error.message
      });
    }
  },

  // Add a new menu item (for admin purposes)
  addMenuItem: async (req, res) => {
    try {
      const { 
        category_id, 
        subcategory_id, 
        name, 
        description, 
        price, 
        image_url,
        details_paragraph 
      } = req.body;
      
      const query = `
        INSERT INTO menu_items 
        (category_id, subcategory_id, name, description, price, image_url, details_paragraph)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      
      const values = [
        category_id, 
        subcategory_id, 
        name, 
        description, 
        price, 
        image_url,
        details_paragraph
      ];
      
      const result = await pool.query(query, values);
      
      res.status(201).json({
        success: true,
        message: 'Menu item added successfully',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error adding menu item:', error);
      res.status(500).json({
        success: false,
        message: 'Error adding menu item',
        error: error.message
      });
    }
  },

  // Update item availability
  updateItemAvailability: async (req, res) => {
    try {
      const { id } = req.params;
      const { is_available } = req.body;
      
      const query = `
        UPDATE menu_items 
        SET is_available = $1 
        WHERE id = $2 
        RETURNING *
      `;
      
      const result = await pool.query(query, [is_available, id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Item not found'
        });
      }
      
      res.json({
        success: true,
        message: 'Item availability updated',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error updating item availability:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating item',
        error: error.message
      });
    }
  },

  // Update item details paragraph
  updateItemParagraph: async (req, res) => {
    try {
      const { id } = req.params;
      const { details_paragraph } = req.body;
      
      const query = `
        UPDATE menu_items 
        SET details_paragraph = $1 
        WHERE id = $2 
        RETURNING *
      `;
      
      const result = await pool.query(query, [details_paragraph, id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Item not found'
        });
      }
      
      res.json({
        success: true,
        message: 'Item paragraph updated',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error updating item paragraph:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating item',
        error: error.message
      });
    }
  }
};

module.exports = menuController;