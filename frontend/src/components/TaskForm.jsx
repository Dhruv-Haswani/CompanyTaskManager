function TaskForm() {
  return (
    <div className="mt-6 flex gap-3">
      <input
        type="text"
        placeholder="Enter a new task"
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
      />

      <button className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
        Add Task
      </button>
    </div>
  )
}

export default TaskForm