export default function Home({ onLogin }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-4 text-center text-white">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        Company Task Manager
      </h1>
      <p className="mt-4 max-w-lg text-gray-300">
        Organize, monitor, and streamline team workflows effortlessly.
      </p>
      <button
        onClick={onLogin}
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
      >
        Go to Login
      </button>
    </div>
  )
}