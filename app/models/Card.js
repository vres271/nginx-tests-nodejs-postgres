const pool = require('../db');

class Card {
  static async create({ userId, cardNumber }) {
    const result = await pool.query(
      'INSERT INTO cards (user_id, card_number) VALUES ($1, $2) RETURNING *',
      [userId, cardNumber]
    );
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const result = await pool.query('SELECT * FROM cards WHERE user_id = $1', [userId]);
    return result.rows;
  }

  static async delete(id) {
    await pool.query('DELETE FROM cards WHERE id = $1', [id]);
  }
}

module.exports = Card;