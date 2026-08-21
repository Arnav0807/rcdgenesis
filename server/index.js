import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'

import authRoutes       from './routes/auth.js'
import uploadRoutes     from './routes/upload.js'
import clubRoutes       from './routes/club.js'
import leadershipRoutes from './routes/leadership.js'
import boardRoutes      from './routes/board.js'
import membersRoutes    from './routes/members.js'
import activitiesRoutes from './routes/activities.js'
import messageRoutes    from './routes/message.js'
import focusAreasRoutes from './routes/focusAreas.js'
import seed             from './seed.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app  = express()
const PORT = process.env.PORT || 3001
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rcdgenesis'

// Ensure uploads dir exists
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }))
app.use(express.json({ limit: '10mb' }))

// Static files
app.use('/uploads', express.static(uploadsDir))
const publicImages = path.join(__dirname, '../public/images')
if (fs.existsSync(publicImages)) app.use('/images', express.static(publicImages))
const publicLogos = path.join(__dirname, '../public/logos')
if (fs.existsSync(publicLogos)) app.use('/logos', express.static(publicLogos))

// API routes
app.use('/api/auth',       authRoutes)
app.use('/api/upload',     uploadRoutes)
app.use('/api/club',       clubRoutes)
app.use('/api/leadership', leadershipRoutes)
app.use('/api/board',      boardRoutes)
app.use('/api/members',    membersRoutes)
app.use('/api/activities', activitiesRoutes)
app.use('/api/message',    messageRoutes)
app.use('/api/focusAreas', focusAreasRoutes)

// Serve React build in production
const distDir = path.join(__dirname, '../dist')
if (process.env.NODE_ENV === 'production' && fs.existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get('*', (req, res) => res.sendFile(path.join(distDir, 'index.html')))
}

// Connect to MongoDB then start server
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log(`✓ MongoDB connected: ${MONGO_URI}`)
    await seed()
    app.listen(PORT, () => {
      console.log(`\n🌐  Rotary Club of Delhi Genesis`)
      console.log(`    http://localhost:${PORT}`)
      console.log(`    Admin: admin / devdev\n`)
    })
  })
  .catch(err => {
    console.error('✗ MongoDB connection failed:', err.message)
    console.error('  Make sure MongoDB is running or set MONGODB_URI in .env')
    process.exit(1)
  })
