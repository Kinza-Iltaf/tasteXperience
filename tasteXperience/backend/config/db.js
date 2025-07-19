// config/db.js
const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool instance for PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'tastexperience',
  password: process.env.DB_PASSWORD || 12345678,
  port: process.env.DB_PORT || 5432,
});

// Test the database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Successfully connected to PostgreSQL database');
    release();
  }
});

// Export the pool for use in other modules
module.exports = pool;