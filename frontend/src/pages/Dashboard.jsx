import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function Dashboard() {
  // 1. Custom Hook: Persistent state via localStorage
  const [tasks, setTasks] = useLocalStorage('task_manager_tasks', [
    { id: 1, text: 'Complete FSD practical' },
    { id: 2, text: 'Revise React Hooks' }
  ])

  // 2. useEffect: Side effect executing on task count change
  useEffect(() => {
    document.title = `Tasks (${tasks.length}) - Company Task Manager`
  }, [tasks])

  const handleAddTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text }])
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="mx-auto max-w-4xl p-6">
        <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
        <TaskForm onAddTask={handleAddTask} />
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
      </main>
    </div>
  )
}