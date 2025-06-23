const express = require('express');
const pool = require('../db');
const router = express.Router();

// POST /apply - Student application
router.post('/', async (req, res) => {
  const { name, age, class: studentClass, message } = req.body;
  try {
    await pool.query(
      'INSERT INTO students (name, age, class, message) VALUES ($1, $2, $3, $4)',
      [name, age, studentClass, message]
    );
    res.status(201).json({ message: 'Application submitted' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
