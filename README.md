# Rotary Club of Delhi Genesis — Website

React + Vite + Tailwind CSS frontend · Node.js + Express + MongoDB backend

---

## Prerequisites

- Node.js 18+
- MongoDB running locally **or** a MongoDB Atlas connection string

---

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and set your MongoDB URI:
```bash
cp .env.example .env
```

Edit `.env`:
```
MONGODB_URI=mongodb://127.0.0.1:27017/rcdgenesis   # local
# or
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/rcdgenesis  # Atlas
```

---

## Development (two terminals)

```bash
# Terminal 1 — backend (port 3001)
npm run server

# Terminal 2 — frontend (port 5173, proxies /api to 3001)
npm run dev
```

On first run the server **auto-seeds** all club data into MongoDB.

---

## Production

```bash
npm run build      # builds React → dist/
npm start          # Express serves API + frontend on port 3001
```

---

## Admin panel

URL: `/admin`  
Username: `admin`  
Password: `devdev`

---

## MongoDB collections

| Collection       | Purpose                              |
|-----------------|--------------------------------------|
| clubs            | Single club info document            |
| leaderships      | Rotary year timeline entries         |
| boards           | Board of Director roles              |
| members          | Active club members + photos         |
| activities       | Fellowships, assemblies, projects    |
| focusareas       | Rotary's 7 areas of focus            |
| presidentmessages| Homepage / popup message             |

---

## API endpoints

All `GET` routes are public. `POST / PUT / DELETE` require Bearer token from login.

```
POST   /api/auth/login
POST   /api/upload              (multipart/form-data, field: photo)

GET    /api/club
PUT    /api/club

GET    /api/leadership
POST   /api/leadership
PUT    /api/leadership/:id
DELETE /api/leadership/:id

GET    /api/board
POST   /api/board
PUT    /api/board/:id
DELETE /api/board/:id

GET    /api/members
POST   /api/members
PUT    /api/members/:id
DELETE /api/members/:id

GET    /api/activities
POST   /api/activities
PUT    /api/activities/:id
DELETE /api/activities/:id

GET    /api/message
PUT    /api/message

GET    /api/focusAreas
```
