import { AuthProvider, useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function NavigationHandler() {
  const { page } = useAuth()

  return (
    <>
      {page === 'home' && <Home />}
      {page === 'login' && <Login />}
      {page === 'dashboard' && <Dashboard />}
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationHandler />
    </AuthProvider>
  )
}