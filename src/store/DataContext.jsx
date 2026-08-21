import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api } from '../lib/api'

const DataContext = createContext(null)
const EMPTY = { club:{}, leadership:[], board:[], members:[], activities:[], focusAreas:[], presidentMessage:{} }

export function DataProvider({ children }) {
  const [data, setData] = useState(EMPTY)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAll() {
      try {
        const [club, leadership, board, members, activities, focusAreas, presidentMessage] =
          await Promise.all([
            api.get('/club'), api.get('/leadership'), api.get('/board'),
            api.get('/members'), api.get('/activities'), api.get('/focusAreas'), api.get('/message'),
          ])
        setData({ club, leadership, board, members, activities, focusAreas, presidentMessage })
      } catch (e) { console.error('Failed to load data:', e.message) }
      finally { setLoading(false) }
    }
    loadAll()
  }, [])

  const updateClub = useCallback(async p => { const u = await api.put('/club', p); setData(d => ({...d, club:u})) }, [])
  const updatePresidentMessage = useCallback(async p => { const u = await api.put('/message', p); setData(d => ({...d, presidentMessage:u})) }, [])

  const addLeadershipYear = useCallback(async e => { const c = await api.post('/leadership', e); setData(d => ({...d, leadership:[...d.leadership, c]})) }, [])
  const updateLeadershipYear = useCallback(async (id, p) => { const u = await api.put(`/leadership/${id}`, p); setData(d => ({...d, leadership:d.leadership.map(l=>l.id===id?u:l)})) }, [])
  const deleteLeadershipYear = useCallback(async id => { await api.delete(`/leadership/${id}`); setData(d => ({...d, leadership:d.leadership.filter(l=>l.id!==id)})) }, [])

  const addBoardRole = useCallback(async e => { const c = await api.post('/board', e); setData(d => ({...d, board:[...d.board, c]})) }, [])
  const updateBoardRole = useCallback(async (id, p) => { const u = await api.put(`/board/${id}`, p); setData(d => ({...d, board:d.board.map(b=>b.id===id?u:b)})) }, [])
  const deleteBoardRole = useCallback(async id => { await api.delete(`/board/${id}`); setData(d => ({...d, board:d.board.filter(b=>b.id!==id)})) }, [])

  const addMember = useCallback(async e => { const c = await api.post('/members', e); setData(d => ({...d, members:[...d.members, c]})) }, [])
  const updateMember = useCallback(async (id, p) => { const u = await api.put(`/members/${id}`, p); setData(d => ({...d, members:d.members.map(m=>m.id===id?u:m)})) }, [])
  const deleteMember = useCallback(async id => { await api.delete(`/members/${id}`); setData(d => ({...d, members:d.members.filter(m=>m.id!==id)})) }, [])

  const addActivity = useCallback(async e => { const c = await api.post('/activities', e); setData(d => ({...d, activities:[...d.activities, c]})) }, [])
  const updateActivity = useCallback(async (id, p) => { const u = await api.put(`/activities/${id}`, p); setData(d => ({...d, activities:d.activities.map(a=>a.id===id?u:a)})) }, [])
  const deleteActivity = useCallback(async id => { await api.delete(`/activities/${id}`); setData(d => ({...d, activities:d.activities.filter(a=>a.id!==id)})) }, [])

  return (
    <DataContext.Provider value={{ ...data, loading, updateClub, updatePresidentMessage, addLeadershipYear, updateLeadershipYear, deleteLeadershipYear, addBoardRole, updateBoardRole, deleteBoardRole, addMember, updateMember, deleteMember, addActivity, updateActivity, deleteActivity }}>
      {children}
    </DataContext.Provider>
  )
}

export const useClubData = () => { const c = useContext(DataContext); if(!c) throw new Error('Need DataProvider'); return c }
