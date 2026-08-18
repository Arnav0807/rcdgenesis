import { motion } from 'framer-motion'
import { useClubData } from '../store/DataContext'
import Reveal from '../components/Reveal'

function Field({ k, v }) {
  return (
    <>
      <span className="font-mono text-[0.67rem] tracking-[0.08em] uppercase text-[#aab9c9] pt-[3px] whitespace-nowrap">{k}</span>
      <span className="text-[#ece6d8]">{v ?? <span className="italic text-[#7e8da0]">Not yet on record</span>}</span>
    </>
  )
}
function Card({ entry }) {
  return (
    <div className="bg-ink text-[#ece6d8] rounded-sm px-7 py-6 max-w-[460px] w-full">
      <div className="font-mono text-[0.72rem] tracking-[0.1em] uppercase text-[#aab9c9] flex items-center gap-2.5 mb-2.5">
        {entry.year}
        {entry.tag && <span className={entry.tag==='Charter Year'?'font-mono text-[0.6rem] uppercase px-2 py-0.5 rounded-full bg-gold text-ink':'font-mono text-[0.6rem] uppercase px-2 py-0.5 rounded-full border border-gold-soft text-gold-soft'}>{entry.tag}</span>}
      </div>
      <h3 className="font-display text-[1.5rem] mb-3.5">{entry.president}</h3>
      <div className="grid grid-cols-[auto_1fr] gap-x-3.5 gap-y-1.5 text-[0.94rem]">
        <Field k="President" v={entry.president}/>
        <Field k="First Lady" v={entry.firstLady}/>
        <Field k="Secretary" v={entry.secretary}/>
        <Field k="AG" v={entry.ag}/>
        <Field k="District Governor" v={entry.dg}/>
      </div>
      {entry.note && <div className="mt-4 pt-3.5 border-t border-white/15 text-[0.88rem] text-[#aab9c9] italic">{entry.note}</div>}
    </div>
  )
}
function Node({ entry }) {
  if (entry.tag==='Charter Year') return (
    <div className="relative h-[34px] w-[34px] rounded-full z-10 flex items-center justify-center" style={{background:'radial-gradient(circle, #e2a33b 0%, #e2a33b 55%, transparent 56%)'}}>
      <span className="absolute -inset-3 -z-10 rounded-full opacity-55" style={{background:'repeating-conic-gradient(#f1c887 0deg 4deg, transparent 4deg 30deg)'}}/>
    </div>
  )
  return <div className={`h-[22px] w-[22px] rounded-full border-[3px] z-10 ${entry.tag==='Current Term'?'border-gold bg-gold-soft':'border-teal bg-bone'}`}/>
}
export default function Leadership() {
  const { leadership } = useClubData()
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-[#ece6d8] py-16 md:py-[70px]">
        <div className="pointer-events-none absolute -right-[10%] -top-[40%] h-[520px] w-[520px] rounded-full" style={{background:'radial-gradient(circle at 38% 38%, rgba(226,163,59,0.2), rgba(226,163,59,0) 64%)'}}/>
        <div className="relative mx-auto max-w-[1280px] px-5">
          <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}} className="font-mono text-[0.72rem] tracking-[0.16em] uppercase inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-current before:opacity-60">The leadership timeline</motion.span>
          <motion.h1 initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.08}} className="font-display font-semibold leading-[1.08] max-w-[18ch] my-5 text-[2.2rem] md:text-[3.2rem]">Four years, one continuous line.</motion.h1>
          <motion.p initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.16}} className="max-w-[52ch] text-[1.04rem] text-[#aab9c9]">Every Rotary year pairs a president, secretary, and AG with the District Governor serving District 3011 that same year.</motion.p>
        </div>
      </section>
      <section className="py-20 md:py-[100px]">
        <div className="mx-auto max-w-[1280px] px-5">
          <div className="relative">
            <motion.div initial={{scaleY:0}} whileInView={{scaleY:1}} viewport={{once:true,amount:0.1}} transition={{duration:1.1,ease:'easeOut'}} style={{transformOrigin:'top'}} className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
              <div className="h-full w-full" style={{background:'linear-gradient(180deg,#e2a33b 0%,#c45a4d 35%,#3e7c7b 70%,#22405e 100%)'}}/>
            </motion.div>
            <div className="md:hidden absolute left-[18px] top-0 bottom-0 w-0.5" style={{background:'linear-gradient(180deg,#e2a33b 0%,#c45a4d 35%,#3e7c7b 70%,#22405e 100%)'}}/>
            {leadership.map((entry,i) => {
              const isEven = i%2===0
              return (
                <div key={entry.id} className="relative">
                  <div className="hidden md:grid md:grid-cols-[1fr_60px_1fr] items-start mb-14 last:mb-0">
                    <div className={isEven?'flex justify-end pr-10':''}>{isEven&&<Reveal y={20} delay={0.05*i}><Card entry={entry}/></Reveal>}</div>
                    <div className="flex justify-center pt-1"><Node entry={entry}/></div>
                    <div className={!isEven?'flex justify-start pl-10':''}>{!isEven&&<Reveal y={20} delay={0.05*i}><Card entry={entry}/></Reveal>}</div>
                  </div>
                  <div className="md:hidden flex items-start gap-4 mb-10 last:mb-0">
                    <div className="pt-1 pl-[7px] shrink-0"><Node entry={entry}/></div>
                    <Reveal y={16} delay={0.04*i} className="flex-1"><Card entry={entry}/></Reveal>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
