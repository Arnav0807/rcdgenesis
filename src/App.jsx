import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { DataProvider } from './store/DataContext.jsx'
import { AuthProvider } from './store/AuthContext.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import PageLoader from './components/PageLoader.jsx'
import PresidentMessagePopup from './components/PresidentMessagePopup.jsx'
import Home from './pages/Home.jsx'
import Leadership from './pages/Leadership.jsx'
import Board from './pages/Board.jsx'
import Members from './pages/Members.jsx'
import Activities from './pages/Activities.jsx'
import Admin from './pages/Admin.jsx'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
function Fade({ children }) {
  return <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.35,ease:[0.21,0.47,0.32,0.98]}}>{children}</motion.div>
}
function Routes_() {
  const loc = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={loc} key={loc.pathname}>
        <Route path="/"           element={<Fade><Home/></Fade>}/>
        <Route path="/leadership" element={<Fade><Leadership/></Fade>}/>
        <Route path="/board"      element={<Fade><Board/></Fade>}/>
        <Route path="/members"    element={<Fade><Members/></Fade>}/>
        <Route path="/activities" element={<Fade><Activities/></Fade>}/>
        <Route path="/admin"      element={<Fade><Admin/></Fade>}/>
      </Routes>
    </AnimatePresence>
  )
}
export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <PageLoader/>
        <div className="min-h-screen flex flex-col">
          <ScrollTop/>
          <Nav/>
          <main className="flex-1"><Routes_/></main>
          <Footer/>
          <PresidentMessagePopup/>
        </div>
      </DataProvider>
    </AuthProvider>
  )
}
