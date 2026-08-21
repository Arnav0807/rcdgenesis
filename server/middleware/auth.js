import jwt from 'jsonwebtoken'
const SECRET = process.env.JWT_SECRET || 'dgh-rotary-secret-2024'
export default function requireAuth(req, res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' })
  try { req.user = jwt.verify(header.slice(7), SECRET); next() }
  catch { res.status(401).json({ message: 'Invalid or expired token' }) }
}
