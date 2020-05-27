const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Successfully connected to the database');
});

function handleDisconnect(conn) {
  conn.on('error', function(err) {
    if (!err.fatal) {
      return;
    }

    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }

    console.log('Re-connecting lost connection: ' + err.stack);

    connection = mysql.createConnection(conn.config);
    handleDisconnect(connection);
    connection.connect();
  });
}

handleDisconnect(connection);

module.exports = connection;
