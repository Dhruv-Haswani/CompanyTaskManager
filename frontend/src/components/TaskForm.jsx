import { useState } from 'react'
import { useTask } from '../context/TaskContext'

export default function TaskForm() {
  const [input, setInput] = useState('')
  const { addTask, isProcessing } = useTask()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return
    addTask(input.trim())
    setInput('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
      <input
        type="text"
        placeholder="Enter a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isProcessing}
        className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isProcessing || !input.trim()}
        className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {isProcessing ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  )
}