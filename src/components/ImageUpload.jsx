import { useRef } from 'react'
export default function ImageUpload({ value, onChange, label='Photo', circular=false }) {
  const ref = useRef(null)
  function handleFile(e) {
    const f = e.target.files?.[0]; if(!f) return
    if(f.size>3_500_000){alert('Please use an image under ~3 MB.');return}
    const r=new FileReader(); r.onload=()=>onChange(r.result); r.readAsDataURL(f)
  }
  return (
    <div>
      <label className="font-mono text-[0.66rem] tracking-[0.1em] uppercase text-[#5a5347] block mb-2">{label}</label>
      <div className="flex items-center gap-4">
        <div className={`bg-bone-2 border border-dashed border-[#1c2430]/25 overflow-hidden flex items-center justify-center shrink-0 ${circular?'h-16 w-16 rounded-full':'h-20 w-28 rounded-sm'}`}>
          {value?<img src={value} alt="" className="h-full w-full object-cover"/>:<span className="text-[#5a5347] text-[0.6rem] font-mono uppercase text-center px-1">No photo</span>}
        </div>
        <div className="flex flex-col gap-2">
          <button type="button" onClick={()=>ref.current?.click()} className="font-mono text-[0.7rem] tracking-[0.06em] uppercase px-3 py-2 rounded-sm border border-[#1c2430]/25 hover:bg-bone-2 transition-colors">{value?'Replace':'Upload'} photo</button>
          {value&&<button type="button" onClick={()=>onChange(null)} className="font-mono text-[0.7rem] tracking-[0.06em] uppercase px-3 py-2 rounded-sm text-rose hover:bg-rose/10 transition-colors">Remove</button>}
        </div>
        <input ref={ref} type="file" accept="image/*" onChange={handleFile} className="hidden"/>
      </div>
    </div>
  )
}
