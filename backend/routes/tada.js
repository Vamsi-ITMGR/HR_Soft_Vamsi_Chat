
// backend/routes/tada.js

const express = require('express');
const router = express.Router();
const sql = require('../db');

// Get all TA/DA records
router.get('/', async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM TADA');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add TA/DA record
router.post('/', async (req, res) => {
  const { EmpCode, FromDate, ToDate, Purpose, Amount } = req.body;
  try {
    await sql.query`
      INSERT INTO TADA (EmpCode, FromDate, ToDate, Purpose, Amount)
      VALUES (${EmpCode}, ${FromDate}, ${ToDate}, ${Purpose}, ${Amount})
    `;
    res.status(201).json({ message: 'TA/DA record added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete TA/DA record
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sql.query`DELETE FROM TADA WHERE ID = ${id}`;
    res.json({ message: 'TA/DA record deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
