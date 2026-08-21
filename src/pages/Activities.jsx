import { motion } from 'framer-motion'
import { useClubData } from '../store/DataContext'
import Reveal from '../components/Reveal'
const KL = { fellowship:'Fellowship', assembly:'Assembly', project:'Project' }
function Category({ idx, title, heading, intro, entries }) {
  return (
    <section className="pt-16 md:pt-[78px]">
      <div className="mx-auto max-w-[1280px] px-5">
        <Reveal>
          <span className="font-mono text-[0.72rem] tracking-[0.16em] uppercase inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-current before:opacity-60">{idx} — {title}</span>
          <h2 className="font-display font-semibold my-1.5 text-[1.7rem] md:text-[2.2rem]">{heading}</h2>
          <p className="m-0 max-w-[62ch] text-[#5a5347] mb-8">{intro}</p>
        </Reveal>
        {entries.length>0?(
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {entries.map((e,i)=>(
              <Reveal key={e.id} delay={Math.min(i*0.06,0.3)} y={20}>
                <motion.div whileHover={{y:-4}} transition={{duration:0.2}} className="bg-bone-2 rounded-sm overflow-hidden flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden"><img src={e.photo} alt="" className="h-full w-full object-cover"/></div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-display text-[1.15rem] mb-1.5">{e.title}</h3>
                    <span className="font-mono text-[0.72rem] tracking-[0.04em] text-teal mb-3 block">{e.when}</span>
                    <p className="text-[0.92rem] text-[#5a5347] m-0">{e.description}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        ):(
          <div className="border-[1.5px] border-dashed border-[#1c2430]/20 rounded-sm flex items-center justify-center text-[#5a5347] font-mono text-[0.76rem] uppercase tracking-[0.04em] p-10">Add entries from the admin panel</div>
        )}
      </div>
    </section>
  )
}
export default function Activities() {
  const { activities } = useClubData()
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-[#ece6d8] py-16 md:py-[70px]">
        <div className="pointer-events-none absolute -right-[10%] -top-[40%] h-[520px] w-[520px] rounded-full" style={{background:'radial-gradient(circle at 38% 38%, rgba(226,163,59,0.2), rgba(226,163,59,0) 64%)'}}/>
        <div className="relative mx-auto max-w-[1280px] px-5">
          <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}} className="font-mono text-[0.72rem] tracking-[0.16em] uppercase inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-current before:opacity-60">Fellowship, assemblies &amp; projects</motion.span>
          <motion.h1 initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.08}} className="font-display font-semibold leading-[1.08] max-w-[18ch] my-5 text-[2.2rem] md:text-[3.2rem]">Where the club gathers and gives.</motion.h1>
          <motion.p initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.16}} className="max-w-[54ch] text-[1.04rem] text-[#aab9c9]">A running record kept up to date from the admin panel.</motion.p>
        </div>
      </section>
      <Category idx="01" title="Fellowships"     heading="Evenings that build the friendships service is built on."  intro="Informal gatherings, dinners, and celebrations where members connect beyond the boardroom."                                         entries={activities.filter(a=>a.kind==='fellowship')}/>
      <Category idx="02" title="Club assemblies" heading="The meetings where the club plans together."               intro="Regular sessions where Delhi Genesis reviews progress, sets direction, and makes decisions as a club."                           entries={activities.filter(a=>a.kind==='assembly')}/>
      <Category idx="03" title="Service projects" heading="The work that carries service above self."               intro="Projects through which Delhi Genesis puts Rotary's motto into practice in the community."                                       entries={activities.filter(a=>a.kind==='project')}/>
    </>
  )
}
