import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

const INITIAL_TASKS = [
  { id: 1, title: "Review team pull requests", text: "Review team pull requests", status: "Pending", category: "Dev" },
  { id: 2, title: "Prepare Q3 sprint backlog", text: "Prepare Q3 sprint backlog", status: "Completed", category: "Management" },
  { id: 3, title: "Design landing page wireframes", text: "Design landing page wireframes", status: "Pending", category: "Design" },
  { id: 4, title: "Setup database schema", text: "Setup database schema", status: "Completed", category: "Dev" },
  { id: 5, title: "Conduct user feedback session", text: "Conduct user feedback session", status: "Pending", category: "Research" }
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('company_tasks_v1');
    return savedTasks ? JSON.parse(savedTasks) : INITIAL_TASKS;
  });

  // Separate loading states for add and delete actions
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem('company_tasks_v1', JSON.stringify(tasks));
  }, [tasks]);

  const triggerNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000);
  };

  const addTask = (newTask) => {
    setIsAdding(true);
    setTimeout(() => {
      const taskName = typeof newTask === 'string' 
        ? newTask 
        : (newTask.title || newTask.text || 'Untitled Task');

      const category = (typeof newTask === 'object' && newTask.category) 
        ? newTask.category 
        : 'General';

      const taskToAdd = {
        id: Date.now(),
        title: taskName,
        text: taskName,
        status: "Pending",
        category: category
      };

      setTasks((prevTasks) => [taskToAdd, ...prevTasks]);
      setIsAdding(false);
      triggerNotification("Task created successfully!");
    }, 4000);
  };

  const deleteTask = (id) => {
    setDeletingId(id);
    setTimeout(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      setDeletingId(null);
      triggerNotification("Task removed successfully!");
    }, 1000);
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "Completed" ? "Pending" : "Completed" }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isAdding,
        deletingId,
        notification,
        addTask,
        deleteTask,
        toggleTask,
        toggleTaskStatus: toggleTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTask must be used within a TaskProvider');
  return context;
};