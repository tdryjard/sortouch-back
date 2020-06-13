let jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function checkToken(req, res, next) {
  // Gather the jwt access token from the request header
  const token = req.headers['authorization']
  if (token == null) return false

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return false
    else return true
  })
}