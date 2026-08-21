import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'
import requireAuth from '../middleware/auth.js'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, `${uuidv4()}${path.extname(file.originalname).toLowerCase()}`)
})
const upload = multer({ storage, limits:{ fileSize: 8*1024*1024 }, fileFilter:(req,file,cb)=>file.mimetype.startsWith('image/')?cb(null,true):cb(new Error('Images only')) })
const router = Router()
router.post('/', requireAuth, upload.single('photo'), (req, res) => {
  if (!req.file) return res.status(400).json({ message:'No file uploaded' })
  res.json({ url:`/uploads/${req.file.filename}` })
})
export default router
