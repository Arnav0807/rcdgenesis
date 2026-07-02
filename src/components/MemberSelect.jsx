import { useState, useEffect } from 'react'

const inputCls = 'w-full bg-bone border border-[#1c2430]/20 rounded-sm px-3 py-2.5 text-[0.94rem] focus:border-gold outline-none transition-colors'

export default function MemberSelect({ value, onChange, members, placeholder='— Not yet on record —' }) {
  const names = members.map(m => `${m.firstName} ${m.lastName}`.trim())
  const [mode, setMode] = useState(value && !names.includes(value) ? 'custom' : 'select')
  useEffect(() => { setMode(value && !names.includes(value) ? 'custom' : 'select') }, [value]) // eslint-disable-line

  const sorted = [...names].sort((a,b) => a.localeCompare(b))

  if (mode === 'custom') return (
    <div className="space-y-1.5">
      <input className={inputCls} value={value||''} onChange={e => onChange(e.target.value)} placeholder="Type a name" />
      <button type="button" onClick={() => { setMode('select'); onChange('') }} className="font-mono text-[0.66rem] tracking-[0.06em] uppercase text-teal hover:underline">
        Choose from members instead
      </button>
    </div>
  )

  return (
    <select className={inputCls} value={value||''} onChange={e => { if(e.target.value==='__other__'){setMode('custom');onChange('')} else onChange(e.target.value) }}>
      <option value="">{placeholder}</option>
      {sorted.map(n => <option key={n} value={n}>{n}</option>)}
      <option value="__other__">Someone else (type a name)…</option>
    </select>
  )
}
