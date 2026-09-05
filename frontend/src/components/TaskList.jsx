import { useTask } from '../context/TaskContext'

export default function TaskList({ filter }) {
  const { tasks, deleteTask, toggleTask, isProcessing } = useTask()

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Pending') return !task.completed
    if (filter === 'Completed') return task.completed
    return true
  })

  if (filteredTasks.length === 0) {
    return <p className="py-4 text-center text-gray-400">No tasks found.</p>
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between rounded-lg bg-slate-800 p-4 shadow transition hover:bg-slate-750"
        >
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="h-5 w-5 rounded border-gray-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
            />
            <span
              className={`text-base ${
                task.completed ? 'text-gray-500 line-through' : 'text-white'
              }`}
            >
              {task.text}
            </span>
          </div>
          <button
            onClick={() => deleteTask(task.id)}
            disabled={isProcessing}
            className="rounded bg-red-600/80 px-3 py-1 text-xs font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}