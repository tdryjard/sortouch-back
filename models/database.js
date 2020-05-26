const mysql = require('mysql');

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.query('select 1 + 1', (err, rows) => {
  if (err) {
    console.log(err)
    throw err;
  }
  console.log('Successfully connected to the database');
});

module.exports = connection;
