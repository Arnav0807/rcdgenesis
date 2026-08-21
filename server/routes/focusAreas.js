import { Router } from 'express'
import FocusArea from '../models/FocusArea.js'
const router = Router()
router.get('/', async (req, res) => {
  try { res.json(await FocusArea.find().lean()) }
  catch(e) { res.status(500).json({ message: e.message }) }
})
export default router
