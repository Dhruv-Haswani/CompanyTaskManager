export default function TaskList({ tasks, onDeleteTask }) {
  if (tasks.length === 0) {
    return <p className="mt-6 text-center text-gray-500">No tasks found. Add one above!</p>
  }

  return (
    <div className="mt-6 space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm border border-gray-100">
          <span className="font-medium text-gray-800">{task.text}</span>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="rounded-lg bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}