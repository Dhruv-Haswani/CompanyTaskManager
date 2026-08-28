import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { setPage } = useAuth()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Company Task Manager</h1>
      <p className="mt-4 text-gray-600">Manage Your Tasks Effectively</p>
      <button
        onClick={() => setPage('login')}
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 transition"
      >
        Login
      </button>
    </div>
  )
}