import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { seedClub, seedLeadership, seedBoard, seedMembers, seedActivities, seedFocusAreas, seedPresidentMessage } from '../data/seed'

const STORAGE_KEY = 'delhiGenesisClubData.v1'
const DataContext = createContext(null)

function uid(p) { return `${p}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}` }

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const p = JSON.parse(raw)
      return {
        club: { ...seedClub, ...p.club },
        leadership: p.leadership ?? seedLeadership,
        board: p.board ?? seedBoard,
        members: p.members ?? seedMembers,
        activities: p.activities ?? seedActivities,
        focusAreas: p.focusAreas ?? seedFocusAreas,
        presidentMessage: { ...seedPresidentMessage, ...p.presidentMessage },
      }
    }
  } catch(e) { console.warn('could not load saved data', e) }
  return { club:seedClub, leadership:seedLeadership, board:seedBoard, members:seedMembers, activities:seedActivities, focusAreas:seedFocusAreas, presidentMessage:seedPresidentMessage }
}

export function DataProvider({ children }) {
  const [state, setState] = useState(load)
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch(e) {} }, [state])

  const updateClub = useCallback((p) => setState(s => ({ ...s, club: { ...s.club, ...p } })), [])
  const updatePresidentMessage = useCallback((p) => setState(s => ({ ...s, presidentMessage: { ...s.presidentMessage, ...p } })), [])

  const addLeadershipYear = useCallback((e) => setState(s => ({ ...s, leadership: [...s.leadership, { id:uid('ly'), ...e }] })), [])
  const updateLeadershipYear = useCallback((id, p) => setState(s => ({ ...s, leadership: s.leadership.map(l => l.id===id ? { ...l, ...p } : l) })), [])
  const deleteLeadershipYear = useCallback((id) => setState(s => ({ ...s, leadership: s.leadership.filter(l => l.id!==id) })), [])

  const addBoardRole = useCallback((e) => setState(s => ({ ...s, board: [...s.board, { id:uid('b'), ...e }] })), [])
  const updateBoardRole = useCallback((id, p) => setState(s => ({ ...s, board: s.board.map(b => b.id===id ? { ...b, ...p } : b) })), [])
  const deleteBoardRole = useCallback((id) => setState(s => ({ ...s, board: s.board.filter(b => b.id!==id) })), [])

  const addMember = useCallback((e) => setState(s => ({ ...s, members: [...s.members, { id:uid('m'), ...e }] })), [])
  const updateMember = useCallback((id, p) => setState(s => ({ ...s, members: s.members.map(m => m.id===id ? { ...m, ...p } : m) })), [])
  const deleteMember = useCallback((id) => setState(s => ({ ...s, members: s.members.filter(m => m.id!==id) })), [])

  const addActivity = useCallback((e) => setState(s => ({ ...s, activities: [...s.activities, { id:uid('a'), ...e }] })), [])
  const updateActivity = useCallback((id, p) => setState(s => ({ ...s, activities: s.activities.map(a => a.id===id ? { ...a, ...p } : a) })), [])
  const deleteActivity = useCallback((id) => setState(s => ({ ...s, activities: s.activities.filter(a => a.id!==id) })), [])

  return (
    <DataContext.Provider value={{ ...state, updateClub, updatePresidentMessage, addLeadershipYear, updateLeadershipYear, deleteLeadershipYear, addBoardRole, updateBoardRole, deleteBoardRole, addMember, updateMember, deleteMember, addActivity, updateActivity, deleteActivity }}>
      {children}
    </DataContext.Provider>
  )
}

export function useClubData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useClubData must be inside DataProvider')
  return ctx
}
