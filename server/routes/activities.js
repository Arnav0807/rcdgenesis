import { Router } from 'express'
import Activity from '../models/Activity.js'
import requireAuth from '../middleware/auth.js'
const router = Router()
router.get('/', async (req, res) => {
  try { res.json(await Activity.find()) }
  catch(e) { res.status(500).json({ message: e.message }) }
})
router.post('/', requireAuth, async (req, res) => {
  try { res.status(201).json(await Activity.create(req.body)) }
  catch(e) { res.status(500).json({ message: e.message }) }
})
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const doc = await Activity.findByIdAndUpdate(req.params.id, req.body, { new:true })
    if (!doc) return res.status(404).json({ message:'Not found' })
    res.json(doc)
  } catch(e) { res.status(500).json({ message: e.message }) }
})
router.delete('/:id', requireAuth, async (req, res) => {
  try { await Activity.findByIdAndDelete(req.params.id); res.json({ ok:true }) }
  catch(e) { res.status(500).json({ message: e.message }) }
})
export default router
