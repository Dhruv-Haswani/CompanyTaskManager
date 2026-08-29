import { useState } from 'react'

export default function TaskForm({ onAddTask }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onAddTask(text.trim())
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        placeholder="Enter a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="btn-primary whitespace-nowrap">
        Add Task
      </button>
    </form>
  )
}