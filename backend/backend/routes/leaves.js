
// backend/routes/leaves.js

const express = require('express');
const router = express.Router();
const sql = require('../db');

// Get all leave requests
router.get('/', async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM LeaveRequests');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit leave request
router.post('/', async (req, res) => {
  const { EmpCode, FromDate, ToDate, LeaveType, Reason } = req.body;
  try {
    await sql.query`
      INSERT INTO LeaveRequests (EmpCode, FromDate, ToDate, LeaveType, Reason)
      VALUES (${EmpCode}, ${FromDate}, ${ToDate}, ${LeaveType}, ${Reason})
    `;
    res.status(201).json({ message: 'Leave request submitted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve/Reject leave
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { Status } = req.body;
  try {
    await sql.query`
      UPDATE LeaveRequests
      SET Status = ${Status}
      WHERE ID = ${id}
    `;
    res.json({ message: 'Leave request updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete leave request
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sql.query`DELETE FROM LeaveRequests WHERE ID = ${id}`;
    res.json({ message: 'Leave request deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
