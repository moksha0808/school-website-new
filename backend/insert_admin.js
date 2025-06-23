const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const username = 'admin';
const password = 'admin123';

async function upsertAdmin() {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Try to insert, or update if exists
    await pool.query(
      `INSERT INTO admin (username, password_hash) VALUES ($1, $2)
       ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
      [username, hashedPassword]
    );
    console.log('Admin user inserted or updated successfully!');
  } catch (error) {
    console.error('Error inserting/updating admin user:', error.message);
  } finally {
    await pool.end();
  }
}

upsertAdmin();
