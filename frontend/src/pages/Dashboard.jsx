import { useState, useEffect } from 'react'
import { useTask } from '../context/TaskContext'
import Navbar from '../components/Navbar'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

export default function Dashboard() {
  const { tasks, notification, isProcessing } = useTask()
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    document.title = `Tasks (${tasks.length}) - Company Task Manager`
  }, [tasks])

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar /> {/* <-- Clean tag without props */}

      <main className="mx-auto max-w-4xl px-4 py-8">
        {notification && (
          <div className="mb-4 flex items-center justify-between rounded-lg bg-emerald-600/90 px-4 py-3 text-sm font-medium text-white shadow">
            <span>{notification.text}</span>
            <span className="rounded bg-emerald-800 px-2 py-0.5 text-xs">
              Dismissing in {notification.countdown}s
            </span>
          </div>
        )}

        {isProcessing && (
          <div className="mb-4 animate-pulse rounded-lg border border-blue-500/30 bg-blue-600/30 p-3 text-center text-sm font-medium text-blue-300">
            Processing backend request...
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">My Tasks</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Tasks</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <TaskForm />
        <TaskList filter={filter} />
      </main>
    </div>
  )
}