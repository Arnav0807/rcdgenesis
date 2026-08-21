import { Router } from 'express'
import PresidentMessage from '../models/PresidentMessage.js'
import requireAuth from '../middleware/auth.js'
const router = Router()
router.get('/', async (req, res) => {
  try { res.json(await PresidentMessage.findOne().lean() || {}) }
  catch(e) { res.status(500).json({ message: e.message }) }
})
router.put('/', requireAuth, async (req, res) => {
  try {
    const doc = await PresidentMessage.findOneAndUpdate({}, req.body, { new:true, upsert:true, lean:true })
    res.json(doc)
  } catch(e) { res.status(500).json({ message: e.message }) }
})
export default router
