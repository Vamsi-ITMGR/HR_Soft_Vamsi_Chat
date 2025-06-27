
// backend/routes/resignations.js

const express = require('express');
const router = express.Router();
const sql = require('../db');

// Get all resignations
router.get('/', async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM Resignations');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit a resignation
router.post('/', async (req, res) => {
  const { EmpCode, ResignationDate, Reason } = req.body;
  try {
    await sql.query`
      INSERT INTO Resignations (EmpCode, ResignationDate, Reason)
      VALUES (${EmpCode}, ${ResignationDate}, ${Reason})
    `;
    res.status(201).json({ message: 'Resignation submitted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a resignation
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sql.query`DELETE FROM Resignations WHERE ID = ${id}`;
    res.json({ message: 'Resignation record deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
