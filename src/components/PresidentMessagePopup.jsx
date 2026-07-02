import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useClubData } from '../store/DataContext'

const SEEN_KEY = 'delhiGenesisPresidentPopupSeen.v1'

export default function PresidentMessagePopup() {
  const { presidentMessage } = useClubData()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!presidentMessage.enabled || !presidentMessage.showAsPopup) return
    if (sessionStorage.getItem(SEEN_KEY) === 'true') return
    const t = setTimeout(() => setOpen(true), 600)
    return () => clearTimeout(t)
  }, [presidentMessage.enabled, presidentMessage.showAsPopup])

  function close() { setOpen(false); sessionStorage.setItem(SEEN_KEY, 'true') }

  if (!presidentMessage.enabled || !presidentMessage.showAsPopup) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-5"
          initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.25 }}>
          <motion.div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={close} aria-hidden="true" />
          <motion.div role="dialog" aria-modal="true"
            initial={{ opacity:0, scale:0.94, y:16 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.96, y:10 }}
            transition={{ duration:0.32, ease:[0.21,0.47,0.32,0.98] }}
            className="relative bg-bone text-[#1c2430] rounded-sm max-w-[560px] w-full p-8 md:p-10 shadow-2xl">
            <button onClick={close} aria-label="Close" className="absolute top-4 right-4 h-8 w-8 rounded-full flex items-center justify-center text-[#5a5347] hover:bg-bone-2 transition-colors">✕</button>
            <span className="font-mono text-[0.66rem] tracking-[0.16em] uppercase text-rose">A message from the president</span>
            <div className="flex items-center gap-4 mt-4 mb-5">
              {presidentMessage.photo
                ? <img src={presidentMessage.photo} alt={presidentMessage.name} className="h-14 w-14 rounded-full object-cover" />
                : <div className="h-14 w-14 rounded-full bg-ink text-gold-soft font-display font-semibold flex items-center justify-center text-[1.2rem]">{presidentMessage.name?.[0]??'P'}</div>
              }
              <div>
                <div className="font-display text-[1.15rem] leading-tight">{presidentMessage.name}</div>
                <div className="font-mono text-[0.74rem] text-teal">{presidentMessage.title}</div>
              </div>
            </div>
            <p className="text-[1rem] text-[#3a4150] leading-relaxed whitespace-pre-line">{presidentMessage.message}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
