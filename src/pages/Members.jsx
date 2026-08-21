import { motion } from 'framer-motion'
import { useClubData } from '../store/DataContext'
import Reveal from '../components/Reveal'
function initials(f,l) { return `${(f||'?')[0]}${(l||'?')[0]}`.toUpperCase() }
export default function Members() {
  const { members } = useClubData()
  const sorted = [...members].sort((a,b)=>(a.lastName||'').localeCompare(b.lastName||''))
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-[#ece6d8] py-16 md:py-[70px]">
        <div className="pointer-events-none absolute -right-[10%] -top-[40%] h-[520px] w-[520px] rounded-full" style={{background:'radial-gradient(circle at 38% 38%, rgba(226,163,59,0.2), rgba(226,163,59,0) 64%)'}}/>
        <div className="relative mx-auto max-w-[1280px] px-5">
          <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}} className="font-mono text-[0.72rem] tracking-[0.16em] uppercase inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-current before:opacity-60">{members.length} active members</motion.span>
          <motion.h1 initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.08}} className="font-display font-semibold leading-[1.08] max-w-[20ch] my-5 text-[2.2rem] md:text-[3.2rem]">The people who make up Delhi Genesis.</motion.h1>
          <motion.p initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.16}} className="max-w-[58ch] text-[1.04rem] text-[#aab9c9]">Every active member of the club. Home addresses and personal contact details are kept off this public page.</motion.p>
        </div>
      </section>
      <section className="py-16 md:py-[90px]">
        <div className="mx-auto max-w-[1280px] px-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((m,i)=>(
            <Reveal key={m.id} delay={Math.min(i*0.04,0.4)} y={16}>
              <div className="bg-bone-2 rounded-sm p-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  {m.photo?<img src={m.photo} alt="" className="h-12 w-12 rounded-full object-cover shrink-0"/>:<div className="h-12 w-12 rounded-full bg-ink text-gold-soft font-display font-semibold flex items-center justify-center text-[1.05rem] shrink-0">{initials(m.firstName,m.lastName)}</div>}
                  <div>
                    <div className="font-display text-[1.1rem] leading-tight text-[#1c2430]">{m.firstName} {m.lastName}</div>
                    <div className="font-mono text-[0.72rem] tracking-[0.04em] text-teal">{m.city}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#1c2430]/10">
                  <span className="font-mono text-[0.67rem] tracking-[0.08em] uppercase text-[#5a5347]">Since {m.since}</span>
                  {m.role&&<span className="font-mono text-[0.58rem] tracking-[0.08em] uppercase px-2 py-1 rounded-full bg-gold/20 text-[#8a5a16] text-right">{m.role}</span>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
