import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useClubData } from '../store/DataContext'
import Reveal from '../components/Reveal'

function Ledger({ label, value, border }) {
  return (
    <div className={`p-5 ${border?'border-b md:border-b-0 md:border-r border-white/15':''}`}>
      <span className="font-mono text-[0.66rem] tracking-[0.12em] uppercase text-[#aab9c9] block mb-2">{label}</span>
      <span className="font-display font-semibold text-[1.18rem]">{value}</span>
    </div>
  )
}
function RouteCard({ to, title, text, cta, icon, dark }) {
  return (
    <Link to={to} className={`group block h-full rounded-sm p-9 transition-transform hover:-translate-y-1 ${dark?'bg-ink text-[#ece6d8]':'bg-bone-2 text-[#1c2430]'}`}>
      <div className="mb-5">{icon}</div>
      <h3 className="font-display text-[1.5rem] mb-3">{title}</h3>
      <p className={`text-[0.98rem] mb-5 ${dark?'text-[#aab9c9]':'text-[#5a5347]'}`}>{text}</p>
      <span className={`font-mono text-[0.78rem] tracking-[0.08em] uppercase inline-flex items-center gap-2 ${dark?'text-gold-soft':'text-teal'}`}>{cta}</span>
    </Link>
  )
}

export default function Home() {
  const { club, focusAreas, presidentMessage } = useClubData()
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-[#ece6d8] py-[74px] md:py-[86px]">
        <motion.div initial={{opacity:0,scale:0.85}} animate={{opacity:1,scale:1}} transition={{duration:1.1,ease:'easeOut'}}
          className="pointer-events-none absolute -right-[12%] -top-[30%] h-[620px] w-[620px] rounded-full"
          style={{background:'radial-gradient(circle at 38% 38%, rgba(226,163,59,0.22), rgba(226,163,59,0) 64%)'}}/>
        <div className="relative mx-auto max-w-[1180px] px-7">
          <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}}
            className="font-mono text-[0.72rem] tracking-[0.16em] uppercase inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-current before:opacity-60">
            Rotary Club of Delhi Genesis — District {club.district}
          </motion.span>
          <motion.h1 initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.1,ease:[0.21,0.47,0.32,0.98]}}
            className="font-display font-semibold leading-[1.06] max-w-[14ch] my-6 text-[2.5rem] md:text-[3.4rem] lg:text-[4.4rem]">
            Where service<br/>begins <em className="italic text-gold-soft font-medium">again.</em>
          </motion.h1>
          <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.24}}
            className="max-w-[46ch] text-[1.12rem] text-[#aab9c9] mb-9">
            Chartered on {club.chartered}, Delhi Genesis is one of the newer clubs in District {club.district} — built by members who chose to start something rather than wait for one to arrive.
          </motion.p>
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.34}} className="flex flex-wrap gap-4 mb-12">
            <Link to="/leadership" className="font-mono text-[0.78rem] tracking-[0.08em] uppercase px-5 py-3 rounded-sm bg-gold border border-gold text-ink inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5 hover:bg-gold-soft">Meet our leadership →</Link>
            <Link to="/activities" className="font-mono text-[0.78rem] tracking-[0.08em] uppercase px-5 py-3 rounded-sm border border-[#ece6d8] text-[#ece6d8] inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5 hover:bg-white/5">See fellowships &amp; projects →</Link>
          </motion.div>
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.42}}
            className="grid grid-cols-2 md:grid-cols-4 border border-white/15 rounded-sm overflow-hidden">
            <Ledger label="Chartered" value={club.chartered} border/>
            <Ledger label="District" value={club.district} border/>
            <Ledger label="Club ID" value={club.clubId} border/>
            <Ledger label="Current President" value={club.currentPresident}/>
          </motion.div>
        </div>
      </section>

      {presidentMessage.enabled && (
        <section className="py-20 md:py-[84px] bg-bone-2">
          <div className="mx-auto max-w-[1180px] px-7">
            <Reveal>
              <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start bg-bone rounded-sm p-8 md:p-10">
                {presidentMessage.photo
                  ? <img src={presidentMessage.photo} alt={presidentMessage.name} className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover shrink-0"/>
                  : <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-ink text-gold-soft font-display font-semibold flex items-center justify-center text-[1.8rem] shrink-0">{presidentMessage.name?.[0]??'P'}</div>
                }
                <div>
                  <span className="font-mono text-[0.66rem] tracking-[0.16em] uppercase text-rose">A message from the president</span>
                  <p className="font-display text-[1.3rem] md:text-[1.5rem] leading-snug mt-3 mb-4 max-w-[60ch]">"{presidentMessage.message}"</p>
                  <div className="font-mono text-[0.8rem] text-[#5a5347]"><span className="text-[#1c2430] font-semibold">{presidentMessage.name}</span> · {presidentMessage.title}</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="py-20 md:py-[84px]">
        <div className="mx-auto max-w-[1180px] px-7 grid md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-16">
          <Reveal>
            <span className="font-mono text-[0.72rem] tracking-[0.16em] uppercase inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-current before:opacity-60">About the club</span>
            <h2 className="font-display font-semibold leading-[1.12] mt-3 text-[1.9rem] md:text-[2.6rem]">A club still being written.</h2>
          </Reveal>
          <Reveal delay={0.1} className="text-[1.05rem] text-[#5a5347] space-y-4">
            <p>Every Rotary club has an origin story; ours is still being drafted. Delhi Genesis was founded by a group of professionals who wanted a club shaped by their own pace, their own causes, and their own friendships — while carrying forward Rotary's commitment to service above self.</p>
            <p>In the years since the charter signing, the club has been led by a small line of presidents, each adding a chapter to a story that began with a single ceremony in September 2023.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-4 pb-20 md:pb-[84px]">
        <div className="mx-auto max-w-[1180px] px-7">
          <Reveal>
            <span className="font-mono text-[0.72rem] tracking-[0.16em] uppercase inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-current before:opacity-60">Our Rotary family</span>
            <h2 className="font-display font-semibold leading-[1.12] mt-3 mb-9 text-[1.9rem] md:text-[2.6rem] max-w-[20ch]">No club stands alone.</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            <Reveal delay={0.05}>
              <div className="bg-bone-2 rounded-sm p-7 h-full">
                <span className="font-mono text-[0.62rem] tracking-[0.1em] uppercase text-rose">Sponsor club</span>
                <h3 className="font-display text-[1.3rem] mt-2 mb-2">{club.sponsorClub}</h3>
                <p className="m-0 text-[#5a5347] text-[0.96rem]">The club that brought Delhi Genesis into the Rotary family, sponsoring our charter in September 2023.</p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="bg-bone-2 rounded-sm p-7 h-full">
                <span className="font-mono text-[0.62rem] tracking-[0.1em] uppercase text-teal">Sponsored club</span>
                <h3 className="font-display text-[1.3rem] mt-2 mb-2">{club.sponsoredClub}</h3>
                <p className="m-0 text-[#5a5347] text-[0.96rem]">The Rotaract club Delhi Genesis has sponsored in turn, carrying Rotary's mission forward with the next generation of leaders.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-[84px] bg-bone-2">
        <div className="mx-auto max-w-[1180px] px-7">
          <Reveal>
            <span className="font-mono text-[0.72rem] tracking-[0.16em] uppercase inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-current before:opacity-60">What we organize our service around</span>
            <h2 className="font-display font-semibold leading-[1.12] mt-3 mb-3 text-[1.9rem] md:text-[2.6rem] max-w-[22ch]">Rotary's seven areas of focus.</h2>
            <p className="max-w-[64ch] text-[#5a5347] text-[1.02rem] mb-10">Every Rotary club, including ours, points its service projects toward one or more of these seven global causes.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {focusAreas.map((area,i) => (
              <Reveal key={area.title} delay={Math.min(i*0.06,0.36)} y={16}>
                <div className="bg-bone rounded-sm p-6 flex flex-col gap-3 h-full">
                  <span className="h-2.5 w-2.5 rounded-full" style={{backgroundColor:area.color}} aria-hidden="true"/>
                  <h3 className="font-display text-[1.05rem] leading-snug">{area.title}</h3>
                  <p className="m-0 text-[#5a5347] text-[0.9rem]">{area.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-[90px] bg-ink text-[#ece6d8]">
        <div className="mx-auto max-w-[1180px] px-7">
          <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-16 items-start">
            <Reveal>
              <span className="font-mono text-[0.72rem] tracking-[0.16em] uppercase inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-current before:opacity-60">Rotary's ethical compass</span>
              <h2 className="font-display font-semibold leading-[1.12] mt-3 text-[1.9rem] md:text-[2.6rem]">The Four-Way Test.</h2>
              <p className="mt-4 text-[#aab9c9] text-[0.98rem] max-w-[40ch]">Of the things we think, say, or do, every Rotarian is asked to weigh four simple questions.</p>
            </Reveal>
            <ol className="grid sm:grid-cols-2 gap-5 list-none m-0 p-0">
              {['Is it the TRUTH?','Is it FAIR to all concerned?','Will it build GOODWILL and BETTER FRIENDSHIPS?','Will it be BENEFICIAL to all concerned?'].map((q,i) => (
                <Reveal key={q} delay={0.08*i} y={16}>
                  <li className="bg-ink-2 rounded-sm p-6 h-full">
                    <span className="font-mono text-gold-soft text-[0.8rem]">0{i+1}</span>
                    <p className="font-display text-[1.18rem] leading-snug mt-2 m-0">{q}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-[1180px] px-7">
          <Reveal>
            <span className="font-mono text-[0.72rem] tracking-[0.16em] uppercase inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-current before:opacity-60">Explore the club</span>
            <h2 className="font-display font-semibold leading-[1.12] mt-3 mb-9 text-[1.9rem] md:text-[2.6rem]">Four ways into the story.</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-7">
            {[
              {to:'/leadership',dark:true, title:'Leadership timeline', text:'Every president, first lady, secretary, AG, and District Governor since our charter year.', cta:'View the timeline →',
               icon:<svg width="34" height="34" viewBox="0 0 34 34" fill="none"><line x1="4" y1="30" x2="30" y2="4" stroke="#e2a33b" strokeWidth="1.3"/><circle cx="6.5" cy="27.5" r="3" fill="#e2a33b"/><circle cx="27.5" cy="6.5" r="3" fill="#f1c887"/><circle cx="17" cy="17" r="2.2" fill="#c45a4d"/></svg>},
              {to:'/board',    dark:false, title:'Board of Directors',  text:'The officers steering Delhi Genesis through the current Rotary year.', cta:'Meet the board →',
               icon:<svg width="34" height="34" viewBox="0 0 34 34" fill="none"><rect x="6" y="8" width="22" height="18" rx="1.5" stroke="#c45a4d" strokeWidth="1.3"/><line x1="6" y1="14" x2="28" y2="14" stroke="#c45a4d" strokeWidth="1.3"/><line x1="13" y1="14" x2="13" y2="26" stroke="#c45a4d" strokeWidth="1.3"/></svg>},
              {to:'/members',  dark:false, title:'Members',             text:'Every active Rotarian who makes up Delhi Genesis, in one directory.', cta:'See the members →',
               icon:<svg width="34" height="34" viewBox="0 0 34 34" fill="none"><circle cx="12" cy="11" r="4.6" stroke="#3e7c7b" strokeWidth="1.3"/><circle cx="23" cy="14" r="3.6" stroke="#3e7c7b" strokeWidth="1.3"/><path d="M4 27c0.8-5 4-7.6 8-7.6s7.2 2.6 8 7.6" stroke="#3e7c7b" strokeWidth="1.3" strokeLinecap="round"/><path d="M19 27c0.6-3.6 2.8-5.6 5.5-5.6s4.9 2 5.5 5.6" stroke="#3e7c7b" strokeWidth="1.3" strokeLinecap="round"/></svg>},
              {to:'/activities',dark:true, title:'Fellowship & projects', text:'Where the club gathers, plans, and gives back — assemblies, fellowship evenings, and service projects.', cta:'View activities →',
               icon:<svg width="34" height="34" viewBox="0 0 34 34" fill="none"><circle cx="11" cy="13" r="6" stroke="#e2a33b" strokeWidth="1.3"/><circle cx="23" cy="13" r="6" stroke="#e2a33b" strokeWidth="1.3"/><path d="M5 28c1-5 5-8 12-8s11 3 12 8" stroke="#e2a33b" strokeWidth="1.3" strokeLinecap="round"/></svg>},
            ].map((c,i) => (
              <Reveal key={c.to} delay={0.05*i}>
                <RouteCard {...c}/>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
