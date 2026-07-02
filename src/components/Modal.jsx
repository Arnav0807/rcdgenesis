import { AnimatePresence, motion } from 'framer-motion'

export default function Modal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto"
          initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          transition={{ duration:0.2 }}
        >
          <motion.div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            role="dialog" aria-modal="true" aria-label={title}
            initial={{ opacity:0, scale:0.96, y:14 }}
            animate={{ opacity:1, scale:1, y:0 }}
            exit={{ opacity:0, scale:0.97, y:10 }}
            transition={{ duration:0.25, ease:[0.21,0.47,0.32,0.98] }}
            className="relative bg-bone text-[#1c2430] rounded-sm max-w-[600px] w-full my-8 p-7 sm:p-8 shadow-2xl max-h-[88vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-[1.3rem]">{title}</h3>
              <button onClick={onClose} aria-label="Close" className="h-8 w-8 rounded-full flex items-center justify-center text-[#5a5347] hover:bg-bone-2 transition-colors shrink-0">✕</button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
