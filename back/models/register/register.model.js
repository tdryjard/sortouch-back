const db = require('../database')

const User = function createUser(user) {
    this.email = user.email;
    this.password = user.password;
    this.type = user.type;
}

User.create = (newUser, result) => {
    db.query('INSERT INTO user SET ?', [newUser], (error, dbResult) => {
      if (error) {
        return result(error, null);
      }
  
      return result(null, { id: dbResult.insertId, ...newUser });
    });
  };

User.connect = function userConnect(email, result) {
  db.query('SELECT * FROM user WHERE email = ?', [email], (err, dbResult) => {
    if (err) {
      return result({ err, status: 500 }, null);
    }
    if (!dbResult.length) {
      return result({ status: 404 }, null);
    }
    return result(null, dbResult[0]);
  });
};

module.exports = User