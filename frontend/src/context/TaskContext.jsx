import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

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
  const socketRef = useRef(null)

  // 1. Initial fetch from MongoDB backend API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/tasks')
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
  }, [])

  // 2. Real-time WebSocket connection for cross-browser live synchronization
  useEffect(() => {
    const socket = io('http://localhost:5001', {
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
  }, [])

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
    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      text: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    }

    const updated = [newTask, ...tasks]
    setTasks(updated)
    notifySocketUpdate(updated)
    showNotification('Task added successfully!')

    // Persist to MongoDB backend in background
    try {
      fetch('http://localhost:5001/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), status: 'Pending' }),
      }).catch(() => {})
    } catch {
      // background sync
    }
  }

  const toggleTask = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
    setTasks(updated)
    notifySocketUpdate(updated)

    const target = updated.find((t) => t.id === id)
    if (target) {
      try {
        fetch(`http://localhost:5001/api/tasks/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: target.completed ? 'Completed' : 'Pending' }),
        }).catch(() => {})
      } catch {
        // background sync
      }
    }
  }

  const deleteTask = (id) => {
    const updated = tasks.filter((task) => task.id !== id)
    setTasks(updated)
    notifySocketUpdate(updated)
    showNotification('Task deleted!')

    try {
      fetch(`http://localhost:5001/api/tasks/${id}`, {
        method: 'DELETE',
      }).catch(() => {})
    } catch {
      // background sync
    }
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
