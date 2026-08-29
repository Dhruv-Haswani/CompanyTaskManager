export default function Navbar({ userEmail, onLogout }) {
  return (
    <nav className="flex items-center justify-between bg-slate-800 px-6 py-4 text-white shadow-md">
      <h1 className="text-xl font-bold tracking-wide">Company Task Manager</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300">{userEmail || 'student@example.com'}</span>
        <button
          onClick={onLogout}
          className="rounded bg-red-500 px-3 py-1 text-xs font-medium text-white transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}