function Home({ onLogin }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">
        Company Task Manager
      </h1>

      <p className="mt-4 text-gray-600">
        Manage Your Tasks Effectively
      </p>

      <button
        onClick={onLogin}
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  )
}

export default Home