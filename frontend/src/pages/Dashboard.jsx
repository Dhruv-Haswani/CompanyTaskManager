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
  const [isProcessing, setIsProcessing] = useState(false)

  // 1. Sync browser tab title on task list change
  useEffect(() => {
    document.title = `Tasks (${tasks.length}) - Company Task Manager`
  }, [tasks])

  // 2. Notification countdown: 1-second tick interval for 4-second auto-dismissal
  useEffect(() => {
    if (!message) return

    if (timeLeft <= 0) {
      setMessage('')
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [message, timeLeft])

  const triggerNotification = (text) => {
    setMessage(text)
    setTimeLeft(2) // 4-second notification auto-dismissal
  }

  // Add Task with 4-second (4000ms) execution delay
  const handleAddTask = (text) => {
    setIsProcessing(true)
    setTimeout(() => {
      setTasks((prevTasks) => [...prevTasks, { id: Date.now(), text }])
      setIsProcessing(false)
      triggerNotification('Task added successfully!')
    }, 2000)
  }

  // Delete Task with 4-second (4000ms) execution delay
  const handleDeleteTask = (id) => {
    setIsProcessing(true)
    setTimeout(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
      setIsProcessing(false)
      triggerNotification('Task deleted successfully!')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="mx-auto max-w-4xl p-6">
        <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>

        {/* 4-second action processing banner */}
        {isProcessing && (
          <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 animate-pulse">
            Processing task update...
          </div>
        )}

        {/* 4-second dynamic notification banner */}
        {message && !isProcessing && (
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