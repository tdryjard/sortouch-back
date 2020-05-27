const mysql = require('mysql');

const connection = mysql.createPool({ 
  connectionLimit: 5,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

connection.getConnection(function(err, connection) {
  if (err) throw err;
  else console.log('connected')
});

module.exports = connection;
