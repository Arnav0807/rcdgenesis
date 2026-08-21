import { Router } from 'express'
import Club from '../models/Club.js'
import requireAuth from '../middleware/auth.js'
const router = Router()
router.get('/', async (req, res) => {
  try { res.json(await Club.findOne().lean()) }
  catch(e) { res.status(500).json({ message: e.message }) }
})
router.put('/', requireAuth, async (req, res) => {
  try {
    const club = await Club.findOneAndUpdate({}, req.body, { new:true, upsert:true, lean:true })
    res.json(club)
  } catch(e) { res.status(500).json({ message: e.message }) }
})
export default router
