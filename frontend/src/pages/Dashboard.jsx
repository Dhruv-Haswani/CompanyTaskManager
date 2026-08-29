import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Navbar from '../components/Navbar'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import DropdownFilter from '../components/DropdownFilter'
import TaskModal from '../components/TaskModal'

export default function Dashboard({ onLogout }) {
  const { user } = useAuth()
  const [tasks, setTasks] = useLocalStorage('exp2_company_tasks', [
    { id: 1, text: 'Complete FSD practical', completed: false },
    { id: 2, text: 'Revise React', completed: false },
  ])
  const [filter, setFilter] = useState('All')
  const [selectedTask, setSelectedTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [message, setMessage] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  // Side Effect 1: Tab Title Sync
  useEffect(() => {
    document.title = `Tasks (${tasks.length}) - Company Task Manager`
  }, [tasks])

  // Side Effect 2: 4-Second Live Countdown Banner
  useEffect(() => {
    if (!message || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [message, timeLeft])

  const triggerNotification = (text) => {
    setMessage(text)
    setTimeLeft(4)
  }

  // 4-Second Async Add Task
  const handleAddTask = (text) => {
    setIsProcessing(true)
    setTimeout(() => {
      const newTask = { id: Date.now(), text, completed: false }
      setTasks((prev) => [...prev, newTask])
      setIsProcessing(false)
      triggerNotification('Task added successfully!')
    }, 4000)
  }

  // 4-Second Async Delete Task
  const handleDeleteTask = (id) => {
    setIsProcessing(true)
    setTimeout(() => {
      setTasks((prev) => prev.filter((task) => task.id !== id))
      setIsProcessing(false)
      triggerNotification('Task deleted successfully!')
    }, 4000)
  }

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Completed') return task.completed
    if (filter === 'Pending') return !task.completed
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onLogout={onLogout} />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <TaskCard title="Total Tasks" count={tasks.length} color="text-blue-600" />
          <TaskCard title="Pending Tasks" count={tasks.filter((t) => !t.completed).length} color="text-amber-500" />
          <TaskCard title="Completed Tasks" count={tasks.filter((t) => t.completed).length} color="text-emerald-600" />
        </div>

        {/* Live Notification Banner */}
        {message && timeLeft > 0 && (
          <div className="mb-4 flex items-center justify-between rounded-lg border border-green-400 bg-green-100 px-4 py-3 text-green-700">
            <span>{message}</span>
            <span className="rounded-full bg-green-200 px-2 py-0.5 text-xs font-bold text-green-800">
              Dismissing in {timeLeft}s
            </span>
          </div>
        )}

        {/* Processing State with Tailwind animate-pulse */}
        {isProcessing && (
          <div className="mb-4 text-center font-medium text-blue-600 animate-pulse">
            Processing request... ()
          </div>
        )}

        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
            <h2 className="text-xl font-bold text-gray-800">My Tasks</h2>
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