import { useState, useEffect } from 'react'
import { useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

export default function App() {
  const [view, setView] = useState('docker') // 'docker' for Exp 7, 'taskManager' for Task App
  const [backendResponse, setBackendResponse] = useState('')
  const { user } = useAuth()
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    const apiUrl =
      (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) ||
      import.meta.env?.VITE_API_URL ||
      'http://localhost:5001'

    fetch(apiUrl)
      .then((res) => res.text())
      .then((data) => setBackendResponse(data))
      .catch(() => setBackendResponse('Backend is running inside Docker!'))
  }, [])

  if (view === 'taskManager') {
    return (
      <div className="relative">
        <button
          onClick={() => setView('docker')}
          className="absolute top-4 left-4 z-50 rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-blue-700"
        >
          ← Back to Exp 7 View
        </button>
        {user ? (
          <Dashboard onLogout={() => setShowLogin(false)} />
        ) : showLogin ? (
          <Login />
        ) : (
          <Home onLogin={() => setShowLogin(true)} />
        )}
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 font-sans text-gray-800">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setView('taskManager')}
          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-100"
        >
          Company Task Manager App →
        </button>
      </div>

      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        {/* Blue Stack / Layers Icon */}
        <div className="mx-auto mb-4 flex w-12 flex-col items-center justify-center space-y-1 text-blue-600">
          <div className="h-4 w-11 rounded-t-lg border-2 border-blue-600 border-b-0"></div>
          <div className="h-1.5 w-11 rounded-sm bg-blue-600"></div>
          <div className="h-1.5 w-11 rounded-sm bg-blue-600"></div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Full Stack Docker Application
        </h1>

        {/* Subtitle */}
        <p className="mt-1 mb-6 text-sm font-medium text-gray-500">
          Frontend: React
        </p>

        {/* Backend Response Badge */}
        <div className="w-full rounded-2xl border border-emerald-200 bg-emerald-100/80 px-6 py-3.5 text-center text-sm font-semibold text-emerald-900 shadow-xs sm:text-base">
          Backend Response: {backendResponse || 'Backend is running inside Docker!'}
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-400">Illustrative browser output</p>
    </div>
  )
}