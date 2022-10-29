const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/index.js')
module.exports.generateToken = (uid, secret, expiresIn = '7d') => {
  return jwt.sign({ uid }, secret || JWT_SECRET, { expiresIn })
}

module.exports.verifyToken = (token, secret) => {
  return jwt.verify(token, secret || JWT_SECRET)
}
