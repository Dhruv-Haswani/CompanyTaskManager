import { useAuth } from '../context/AuthContext'
import { useTask } from '../context/TaskContext'

export default function Navbar() {
  const { user, logout } = useAuth() // <-- Pull logout directly from AuthContext
  const { tasks } = useTask()

  const pendingCount = tasks.filter((t) => !t.completed).length

  return (
    <nav className="flex items-center justify-between bg-slate-800 px-6 py-4 text-white shadow-md">
      <div className="flex items-center space-x-3">
        <h1 className="text-xl font-bold">Company Task Manager</h1>
        <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-semibold">
          {pendingCount} Pending
        </span>
      </div>
      <div className="flex items-center space-x-4 text-sm">
        <span className="text-gray-300">
          Welcome, <strong className="text-white">{user?.email}</strong>
        </span>
        <button
          onClick={logout}
          className="rounded bg-red-600 px-3 py-1.5 text-xs font-medium transition hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}