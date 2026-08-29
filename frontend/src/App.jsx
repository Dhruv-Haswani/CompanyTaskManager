import { useState } from 'react'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import TaskCard from './components/TaskCard.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import DropdownFilter from './components/DropdownFilter.jsx'
import TaskModal from './components/TaskModal.jsx'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  // Task list state for Home Page
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review quarterly Q3 task reports', completed: false },
    { id: 2, text: 'Design updated Tailwind layout specs', completed: true },
    { id: 3, text: 'Setup Vite development server', completed: false },
  ])
  const [filter, setFilter] = useState('All')
  const [selectedTask, setSelectedTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Auth toggle logic for Exp 1
  const handleLogin = (email) => {
    setUserEmail(email)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserEmail('')
  }

  // Task operations
  const handleAddTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }])
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleToggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Completed') return task.completed
    if (filter === 'Pending') return !task.completed
    return true
  })

  // Render Login Page if user is not authenticated
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  // Render Home Page (Dashboard) when authenticated
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userEmail={userEmail} onLogout={handleLogout} />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <TaskCard title="Total Tasks" count={tasks.length} color="text-blue-600" />
          <TaskCard title="Pending Tasks" count={tasks.filter((t) => !t.completed).length} color="text-amber-500" />
          <TaskCard title="Completed Tasks" count={tasks.filter((t) => t.completed).length} color="text-emerald-600" />
        </div>

        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
            <h2 className="text-xl font-bold text-gray-800">
              Welcome, {userEmail}
            </h2>
            <DropdownFilter selectedFilter={filter} onSelectFilter={setFilter} />
          </div>

          <div className="mt-6">
            <TaskForm onAddTask={handleAddTask} />
            <TaskList
              tasks={filteredTasks}
              onDeleteTask={handleDeleteTask}
              onToggleTask={handleToggleTask}
              onViewTask={(task) => {
                setSelectedTask(task)
                setIsModalOpen(true)
              }}
            />
          </div>
        </div>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
      />
    </div>
  )
}