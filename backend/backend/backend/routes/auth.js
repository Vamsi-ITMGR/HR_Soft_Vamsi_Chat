// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const sql = require('../db');
const bcrypt = require('bcrypt');

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await sql.query`SELECT * FROM Users WHERE Username = ${username}`;
    const user = result.recordset[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, user.PasswordHash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful', role: user.Role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register new user (optional)
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await sql.query`
      INSERT INTO Users (Username, PasswordHash, Role)
      VALUES (${username}, ${hash}, ${role})
    `;
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

