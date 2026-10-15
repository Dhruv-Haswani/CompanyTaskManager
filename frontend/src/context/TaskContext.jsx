import { createContext, useContext, useState, useEffect } from 'react'

const TaskContext = createContext(null)

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('company_tasks')
      return savedTasks ? JSON.parse(savedTasks) : []
    } catch {
      return []
    }
  })
  const [notification, setNotification] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    localStorage.setItem('company_tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (title) => {
    if (!title.trim()) return
    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      text: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [newTask, ...prev])
    showNotification('Task added successfully!')
  }

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
    showNotification('Task deleted!')
  }

  const showNotification = (text) => {
    setNotification({ text, countdown: 3 })
  }

  useEffect(() => {
    if (!notification) return
    const timer = setInterval(() => {
      setNotification((prev) => {
        if (!prev || prev.countdown <= 1) {
          clearInterval(timer)
          return null
        }
        return { ...prev, countdown: prev.countdown - 1 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [notification])

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        notification,
        isProcessing,
        setIsProcessing,
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
