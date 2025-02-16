const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'mydb',
  port: 5432,
});

// Функция для очистки базы данных
const clearDatabase = async () => {
  try {
    await pool.query('DELETE FROM cards');
    await pool.query('DELETE FROM accounts');
    await pool.query('DELETE FROM users');
    console.log('Database cleared successfully.');
  } catch (error) {
    console.error('Error clearing database:', error);
  }
};

module.exports = { pool, clearDatabase };