// services/menuService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const menuService = {
  // Get all categories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get items by category ID
  getItemsByCategory: async (categoryId) => {
    const response = await api.get(`/categories/${categoryId}/items`);
    return response.data;
  },

  // Get subcategories by category ID
  getSubcategoriesByCategory: async (categoryId) => {
    const response = await api.get(`/categories/${categoryId}/subcategories`);
    return response.data;
  },

  // Get single item details
  getItemDetails: async (itemId) => {
    const response = await api.get(`/items/${itemId}`);
    return response.data;
  },

  // Search items
  searchItems: async (query) => {
    const response = await api.get(`/items/search?q=${query}`);
    return response.data;
  },
};