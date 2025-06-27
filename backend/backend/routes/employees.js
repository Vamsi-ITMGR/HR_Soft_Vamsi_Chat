// backend/routes/employees.js

const express = require('express');
const router = express.Router();
const sql = require('../db');

// Get all employees
router.get('/', async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM Employees');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single employee by EmpCode
router.get('/:empcode', async (req, res) => {
  const { empcode } = req.params;
  try {
    const result = await sql.query`SELECT * FROM Employees WHERE EmpCode = ${empcode}`;
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new employee
router.post('/', async (req, res) => {
  const { EmpCode, Name, DOB, BankName, IFSCCode, AccountNumber, BranchCode } = req.body;
  try {
    await sql.query`
      INSERT INTO Employees (EmpCode, Name, DOB, BankName, IFSCCode, AccountNumber, BranchCode)
      VALUES (${EmpCode}, ${Name}, ${DOB}, ${BankName}, ${IFSCCode}, ${AccountNumber}, ${BranchCode})
    `;
    res.status(201).json({ message: 'Employee added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update employee
router.put('/:empcode', async (req, res) => {
  const { empcode } = req.params;
  const { Name, DOB, BankName, IFSCCode, AccountNumber, BranchCode } = req.body;
  try {
    await sql.query`
      UPDATE Employees
      SET Name = ${Name}, DOB = ${DOB}, BankName = ${BankName},
          IFSCCode = ${IFSCCode}, AccountNum

