import { createContext, useContext, useState, useCallback } from 'react'

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'devdev'
const SESSION_KEY = 'delhiGenesisAdminSession.v1'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true')
  const [error, setError] = useState('')

  const login = useCallback((u, p) => {
    if (u.trim().toLowerCase() === ADMIN_USER && p === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      setIsAdmin(true); setError(''); return true
    }
    setError('Incorrect username or password.'); return false
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY); setIsAdmin(false)
  }, [])

  return <AuthContext.Provider value={{ isAdmin, login, logout, error, setError }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
