import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../store/AuthContext'
import { useClubData } from '../store/DataContext'
import ImageUpload from '../components/ImageUpload'
import Modal from '../components/Modal'
import MemberSelect from '../components/MemberSelect'

/* ── shared ui ── */
const iCls = 'w-full bg-bone border border-[#1c2430]/20 rounded-sm px-3 py-2.5 text-[0.94rem] focus:border-gold outline-none transition-colors'
const F = ({label,children}) => <label className="block"><span className="font-mono text-[0.66rem] tracking-[0.1em] uppercase text-[#5a5347] block mb-1.5">{label}</span>{children}</label>
const TI = p => <input {...p} className={iCls}/>
const TA = p => <textarea {...p} className={`${iCls} min-h-[90px] resize-y`}/>
const SaveBtn = ({children='Save'}) => <button type="submit" className="font-mono text-[0.72rem] tracking-[0.08em] uppercase px-5 py-2.5 rounded-sm bg-gold text-ink hover:bg-gold-soft transition-colors">{children}</button>
const CancelBtn = ({onClick}) => <button type="button" onClick={onClick} className="font-mono text-[0.72rem] tracking-[0.08em] uppercase px-5 py-2.5 rounded-sm border border-[#1c2430]/20 hover:bg-bone-2 transition-colors">Cancel</button>
const AddBtn = ({onClick,children}) => <button type="button" onClick={onClick} className="font-mono text-[0.72rem] tracking-[0.08em] uppercase px-5 py-2.5 rounded-sm bg-ink text-[#ece6d8] hover:bg-ink-2 transition-colors inline-flex items-center gap-2"><span className="text-gold-soft">+</span>{children}</button>
const EditBtn = ({onClick}) => <button type="button" onClick={onClick} className="font-mono text-[0.64rem] tracking-[0.06em] uppercase px-3 py-1.5 rounded-sm border border-[#1c2430]/20 hover:bg-bone-2 transition-colors">Edit</button>
const DelBtn = ({onClick}) => <button type="button" onClick={onClick} className="font-mono text-[0.64rem] tracking-[0.06em] uppercase px-3 py-1.5 rounded-sm border border-rose/40 text-rose hover:bg-rose/10 transition-colors">Delete</button>
const Flash = ({show}) => <AnimatePresence>{show&&<motion.span initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="font-mono text-[0.72rem] text-teal">Saved ✓</motion.span>}</AnimatePresence>
function Toggle({checked,onChange}) {
  return <button type="button" onClick={()=>onChange(!checked)} aria-pressed={checked} className={`relative h-7 w-12 rounded-full transition-colors shrink-0 ${checked?'bg-gold':'bg-[#1c2430]/20'}`}><motion.span layout transition={{type:'spring',stiffness:500,damping:32}} className="absolute top-1 h-5 w-5 rounded-full bg-bone shadow" style={{left:checked?26:4}}/></button>
}

/* ── login ── */
function Login() {
  const {login,error} = useAuth()
  const [u,setU]=useState(''); const [p,setP]=useState('')
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-20 px-7">
      <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="bg-ink text-[#ece6d8] rounded-sm p-9 max-w-[400px] w-full">
        <div className="flex items-center gap-3 mb-6">
          <motion.img src="/logos/rotary-wheel.svg" alt="" className="w-10 h-10" animate={{rotate:360}} transition={{duration:8,repeat:Infinity,ease:'linear'}}/>
          <div>
            <span className="font-mono text-[0.68rem] tracking-[0.16em] uppercase text-gold-soft block">Admin access</span>
            <h1 className="font-display text-[1.6rem] leading-tight">Sign in to manage the site.</h1>
          </div>
        </div>
        <form onSubmit={e=>{e.preventDefault();login(u,p)}} className="space-y-4">
          <label className="block"><span className="font-mono text-[0.66rem] tracking-[0.1em] uppercase text-[#aab9c9] block mb-1.5">Username</span><input value={u} onChange={e=>setU(e.target.value)} autoFocus className="w-full bg-ink-2 border border-white/15 rounded-sm px-3 py-2.5 text-[0.94rem] focus:border-gold outline-none transition-colors"/></label>
          <label className="block"><span className="font-mono text-[0.66rem] tracking-[0.1em] uppercase text-[#aab9c9] block mb-1.5">Password</span><input type="password" value={p} onChange={e=>setP(e.target.value)} className="w-full bg-ink-2 border border-white/15 rounded-sm px-3 py-2.5 text-[0.94rem] focus:border-gold outline-none transition-colors"/></label>
          {error&&<p className="text-rose text-[0.85rem] m-0">{error}</p>}
          <button type="submit" className="w-full font-mono text-[0.76rem] tracking-[0.08em] uppercase px-5 py-3 rounded-sm bg-gold text-ink hover:bg-gold-soft transition-colors">Sign in</button>
        </form>
      </motion.div>
    </section>
  )
}

/* ── club tab ── */
function ClubTab() {
  const {club,updateClub}=useClubData(); const [d,setD]=useState(club); const [f,setF]=useState(false)
  const fields=[['name','Club name'],['clubId','RI club ID'],['district','District'],['chartered','Chartered date'],['charterPresident','Charter president'],['currentPresident','Current president'],['sponsorClub','Sponsor club'],['sponsoredClub','Sponsored club']]
  function save(e){e.preventDefault();updateClub(d);setF(true);setTimeout(()=>setF(false),1800)}
  return <form onSubmit={save} className="space-y-4 max-w-[640px]"><div className="grid sm:grid-cols-2 gap-4">{fields.map(([k,l])=><F key={k} label={l}><TI value={d[k]??''} onChange={e=>setD(p=>({...p,[k]:e.target.value}))}/></F>)}</div><div className="flex items-center gap-3 pt-2"><SaveBtn>Save details</SaveBtn><Flash show={f}/></div></form>
}

/* ── message tab ── */
function MessageTab() {
  const {presidentMessage:pm,updatePresidentMessage}=useClubData(); const [d,setD]=useState(pm); const [f,setF]=useState(false)
  function save(e){e.preventDefault();updatePresidentMessage(d);setF(true);setTimeout(()=>setF(false),1800)}
  return (
    <form onSubmit={save} className="space-y-6 max-w-[640px]">
      <div className="flex items-center justify-between bg-bone-2 rounded-sm p-5"><div><div className="font-display text-[1.05rem]">Show on homepage</div><p className="m-0 text-[0.85rem] text-[#5a5347]">Displays a message section on the homepage.</p></div><Toggle checked={d.enabled} onChange={v=>setD(p=>({...p,enabled:v}))}/></div>
      <div className="flex items-center justify-between bg-bone-2 rounded-sm p-5"><div><div className="font-display text-[1.05rem]">Also show as a popup</div><p className="m-0 text-[0.85rem] text-[#5a5347]">Pops up once per visitor session.</p></div><Toggle checked={d.showAsPopup} onChange={v=>setD(p=>({...p,showAsPopup:v}))}/></div>
      <ImageUpload circular label="President's photo" value={d.photo} onChange={v=>setD(p=>({...p,photo:v}))}/>
      <F label="President's name"><TI value={d.name} onChange={e=>setD(p=>({...p,name:e.target.value}))}/></F>
      <F label="Title / term"><TI value={d.title} onChange={e=>setD(p=>({...p,title:e.target.value}))}/></F>
      <F label="Message"><TA value={d.message} onChange={e=>setD(p=>({...p,message:e.target.value}))}/></F>
      <div className="flex items-center gap-3"><SaveBtn>Save message</SaveBtn><Flash show={f}/></div>
    </form>
  )
}

/* ── leadership tab ── */
const bL={year:'',tag:'',president:'',firstLady:'',secretary:'',ag:'',dg:'',note:''}
function LeadershipTab() {
  const {leadership,members,addLeadershipYear,updateLeadershipYear,deleteLeadershipYear}=useClubData()
  const [d,setD]=useState(bL); const [eid,setEid]=useState(null); const [open,setOpen]=useState(false)
  const openAdd=()=>{setEid(null);setD(bL);setOpen(true)}
  const openEdit=e=>{setEid(e.id);setD({...bL,...e,tag:e.tag??'',firstLady:e.firstLady??'',ag:e.ag??'',note:e.note??''});setOpen(true)}
  const close=()=>setOpen(false)
  function save(e){e.preventDefault();const p={...d,tag:d.tag||null,firstLady:d.firstLady||null,ag:d.ag||null,note:d.note||null};eid?updateLeadershipYear(eid,p):addLeadershipYear(p);close()}
  return (
    <div className="space-y-6">
      <AddBtn onClick={openAdd}>Add a Rotary year</AddBtn>
      <div className="space-y-3">
        {leadership.map(l=>(
          <div key={l.id} className="bg-bone-2 rounded-sm p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-mono text-[0.67rem] tracking-[0.08em] uppercase text-teal mb-1">{l.year}{l.tag?` · ${l.tag}`:''}</div>
              <div className="font-display text-[1.05rem]">{l.president||'Unnamed term'}</div>
              <div className="text-[0.84rem] text-[#5a5347] mt-1">{[l.firstLady&&`FL: ${l.firstLady}`,l.secretary&&`Sec: ${l.secretary}`,l.ag&&`AG: ${l.ag}`,l.dg&&`DG: ${l.dg}`].filter(Boolean).join(' · ')}</div>
            </div>
            <div className="flex gap-2"><EditBtn onClick={()=>openEdit(l)}/><DelBtn onClick={()=>deleteLeadershipYear(l.id)}/></div>
          </div>
        ))}
      </div>
      <Modal open={open} onClose={close} title={eid?'Edit Rotary year':'Add a Rotary year'}>
        <form onSubmit={save} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <F label="Rotary year"><TI value={d.year} onChange={e=>setD(p=>({...p,year:e.target.value}))} required placeholder="e.g. 2026 – 27"/></F>
            <F label="Tag (optional)"><TI value={d.tag} onChange={e=>setD(p=>({...p,tag:e.target.value}))} placeholder="Charter Year / Current Term"/></F>
            <F label="President"><MemberSelect members={members} value={d.president} onChange={v=>setD(p=>({...p,president:v}))}/></F>
            <F label="First Lady"><MemberSelect members={members} value={d.firstLady} onChange={v=>setD(p=>({...p,firstLady:v}))}/></F>
            <F label="Secretary"><MemberSelect members={members} value={d.secretary} onChange={v=>setD(p=>({...p,secretary:v}))}/></F>
            <F label="AG (Assistant Governor)"><TI value={d.ag} onChange={e=>setD(p=>({...p,ag:e.target.value}))}/></F>
            <F label="District Governor"><TI value={d.dg} onChange={e=>setD(p=>({...p,dg:e.target.value}))}/></F>
          </div>
          <F label="Note (optional)"><TA value={d.note} onChange={e=>setD(p=>({...p,note:e.target.value}))}/></F>
          <div className="flex gap-3 pt-1"><SaveBtn>{eid?'Save changes':'Add year'}</SaveBtn><CancelBtn onClick={close}/></div>
        </form>
      </Modal>
    </div>
  )
}

/* ── board tab ── */
const bB={role:'',name:''}
function BoardTab() {
  const {board,members,addBoardRole,updateBoardRole,deleteBoardRole}=useClubData()
  const [d,setD]=useState(bB); const [eid,setEid]=useState(null); const [open,setOpen]=useState(false)
  const openAdd=()=>{setEid(null);setD(bB);setOpen(true)}
  const openEdit=b=>{setEid(b.id);setD({role:b.role,name:b.name||''});setOpen(true)}
  const close=()=>setOpen(false)
  function save(e){e.preventDefault();const p={role:d.role,name:d.name||null};eid?updateBoardRole(eid,p):addBoardRole(p);close()}
  return (
    <div className="space-y-6">
      <AddBtn onClick={openAdd}>Add a board role</AddBtn>
      <div className="grid sm:grid-cols-2 gap-3">
        {board.map(b=>(
          <div key={b.id} className="bg-bone-2 rounded-sm p-5 flex items-center justify-between gap-4">
            <div><div className="font-mono text-[0.65rem] tracking-[0.08em] uppercase text-teal mb-1">{b.role}</div><div className="font-display text-[1.02rem]">{b.name||<span className="italic text-[#5a5347]">Unassigned</span>}</div></div>
            <div className="flex gap-2 shrink-0"><EditBtn onClick={()=>openEdit(b)}/><DelBtn onClick={()=>deleteBoardRole(b.id)}/></div>
          </div>
        ))}
      </div>
      <Modal open={open} onClose={close} title={eid?'Edit board role':'Add a board role'}>
        <form onSubmit={save} className="space-y-4">
          <F label="Role / position"><TI value={d.role} onChange={e=>setD(p=>({...p,role:e.target.value}))} required/></F>
          <F label="Assigned to"><MemberSelect members={members} value={d.name} onChange={v=>setD(p=>({...p,name:v}))} placeholder="— Unassigned —"/></F>
          <div className="flex gap-3 pt-1"><SaveBtn>{eid?'Save changes':'Add role'}</SaveBtn><CancelBtn onClick={close}/></div>
        </form>
      </Modal>
    </div>
  )
}

/* ── members tab ── */
const bM={firstName:'',lastName:'',city:'',since:'',role:'',photo:null}
function MembersTab() {
  const {members,addMember,updateMember,deleteMember}=useClubData()
  const [d,setD]=useState(bM); const [eid,setEid]=useState(null); const [open,setOpen]=useState(false)
  const openAdd=()=>{setEid(null);setD(bM);setOpen(true)}
  const openEdit=m=>{setEid(m.id);setD({...bM,...m});setOpen(true)}
  const close=()=>setOpen(false)
  function save(e){e.preventDefault();eid?updateMember(eid,d):addMember(d);close()}
  const sorted=[...members].sort((a,b)=>(a.lastName||'').localeCompare(b.lastName||''))
  return (
    <div className="space-y-6">
      <AddBtn onClick={openAdd}>Add a member</AddBtn>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {sorted.map(m=>(
          <div key={m.id} className="bg-bone-2 rounded-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              {m.photo?<img src={m.photo} alt="" className="h-10 w-10 rounded-full object-cover"/>:<div className="h-10 w-10 rounded-full bg-ink text-gold-soft font-display flex items-center justify-center text-[0.9rem]">{(m.firstName?.[0]??'?')}{(m.lastName?.[0]??'')}</div>}
              <div><div className="font-display text-[0.98rem] leading-tight">{m.firstName} {m.lastName}</div><div className="font-mono text-[0.68rem] text-teal">{m.city}</div></div>
            </div>
            {m.role&&<div className="font-mono text-[0.6rem] uppercase text-[#8a5a16] mb-3">{m.role}</div>}
            <div className="flex gap-2"><EditBtn onClick={()=>openEdit(m)}/><DelBtn onClick={()=>deleteMember(m.id)}/></div>
          </div>
        ))}
      </div>
      <Modal open={open} onClose={close} title={eid?'Edit member':'Add a member'}>
        <form onSubmit={save} className="space-y-4">
          <ImageUpload circular label="Photo (optional)" value={d.photo} onChange={v=>setD(p=>({...p,photo:v}))}/>
          <div className="grid sm:grid-cols-2 gap-4">
            <F label="First name"><TI value={d.firstName} onChange={e=>setD(p=>({...p,firstName:e.target.value}))} required/></F>
            <F label="Last name"><TI value={d.lastName} onChange={e=>setD(p=>({...p,lastName:e.target.value}))} required/></F>
            <F label="City / state"><TI value={d.city} onChange={e=>setD(p=>({...p,city:e.target.value}))}/></F>
            <F label="Member since"><TI value={d.since} onChange={e=>setD(p=>({...p,since:e.target.value}))} placeholder="e.g. Jul 2023"/></F>
          </div>
          <F label="Club position (optional)"><TI value={d.role} onChange={e=>setD(p=>({...p,role:e.target.value}))} placeholder="e.g. President, Secretary"/></F>
          <div className="flex gap-3 pt-1"><SaveBtn>{eid?'Save changes':'Add member'}</SaveBtn><CancelBtn onClick={close}/></div>
        </form>
      </Modal>
    </div>
  )
}

/* ── activities tab ── */
const bA={kind:'fellowship',title:'',when:'',photo:null,description:''}
const KL={fellowship:'Fellowship',assembly:'Assembly',project:'Project'}
function ActivitiesTab() {
  const {activities,addActivity,updateActivity,deleteActivity}=useClubData()
  const [d,setD]=useState(bA); const [eid,setEid]=useState(null); const [open,setOpen]=useState(false); const [filter,setFilter]=useState('all')
  const openAdd=()=>{setEid(null);setD(bA);setOpen(true)}
  const openEdit=a=>{setEid(a.id);setD({...bA,...a});setOpen(true)}
  const close=()=>setOpen(false)
  function save(e){e.preventDefault();if(!d.photo){alert('Please add a photo.');return};eid?updateActivity(eid,d):addActivity(d);close()}
  const visible=filter==='all'?activities:activities.filter(a=>a.kind===filter)
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AddBtn onClick={openAdd}>Add fellowship, assembly, or project</AddBtn>
        <div className="flex flex-wrap gap-2">
          {['all','fellowship','assembly','project'].map(k=>(
            <button key={k} type="button" onClick={()=>setFilter(k)} className={`font-mono text-[0.66rem] tracking-[0.06em] uppercase px-3 py-1.5 rounded-full border transition-colors ${filter===k?'bg-ink text-[#ece6d8] border-ink':'border-[#1c2430]/20 hover:bg-bone-2'}`}>{k==='all'?'All':KL[k]}</button>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map(a=>(
          <div key={a.id} className="bg-bone-2 rounded-sm overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden"><img src={a.photo} alt="" className="h-full w-full object-cover"/></div>
            <div className="p-4">
              <span className="font-mono text-[0.58rem] uppercase text-rose">{KL[a.kind]}</span>
              <div className="font-display text-[0.98rem] mt-1 mb-1">{a.title}</div>
              <div className="font-mono text-[0.68rem] text-teal mb-3">{a.when}</div>
              <div className="flex gap-2"><EditBtn onClick={()=>openEdit(a)}/><DelBtn onClick={()=>deleteActivity(a.id)}/></div>
            </div>
          </div>
        ))}
        {!visible.length&&<p className="text-[#5a5347] text-[0.9rem]">Nothing here yet.</p>}
      </div>
      <Modal open={open} onClose={close} title={eid?'Edit entry':'Add a fellowship, assembly, or project'}>
        <form onSubmit={save} className="space-y-4">
          <F label="Type"><div className="flex gap-2">{['fellowship','assembly','project'].map(k=><button key={k} type="button" onClick={()=>setD(p=>({...p,kind:k}))} className={`flex-1 font-mono text-[0.68rem] tracking-[0.06em] uppercase px-3 py-2.5 rounded-sm border transition-colors ${d.kind===k?'bg-ink text-[#ece6d8] border-ink':'border-[#1c2430]/20 hover:bg-bone-2'}`}>{KL[k]}</button>)}</div></F>
          <ImageUpload label="Photo" value={d.photo} onChange={v=>setD(p=>({...p,photo:v}))}/>
          <F label="Caption / title"><TI value={d.title} onChange={e=>setD(p=>({...p,title:e.target.value}))} required/></F>
          <F label="Date"><TI value={d.when} onChange={e=>setD(p=>({...p,when:e.target.value}))} placeholder="e.g. 12 March 2026"/></F>
          <F label="Description"><TA value={d.description} onChange={e=>setD(p=>({...p,description:e.target.value}))}/></F>
          <div className="flex gap-3 pt-1"><SaveBtn>{eid?'Save changes':'Add entry'}</SaveBtn><CancelBtn onClick={close}/></div>
        </form>
      </Modal>
    </div>
  )
}

/* ── admin shell ── */
const TABS=[
  {key:'club',label:'Club details',Comp:ClubTab},
  {key:'message',label:"President's message",Comp:MessageTab},
  {key:'leadership',label:'Leadership timeline',Comp:LeadershipTab},
  {key:'board',label:'Board of Directors',Comp:BoardTab},
  {key:'members',label:'Members',Comp:MembersTab},
  {key:'activities',label:'Fellowship & projects',Comp:ActivitiesTab},
]
function Dashboard() {
  const {logout}=useAuth(); const [tab,setTab]=useState('club')
  const {Comp}=TABS.find(t=>t.key===tab)
  return (
    <>
      <section className="bg-ink text-[#ece6d8] py-10">
        <div className="mx-auto max-w-[1280px] px-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <motion.img src="/logos/rotary-wheel.svg" alt="" className="w-10 h-10" animate={{rotate:360}} transition={{duration:8,repeat:Infinity,ease:'linear'}}/>
            <div><span className="font-mono text-[0.68rem] tracking-[0.16em] uppercase text-gold-soft block">Admin panel</span><h1 className="font-display text-[1.7rem]">Manage the club site.</h1></div>
          </div>
          <button onClick={logout} className="font-mono text-[0.7rem] tracking-[0.06em] uppercase px-4 py-2 rounded-sm border border-white/20 hover:border-white/40 transition-colors">Log out</button>
        </div>
      </section>
      <section className="py-10">
        <div className="mx-auto max-w-[1280px] px-5">
          <div className="flex flex-wrap gap-2 mb-10 border-b border-[#1c2430]/10 pb-6">
            {TABS.map(t=><button key={t.key} onClick={()=>setTab(t.key)} className={`font-mono text-[0.7rem] tracking-[0.06em] uppercase px-4 py-2.5 rounded-sm transition-colors ${tab===t.key?'bg-ink text-[#ece6d8]':'bg-bone-2 text-[#1c2430] hover:bg-bone-2/70'}`}>{t.label}</button>)}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.22}}>
              <Comp/>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
export default function Admin() {
  const {isAdmin}=useAuth(); return isAdmin?<Dashboard/>:<Login/>
}
