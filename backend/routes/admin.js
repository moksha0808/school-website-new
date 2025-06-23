const express = require('express');
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const router = express.Router();

// POST /admin/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM admin WHERE username = $1', [username]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    const admin = result.rows[0];
    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /applications (admin only)
router.get('/applications', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /admin/check (validate token)
router.get('/check', auth, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// POST /admin/achievement (add achievement)
router.post('/achievement', auth, async (req, res) => {
  const { title, student, image } = req.body;
  try {
    await pool.query('INSERT INTO achievements (title, student, image) VALUES ($1, $2, $3)', [title, student, image]);
    res.status(201).json({ message: 'Achievement added' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /admin/curriculum (update curriculum)
router.post('/curriculum', auth, async (req, res) => {
  const { curriculum } = req.body;
  try {
    await pool.query('UPDATE school_info SET curriculum = $1', [curriculum]);
    res.json({ message: 'Curriculum updated' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /achievements
router.get('/achievements', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM achievements ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /curriculum
router.get('/curriculum', async (req, res) => {
  try {
    const result = await pool.query('SELECT curriculum FROM school_info LIMIT 1');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
