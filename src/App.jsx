import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { DataProvider } from './store/DataContext.jsx'
import { AuthProvider } from './store/AuthContext.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import PresidentMessagePopup from './components/PresidentMessagePopup.jsx'
import Home from './pages/Home.jsx'
import Leadership from './pages/Leadership.jsx'
import Board from './pages/Board.jsx'
import Members from './pages/Members.jsx'
import Activities from './pages/Activities.jsx'
import Admin from './pages/Admin.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0,0) }, [pathname])
  return null
}
function PageFade({ children }) {
  return (
    <motion.div
      initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
      transition={{ duration:0.35, ease:[0.21,0.47,0.32,0.98] }}
    >{children}</motion.div>
  )
}
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"           element={<PageFade><Home/></PageFade>} />
        <Route path="/leadership" element={<PageFade><Leadership/></PageFade>} />
        <Route path="/board"      element={<PageFade><Board/></PageFade>} />
        <Route path="/members"    element={<PageFade><Members/></PageFade>} />
        <Route path="/activities" element={<PageFade><Activities/></PageFade>} />
        <Route path="/admin"      element={<PageFade><Admin/></PageFade>} />
      </Routes>
    </AnimatePresence>
  )
}
export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <div className="min-h-screen flex flex-col">
          <ScrollToTop/>
          <Nav/>
          <main className="flex-1"><AnimatedRoutes/></main>
          <Footer/>
          <PresidentMessagePopup/>
        </div>
      </DataProvider>
    </AuthProvider>
  )
}
