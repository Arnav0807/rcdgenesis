import { createContext, useContext, useState, useCallback } from 'react'
const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('dghAdminSession') === 'true')
  const [error, setError] = useState('')
  const login = useCallback((u,p) => { if(u.trim().toLowerCase()==='admin'&&p==='devdev'){sessionStorage.setItem('dghAdminSession','true');setIsAdmin(true);setError('');return true} setError('Incorrect username or password.');return false },[])
  const logout = useCallback(() => { sessionStorage.removeItem('dghAdminSession');setIsAdmin(false) },[])
  return <AuthContext.Provider value={{isAdmin,login,logout,error,setError}}>{children}</AuthContext.Provider>
}
export const useAuth = () => { const c = useContext(AuthContext); if(!c) throw new Error('Need AuthProvider'); return c }
