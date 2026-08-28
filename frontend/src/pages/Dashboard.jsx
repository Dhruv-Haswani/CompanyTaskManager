import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function Dashboard() {
  const [tasks, setTasks] = useLocalStorage('task_manager_tasks', [
    { id: 1, text: 'Complete FSD practical' },
    { id: 2, text: 'Revise React Hooks' }
  ])
  const [message, setMessage] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)

  // 1. useEffect: Update document tab title on task count change
  useEffect(() => {
    document.title = `Tasks (${tasks.length}) - Company Task Manager`
  }, [tasks])

  // 2. useEffect: 1-second interval countdown for 4-second auto-clear
  useEffect(() => {
    if (!message) return

    if (timeLeft <= 0) {
      setMessage('')
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    // Cleanup function prevents interval leaks on fast repeated actions
    return () => clearInterval(timer)
  }, [message, timeLeft])

  const showNotification = (text) => {
    setMessage(text)
    setTimeLeft(4) // Starts the 4-second countdown
  }

  const handleAddTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text }])
    showNotification('Task added successfully!')
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
    showNotification('Task deleted successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="mx-auto max-w-4xl p-6">
        <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>

        {/* Dynamic Notification Banner with Live Countdown Badge */}
        {message && (
          <div className="mt-4 flex items-center justify-between rounded-lg border border-green-300 bg-green-100 px-4 py-3 text-sm font-medium text-green-800 shadow-sm transition-all duration-300">
            <span>{message}</span>
            <span className="rounded bg-green-200 px-2.5 py-1 text-xs font-semibold text-green-900">
              Dismissing in {timeLeft}s
            </span>
          </div>
        )}

        <TaskForm onAddTask={handleAddTask} />
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
      </main>
    </div>
  )
}