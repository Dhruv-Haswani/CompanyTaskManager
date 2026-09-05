import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

export default function App() {
  const { user } = useAuth()
  const [showLogin, setShowLogin] = useState(false)

  // Automatic redirect once user context is set
  if (user) {
    return <Dashboard onLogout={() => setShowLogin(false)} />
  }

  if (showLogin) {
    return <Login />
  }

  return <Home onLogin={() => setShowLogin(true)} />
}