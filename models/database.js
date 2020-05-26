const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || '0.0.0.0',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(error => {
  if (error) {
    console.log(error)
    throw error;
  }
  console.log('Successfully connected to the database');
});

module.exports = connection;
