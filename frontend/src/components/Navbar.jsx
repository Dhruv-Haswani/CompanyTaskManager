function Navbar() {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
      <h1 className="text-xl font-bold text-gray-800">
        Company Task Manager
      </h1>

      <button className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">
        Logout
      </button>
    </header>
  )
}

export default Navbar