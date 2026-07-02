import { motion } from 'framer-motion'

export default function Reveal({ children, delay=0, y=18, duration=0.6, once=true, className='', as:Component=motion.div }) {
  return (
    <Component
      initial={{ opacity:0, y }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once, amount:0.2 }}
      transition={{ duration, delay, ease:[0.21,0.47,0.32,0.98] }}
      className={className}
    >
      {children}
    </Component>
  )
}
