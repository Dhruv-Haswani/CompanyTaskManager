import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [page, setPage] = useState('home')
  const [user, setUser] = useState(null)

  const login = (email) => {
    setUser({ email, role: 'User' })
    setPage('dashboard')
  }

  const logout = () => {
    setUser(null)
    setPage('home')
  }

  return (
    <AuthContext.Provider value={{ page, setPage, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}