import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useClubData } from '../store/DataContext'

const KL = { fellowship: 'Fellowship', assembly: 'Assembly', project: 'Project' }

export default function HeroSlider() {
  const { activities } = useClubData()

  // Only show activities that have photos (non-placeholder)
  const slides = activities.length > 0 ? activities : []
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)

  const go = useCallback((next) => {
    setDir(next > idx ? 1 : -1)
    setIdx(next)
  }, [idx])

  useEffect(() => {
    if (slides.length < 2) return
    const t = setInterval(() => {
      setDir(1)
      setIdx(i => (i + 1) % slides.length)
    }, 3500)
    return () => clearInterval(t)
  }, [slides.length])

  if (!slides.length) return null

  const slide = slides[idx % slides.length]

  const variants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0 }),
  }

  return (
    <div className="relative w-full h-full rounded-sm overflow-hidden select-none">
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.div
          key={idx}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slide.photo}
            alt={slide.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
          {/* caption overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent">
            <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-gold-soft mb-1 block">
              {KL[slide.kind]}
            </span>
            <p className="font-display text-[0.95rem] text-[#ece6d8] leading-snug m-0">{slide.title}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-3 right-3 flex gap-1.5 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? 'w-5 bg-gold' : 'w-1.5 bg-white/50 hover:bg-white/70'}`}
            />
          ))}
        </div>
      )}

      {/* prev / next */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => go((idx - 1 + slides.length) % slides.length)}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-ink/60 hover:bg-ink/80 flex items-center justify-center text-[#ece6d8] text-[0.85rem] transition-colors z-10"
          >‹</button>
          <button
            onClick={() => go((idx + 1) % slides.length)}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-ink/60 hover:bg-ink/80 flex items-center justify-center text-[#ece6d8] text-[0.85rem] transition-colors z-10"
          >›</button>
        </>
      )}
    </div>
  )
}
