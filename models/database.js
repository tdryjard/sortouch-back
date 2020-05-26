const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'b09c3af056ff0c',
  password: 'a0dcef16',
  database: 'heroku_42d9e07fd89aea5'
});

connection.connect(error => {
  if (error) {
    console.log(error)
    throw error;
  }
  console.log('Successfully connected to the database');
});

module.exports = connection;
