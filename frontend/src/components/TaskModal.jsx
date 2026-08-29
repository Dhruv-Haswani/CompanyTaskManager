export default function TaskModal({ isOpen, onClose, task }) {
  if (!isOpen || !task) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h3 className="text-xl font-bold text-gray-800">Task Details</h3>
        <p className="mt-4 text-gray-600"><span className="font-semibold">ID:</span> {task.id}</p>
        <p className="mt-2 text-gray-600"><span className="font-semibold">Description:</span> {task.text}</p>
        <p className="mt-2 text-gray-600"><span className="font-semibold">Status:</span> {task.completed ? 'Completed' : 'Pending'}</p>
        
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="rounded-lg bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600">
            Close Modal
          </button>
        </div>
      </div>
    </div>
  )
}