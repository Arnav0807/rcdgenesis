import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const links = [
  { to:'/', label:'Home' },
  { to:'/leadership', label:'Leadership' },
  { to:'/board', label:'Board' },
  { to:'/members', label:'Members' },
  { to:'/activities', label:'Fellowship & Projects' },
]

function Mark() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <circle cx="15" cy="15" r="14" stroke="#e2a33b" strokeWidth="1.2"/>
      <path d="M15 1 L15 6 M27.9 8 L23.5 10.5 M27.9 22 L23.5 19.5 M2.1 8 L6.5 10.5 M2.1 22 L6.5 19.5 M15 29 L15 24" stroke="#e2a33b" strokeWidth="1.2"/>
      <circle cx="15" cy="15" r="5.5" fill="#e2a33b"/>
    </svg>
  )
}

export default function Nav() {
  return (
    <motion.header
      initial={{ y:-16, opacity:0 }} animate={{ y:0, opacity:1 }}
      transition={{ duration:0.5, ease:[0.21,0.47,0.32,0.98] }}
      className="bg-ink text-[#ece6d8] sticky top-0 z-40"
    >
      <div className="mx-auto max-w-[1180px] px-7">
        <nav className="flex flex-wrap items-center justify-between gap-6 py-[18px]">
          <NavLink to="/" className="flex items-center gap-3 font-display font-semibold text-[1.05rem]" aria-label="Delhi Genesis home">
            <Mark/>Delhi Genesis
          </NavLink>
          <div className="flex flex-wrap items-center gap-5 text-[0.92rem]">
            {links.map(l => (
              <NavLink key={l.to} to={l.to}
                className={({isActive}) => `relative py-1 opacity-80 hover:opacity-100 ${isActive ? 'opacity-100 after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-gold' : ''}`}>
                {l.label}
              </NavLink>
            ))}
            <NavLink to="/admin"
              className={({isActive}) => `flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.06em] uppercase px-2.5 py-1.5 rounded-sm border border-white/20 opacity-70 hover:opacity-100 hover:border-white/40 transition-colors ${isActive ? 'opacity-100 border-gold/60 text-gold-soft' : ''}`}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <rect x="2" y="5.5" width="9" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M4 5.5V4a2.5 2.5 0 0 1 5 0v1.5" stroke="currentColor" strokeWidth="1.1"/>
              </svg>
              Admin
            </NavLink>
          </div>
        </nav>
      </div>
      <div className="horizon"/>
    </motion.header>
  )
}
