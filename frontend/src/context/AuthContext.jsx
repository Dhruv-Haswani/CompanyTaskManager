import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('company_user')
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })

  const login = (email) => {
    const userData = { email }
    setUser(userData)
    localStorage.setItem('company_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('company_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}