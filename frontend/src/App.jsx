import { useState } from 'react'

import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
  const [page, setPage] = useState('home')

  return (
    <>
      {page === 'home' && (
        <Home onLogin={() => setPage('login')} />
      )}

      {page === 'login' && (
        <Login onLogin={() => setPage('dashboard')} />
      )}

      {page === 'dashboard' && (
        <Dashboard onLogout={() => setPage('home')} />
      )}
    </>
  )
}

export default App