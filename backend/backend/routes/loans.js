
// backend/routes/loans.js

const express = require('express');
const router = express.Router();
const sql = require('../db');

// Get all loans
router.get('/', async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM Loans');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a loan
router.post('/', async (req, res) => {
  const { EmpCode, LoanAmount, EMI, Purpose, StartDate } = req.body;
  try {
    await sql.query`
      INSERT INTO Loans (EmpCode, LoanAmount, EMI, Purpose, StartDate)
      VALUES (${EmpCode}, ${LoanAmount}, ${EMI}, ${Purpose}, ${StartDate})
    `;
    res.status(201).json({ message: 'Loan record added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a loan
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sql.query`DELETE FROM Loans WHERE ID = ${id}`;
    res.json({ message: 'Loan record deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
