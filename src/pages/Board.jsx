import { motion } from 'framer-motion'
import { useClubData } from '../store/DataContext'
import Reveal from '../components/Reveal'

export default function Board() {
  const { board, club } = useClubData()
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-[#ece6d8] py-16 md:py-[70px]">
        <div className="pointer-events-none absolute -right-[10%] -top-[40%] h-[520px] w-[520px] rounded-full" style={{background:'radial-gradient(circle at 38% 38%, rgba(226,163,59,0.2), rgba(226,163,59,0) 64%)'}}/>
        <div className="relative mx-auto max-w-[1180px] px-7">
          <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}} className="font-mono text-[0.72rem] tracking-[0.16em] uppercase inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-current before:opacity-60">Club governance</motion.span>
          <motion.h1 initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.08}} className="font-display font-semibold leading-[1.08] max-w-[20ch] my-5 text-[2.2rem] md:text-[3.2rem]">The Board of Directors.</motion.h1>
          <motion.p initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.16}} className="max-w-[54ch] text-[1.06rem] text-[#aab9c9]">The board guides Delhi Genesis through each Rotary year — setting direction, allocating resources, and keeping the club's service commitments on track. Current term led by {club.currentPresident}.</motion.p>
        </div>
      </section>
      <section className="py-16 md:py-[90px]">
        <div className="mx-auto max-w-[1180px] px-7">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {board.map((b,i) => (
              <Reveal key={b.id??b.role} delay={Math.min(i*0.05,0.4)} y={16}>
                <div className={`rounded-sm p-7 flex flex-col gap-3 ${b.name?'bg-ink text-[#ece6d8]':'border-[1.5px] border-dashed border-[#1c2430]/25 text-[#5a5347]'}`}>
                  <span className={`font-mono text-[0.66rem] tracking-[0.1em] uppercase ${b.name?'text-[#aab9c9]':'text-[#5a5347]'}`}>{b.role}</span>
                  <span className={`font-display text-[1.3rem] ${!b.name?'italic text-[0.95rem]':''}`}>{b.name||'Add officer'}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
