import { createContext, useContext, useState, useCallback } from 'react'
import { api, setToken, clearToken, getToken } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => !!getToken())
  const [error, setError] = useState('')

  const login = useCallback(async (username, password) => {
    try {
      const { token } = await api.post('/auth/login', { username, password })
      setToken(token)
      setIsAdmin(true)
      setError('')
      return true
    } catch (e) {
      setError(e.message || 'Incorrect username or password.')
      return false
    }
  }, [])

  const logout = useCallback(() => {
    clearToken()
    setIsAdmin(false)
  }, [])

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const c = useContext(AuthContext)
  if (!c) throw new Error('useAuth must be inside AuthProvider')
  return c
}
