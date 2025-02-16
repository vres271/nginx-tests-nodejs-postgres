const pool = require('../db');

class Account {
  static async create({ userId, balance }) {
    const result = await pool.query(
      'INSERT INTO accounts (user_id, balance) VALUES ($1, $2) RETURNING *',
      [userId, balance]
    );
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const result = await pool.query('SELECT * FROM accounts WHERE user_id = $1', [userId]);
    return result.rows;
  }

  static async update(id, { balance }) {
    const result = await pool.query(
      'UPDATE accounts SET balance = $1 WHERE id = $2 RETURNING *',
      [balance, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM accounts WHERE id = $1', [id]);
  }
}

module.exports = Account;