import Navbar from '../components/Navbar'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

function Dashboard({ onLogout }) {
  return (
    <div className="min-h-screen bg-gray-100">

      <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">
          Company Task Manager
        </h1>

        <button
          onClick={onLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </header>


      <main className="mx-auto max-w-4xl p-6">

        <h2 className="text-2xl font-bold text-gray-800">
          My Tasks
        </h2>


        <TaskForm />


        <TaskList />

      </main>

    </div>
  )
}

export default Dashboard