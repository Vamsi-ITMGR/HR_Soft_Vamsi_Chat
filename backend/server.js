// backend/server.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const db = require('./db');
const employeeRoutes = require('./routes/employees');
const leaveRoutes = require('./routes/leaves');
const tadaRoutes = require('./routes/tada');
const loanRoutes = require('./routes/loans');
const authRoutes = require('./routes/auth');
const resignationRoutes = require('./routes/resignations');

app.use(cors());
app.use(express.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/tada', tadaRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/resignations', resignationRoutes);

app.get('/', (req, res) => res.send('HR Payroll API Running...'));

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

