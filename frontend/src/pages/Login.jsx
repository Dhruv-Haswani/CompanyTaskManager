import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()

    // 1. Password length restriction validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    // Clear error and proceed with login
    setError('')
    login(email.trim() || 'student@example.com')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Login</h1>

        {/* Validation Error Alert */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-300 bg-red-100 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email (e.g., student@example.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password (min. 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  )
}