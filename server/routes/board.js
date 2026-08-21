import { Router } from 'express'
import Board from '../models/Board.js'
import requireAuth from '../middleware/auth.js'
const router = Router()
router.get('/', async (req, res) => {
  try { res.json(await Board.find()) }
  catch(e) { res.status(500).json({ message: e.message }) }
})
router.post('/', requireAuth, async (req, res) => {
  try { res.status(201).json(await Board.create(req.body)) }
  catch(e) { res.status(500).json({ message: e.message }) }
})
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const doc = await Board.findByIdAndUpdate(req.params.id, req.body, { new:true })
    if (!doc) return res.status(404).json({ message:'Not found' })
    res.json(doc)
  } catch(e) { res.status(500).json({ message: e.message }) }
})
router.delete('/:id', requireAuth, async (req, res) => {
  try { await Board.findByIdAndDelete(req.params.id); res.json({ ok:true }) }
  catch(e) { res.status(500).json({ message: e.message }) }
})
export default router
