import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/index.js'
export function generateToken(uid, secret, expiresIn = '7d') {
  return jwt.sign({ uid }, secret || JWT_SECRET, { expiresIn })
}

export function verifyToken(token, secret) {
  return jwt.verify(token, secret || JWT_SECRET)
}
