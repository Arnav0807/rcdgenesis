import { Router } from 'express'
import jwt from 'jsonwebtoken'
const SECRET = process.env.JWT_SECRET || 'dgh-rotary-secret-2024'
const router = Router()
router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username?.trim().toLowerCase() === 'admin' && password === 'devdev') {
    return res.json({ token: jwt.sign({ role:'admin' }, SECRET, { expiresIn:'8h' }) })
  }
  res.status(401).json({ message: 'Incorrect username or password.' })
})
export default router
