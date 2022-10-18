import jwt from 'jsonwebtoken'
export function generateToken(uid, secret, expiresIn = '7d') {
  return jwt.sign({ uid }, secret || process.env.JWT_SECRET, { expiresIn })
}

export function verifyToken(token, secret) {
  return jwt.verify(token, secret || process.env.JWT_SECRET)
}
