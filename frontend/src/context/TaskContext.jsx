import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

const TaskContext = createContext(null)

export function TaskProvider({ children }) {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

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
  const socketRef = useRef(null)

  // 1. Initial fetch from MongoDB backend API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_URL}/api/tasks`)
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            const formatted = data.map((t) => ({
              id: t._id || t.id,
              title: t.title,
              text: t.title,
              completed: t.status === 'Completed',
              createdAt: t.createdAt || new Date().toISOString(),
            }))
            setTasks(formatted)
            localStorage.setItem('company_tasks', JSON.stringify(formatted))
          }
        }
      } catch (err) {
        console.warn('Backend tasks API unreachable, using local state:', err)
      }
    }
    fetchTasks()
  }, [API_URL])

  // 2. Real-time WebSocket connection for cross-browser live synchronization
  useEffect(() => {
    const socket = io(API_URL, {
      transports: ['websocket', 'polling'],
    })
    socketRef.current = socket

    socket.on('taskUpdated', (updatedTasks) => {
      if (Array.isArray(updatedTasks)) {
        setTasks(updatedTasks)
        localStorage.setItem('company_tasks', JSON.stringify(updatedTasks))
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [API_URL])

  // 3. Sync changes across browser tabs via storage events
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'company_tasks' && e.newValue) {
        try {
          setTasks(JSON.parse(e.newValue))
        } catch {
          // ignore parsing error
        }
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // 4. Persist to localStorage
  useEffect(() => {
    localStorage.setItem('company_tasks', JSON.stringify(tasks))
  }, [tasks])

  const notifySocketUpdate = (updatedList) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('taskUpdated', updatedList)
    }
  }

  const addTask = async (title) => {
    if (!title.trim()) return

    try {
      const res = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), category: 'General', status: 'Pending' }),
      })

      if (res.ok) {
        const saved = await res.json()
        const newTask = {
          id: saved._id || saved.id || Date.now().toString(),
          title: saved.title || title.trim(),
          text: saved.title || title.trim(),
          completed: saved.status === 'Completed',
          createdAt: saved.createdAt || new Date().toISOString(),
        }
        const updated = [newTask, ...tasks]
        setTasks(updated)
        notifySocketUpdate(updated)
        showNotification('Task added successfully!')
        return
      }
    } catch (err) {
      console.warn('Network error adding task, falling back to local ID:', err)
    }

    // Fallback if backend is offline
    const fallbackTask = {
      id: Date.now().toString(),
      title: title.trim(),
      text: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    }
    const updated = [fallbackTask, ...tasks]
    setTasks(updated)
    notifySocketUpdate(updated)
    showNotification('Task added successfully!')
  }

  const toggleTask = async (id) => {
    const target = tasks.find((t) => t.id === id)
    if (!target) return

    const newCompleted = !target.completed
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: newCompleted } : task
    )
    setTasks(updated)
    notifySocketUpdate(updated)

    try {
      await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newCompleted ? 'Completed' : 'Pending' }),
      })
    } catch (err) {
      console.warn('Failed to update task status in backend:', err)
    }
  }

  const deleteTask = async (id) => {
    const updated = tasks.filter((task) => task.id !== id)
    setTasks(updated)
    notifySocketUpdate(updated)
    showNotification('Task deleted!')

    try {
      await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'DELETE',
      })
    } catch (err) {
      console.warn('Failed to delete task from backend:', err)
    }
  }

  const showNotification = (text) => {
    setNotification({ text, countdown: 3 })
  }

  useEffect(() => {
    if (!notification) return

    const interval = setInterval(() => {
      setNotification((prev) => {
        if (!prev) return null
        if (prev.countdown <= 1) return null
        return { ...prev, countdown: prev.countdown - 1 }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [notification])

  const clearCompleted = () => {
    const updated = tasks.filter((t) => !t.completed)
    setTasks(updated)
    notifySocketUpdate(updated)
    showNotification('Completed tasks cleared!')
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        clearCompleted,
        notification,
        isProcessing,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}

// Export both useTask and useTasks for backwards compatibility
export const useTask = useTasks;
