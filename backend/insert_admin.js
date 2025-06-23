const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function createAdmin() {
  const username = 'admin';
  const password = 'admin123'; // 🔐 You can change this
  const password_hash = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      'INSERT INTO admin (username, password_hash) VALUES ($1, $2)',
      [username, password_hash]
    );
    console.log('✅ Admin user created!');
  } catch (err) {
    console.error('❌ Error inserting admin:', err.message);
  } finally {
    pool.end();
  }
}

createAdmin();
