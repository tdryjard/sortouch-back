let jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function checkToken (req, res) {
  let token = req.headers['authorization']; // Express headers are auto converted to lowercase

  let success = false

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        success = false
      } else {
        success = true
      }
    });
  } else {
    success = false
  }
  return success
};
