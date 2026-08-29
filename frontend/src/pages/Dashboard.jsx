import { useState } from 'react'
import Navbar from '../components/Navbar'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import DropdownFilter from '../components/DropdownFilter'
import TaskModal from '../components/TaskModal'

export default function Dashboard({ onLogout }) {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete FSD practical', completed: false },
    { id: 2, text: 'Revise React', completed: false },
  ])
  const [filter, setFilter] = useState('All')
  const [selectedTask, setSelectedTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }])
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleToggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Completed') return task.completed
    if (filter === 'Pending') return !task.completed
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userEmail="student@example.com" onLogout={onLogout} />

      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Metric Cards Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <TaskCard title="Total Tasks" count={tasks.length} color="text-blue-600" />
          <TaskCard title="Pending Tasks" count={tasks.filter((t) => !t.completed).length} color="text-amber-500" />
          <TaskCard title="Completed Tasks" count={tasks.filter((t) => t.completed).length} color="text-emerald-600" />
        </div>

        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
            <h2 className="text-xl font-bold text-gray-800">My Tasks</h2>
            <DropdownFilter selectedFilter={filter} onSelectFilter={setFilter} />
          </div>

          <div className="mt-6">
            <TaskForm onAddTask={handleAddTask} />
            <TaskList
              tasks={filteredTasks}
              onDeleteTask={handleDeleteTask}
              onToggleTask={handleToggleTask}
              onViewTask={(task) => {
                setSelectedTask(task)
                setIsModalOpen(true)
              }}
            />
          </div>
        </div>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
      />
    </div>
  )
}