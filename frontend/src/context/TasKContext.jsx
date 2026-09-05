import { createContext, useContext, useState, useEffect } from 'react'

const TaskContext = createContext(null)
const STORAGE_KEY = 'company_tasks_v1'

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : [
        { id: '1', text: 'Review team pull requests', completed: false },
        { id: '2', text: 'Prepare Q3 sprint backlog', completed: true }
      ]
    } catch {
      return []
    }
  })

  const [notification, setNotification] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const triggerNotification = (msg) => {
    setNotification({ text: msg, countdown: 2 })
    const interval = setInterval(() => {
      setNotification((prev) => {
        if (!prev || prev.countdown <= 1) {
          clearInterval(interval)
          return null
        }
        return { ...prev, countdown: prev.countdown - 1 }
      })
    }, 1000)
  }

  const addTask = (text) => {
    setIsProcessing(true)
    setTimeout(() => {
      const newTask = { id: crypto.randomUUID(), text, completed: false }
      setTasks((prev) => [...prev, newTask])
      setIsProcessing(false)
      triggerNotification('Task added successfully!')
    }, 4000)
  }

  const deleteTask = (id) => {
    setIsProcessing(true)
    setTimeout(() => {
      setTasks((prev) => prev.filter((task) => task.id !== id))
      setIsProcessing(false)
      triggerNotification('Task deleted successfully!')
    }, 4000)
  }

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTask,
        notification,
        isProcessing
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider')
  }
  return context
}