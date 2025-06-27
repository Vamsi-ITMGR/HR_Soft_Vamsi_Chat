// backend/db.js

const sql = require('mssql');

const config = {
  user: 'your_sql_username',
  password: 'your_sql_password',
  server: 'localhost',
  database: 'HRPayrollDB',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

sql.connect(config)
  .then(() => console.log('✅ SQL Server connected'))
  .catch((err) => console.error('❌ DB connection error:', err));

module.exports = sql;

