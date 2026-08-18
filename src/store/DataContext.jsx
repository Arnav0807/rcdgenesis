import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { seedClub, seedLeadership, seedBoard, seedMembers, seedActivities, seedFocusAreas, seedPresidentMessage } from '../data/seed'

const KEY = 'delhiGenesisClubData.v1'
const DataContext = createContext(null)
const uid = p => `${p}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`

function load() {
  try {
    const r = localStorage.getItem(KEY)
    if (r) { const p = JSON.parse(r); return { club:{...seedClub,...p.club}, leadership:p.leadership??seedLeadership, board:p.board??seedBoard, members:p.members??seedMembers, activities:p.activities??seedActivities, focusAreas:p.focusAreas??seedFocusAreas, presidentMessage:{...seedPresidentMessage,...p.presidentMessage} } }
  } catch(e) {}
  return { club:seedClub, leadership:seedLeadership, board:seedBoard, members:seedMembers, activities:seedActivities, focusAreas:seedFocusAreas, presidentMessage:seedPresidentMessage }
}

export function DataProvider({ children }) {
  const [s, setS] = useState(load)
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(s)) } catch(e) {} }, [s])

  const updateClub = useCallback(p => setS(v => ({...v,club:{...v.club,...p}})), [])
  const updatePresidentMessage = useCallback(p => setS(v => ({...v,presidentMessage:{...v.presidentMessage,...p}})), [])
  const addLeadershipYear = useCallback(e => setS(v => ({...v,leadership:[...v.leadership,{id:uid('ly'),...e}]})), [])
  const updateLeadershipYear = useCallback((id,p) => setS(v => ({...v,leadership:v.leadership.map(l=>l.id===id?{...l,...p}:l)})), [])
  const deleteLeadershipYear = useCallback(id => setS(v => ({...v,leadership:v.leadership.filter(l=>l.id!==id)})), [])
  const addBoardRole = useCallback(e => setS(v => ({...v,board:[...v.board,{id:uid('b'),...e}]})), [])
  const updateBoardRole = useCallback((id,p) => setS(v => ({...v,board:v.board.map(b=>b.id===id?{...b,...p}:b)})), [])
  const deleteBoardRole = useCallback(id => setS(v => ({...v,board:v.board.filter(b=>b.id!==id)})), [])
  const addMember = useCallback(e => setS(v => ({...v,members:[...v.members,{id:uid('m'),...e}]})), [])
  const updateMember = useCallback((id,p) => setS(v => ({...v,members:v.members.map(m=>m.id===id?{...m,...p}:m)})), [])
  const deleteMember = useCallback(id => setS(v => ({...v,members:v.members.filter(m=>m.id!==id)})), [])
  const addActivity = useCallback(e => setS(v => ({...v,activities:[...v.activities,{id:uid('a'),...e}]})), [])
  const updateActivity = useCallback((id,p) => setS(v => ({...v,activities:v.activities.map(a=>a.id===id?{...a,...p}:a)})), [])
  const deleteActivity = useCallback(id => setS(v => ({...v,activities:v.activities.filter(a=>a.id!==id)})), [])

  return <DataContext.Provider value={{...s,updateClub,updatePresidentMessage,addLeadershipYear,updateLeadershipYear,deleteLeadershipYear,addBoardRole,updateBoardRole,deleteBoardRole,addMember,updateMember,deleteMember,addActivity,updateActivity,deleteActivity}}>{children}</DataContext.Provider>
}
export const useClubData = () => { const c = useContext(DataContext); if(!c) throw new Error('Need DataProvider'); return c }
