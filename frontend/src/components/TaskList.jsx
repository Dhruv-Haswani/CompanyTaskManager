export default function TaskList({ tasks, onDeleteTask, onToggleTask, onViewTask }) {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks available.</p>
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.completed || false}
              onChange={() => onToggleTask(task.id)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className={`text-gray-700 ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.text}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onViewTask(task)}
              className="text-sm font-medium text-blue-500 hover:text-blue-700"
            >
              View
            </button>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-sm font-medium text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}