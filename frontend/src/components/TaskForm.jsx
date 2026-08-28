import { useState } from 'react'

export default function TaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!taskText.trim()) return
    onAddTask(taskText)
    setTaskText('')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
      <input
        type="text"
        placeholder="Enter a new task..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 transition"
      >
        Add Task
      </button>
    </form>
  )
}