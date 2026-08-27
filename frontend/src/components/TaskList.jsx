function TaskList() {
  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
        <span>
          Complete FSD practical
        </span>

        <button className="rounded-lg bg-red-500 px-3 py-1 text-white">
          Delete
        </button>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
        <span>
          Revise React
        </span>

        <button className="rounded-lg bg-red-500 px-3 py-1 text-white">
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskList