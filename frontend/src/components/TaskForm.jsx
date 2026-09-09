import React, { useState } from 'react';
import { useTask } from '../context/TaskContext';

const TaskForm = () => {
  const [text, setText] = useState('');
  const { addTask, isAdding } = useTask();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new task..."
        className="flex-1 bg-slate-800 border border-slate-700 text-white placeholder-slate-400 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        disabled={isAdding}
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
      >
        {isAdding ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;