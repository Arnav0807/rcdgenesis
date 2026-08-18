import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const links = [
  { to:'/', label:'Home' },
  { to:'/leadership', label:'Leadership' },
  { to:'/board', label:'Board' },
  { to:'/members', label:'Members' },
  { to:'/activities', label:'Fellowship & Projects' },
]

export default function Nav() {
  return (
    <motion.header
      initial={{ y:-16, opacity:0 }} animate={{ y:0, opacity:1 }}
      transition={{ duration:0.5, ease:[0.21,0.47,0.32,0.98] }}
      className="bg-ink text-[#ece6d8] sticky top-0 z-40"
    >
      <div className="mx-auto max-w-[1280px] px-5">
        <nav className="flex flex-wrap items-center justify-between gap-4 py-3">
          {/* Club logo + name */}
          <NavLink to="/" className="flex items-center gap-3" aria-label="Delhi Genesis home">
            <img src="/logos/club-logo.png" alt="Rotary Club of Delhi Genesis" className="h-20 w-auto object-contain" />
          </NavLink>

          {/* nav links */}
          <div className="flex flex-wrap items-center gap-5 text-[0.88rem]">
            {links.map(l => (
              <NavLink key={l.to} to={l.to}
                className={({isActive}) => `relative py-1 opacity-80 hover:opacity-100 transition-opacity ${isActive?'opacity-100 after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-gold':''}`}>
                {l.label}
              </NavLink>
            ))}
            <NavLink to="/admin"
              className={({isActive}) => `flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.06em] uppercase px-2.5 py-1.5 rounded-sm border border-white/20 opacity-70 hover:opacity-100 hover:border-white/40 transition-colors ${isActive?'opacity-100 border-gold/60 text-gold-soft':''}`}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <rect x="1.5" y="5" width="9" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M3.5 5V3.5a2.5 2.5 0 0 1 5 0V5" stroke="currentColor" strokeWidth="1.1"/>
              </svg>
              Admin
            </NavLink>
          </div>

          {/* District logo — right side */}
          <a href="https://rotary3011.org" target="_blank" rel="noopener noreferrer" title="Rotary District 3011" className="hidden md:flex items-center">
            <img src="/logos/district-logo.png" alt="Rotary District 3011" className="h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" />
          </a>
        </nav>
      </div>
      <div className="horizon"/>
    </motion.header>
  )
}
