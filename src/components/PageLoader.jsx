import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1600)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
        >
          {/* spinning rotary wheel */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 mb-6"
          >
            <img src="/logos/rotary-wheel.svg" alt="" className="w-full h-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center gap-1"
          >
            <span className="font-display text-[#ece6d8] text-[1.1rem]">Rotary Club of Delhi Genesis</span>
            <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-[#f7a81b]">District 3011</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
