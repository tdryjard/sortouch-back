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

User.update = (userId, newUser, result) => {
  db.query('UPDATE user SET ? WHERE id = ?', [newUser, userId], (error, response) => {
    if (error) {
      console.log(error)
      return result(error, null);
    }

    if (response.affectedRows === 0) {
      return result({ kind: 'not_found' }, null);
    }

    return result(null, { userId: Number(userId), ...newUser });
  });
};

User.find = (userId, result) => {
  db.query(
    'SELECT custom FROM user WHERE id = ?',
    [userId],
    (error, dbResult) => {
      if (error) {
        console.log(error)
        return result(error, null);
      }

      if (dbResult.length) {
        return result(null, dbResult);
      }

      return result({ kind: 'not_found' }, null);
    }
  );
};

module.exports = User