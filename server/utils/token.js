import jwt from 'jsonwebtoken'
export function generateToken(uid, secret = 'ldx96', expiresIn = '7d') {
  return jwt.sign({ uid }, secret, { expiresIn })
}
