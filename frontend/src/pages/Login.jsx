function Login({ onLogin }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="mb-3 w-full rounded-lg border px-4 py-2"
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full rounded-lg border px-4 py-2"
        />

        <button
          onClick={onLogin}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login