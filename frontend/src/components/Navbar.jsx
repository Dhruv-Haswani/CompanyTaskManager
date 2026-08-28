import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  // Access global context state directly via custom hook
  const { user, logout } = useAuth()

  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm border-b border-gray-100">
      <h1 className="text-xl font-bold text-gray-800">
        Company Task Manager
      </h1>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm font-medium text-gray-600">
            Welcome, {user.email} ({user.role})
          </span>
        )}
        <button
          onClick={logout}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  )
}