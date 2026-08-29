import { useState } from 'react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    onLogin(email)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Company Task Login</h1>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-600">Email Address</label>
          <input
            type="email"
            placeholder="student@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Sign In
        </button>
      </form>
    </div>
  )
}