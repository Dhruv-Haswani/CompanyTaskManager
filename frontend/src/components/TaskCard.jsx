import React from 'react';
import { useTask } from '../context/TaskContext';

const TaskCard = ({ task }) => {
  const { toggleTask, deleteTask, deletingId } = useTask();
  const isCompleted = task.status === 'Completed';
  const isDeleting = deletingId === task.id;

  return (
    <div className="flex items-center justify-between p-4 bg-slate-800/90 rounded-lg mb-3 border border-slate-700/80 shadow-sm">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => toggleTask(task.id)}
          className="w-5 h-5 rounded cursor-pointer accent-blue-500"
        />
        <span 
          className={`text-base font-medium transition-all ${
            isCompleted 
              ? 'line-through text-slate-400 opacity-80' 
              : 'text-white'
          }`}
        >
          {task.title || task.text}
        </span>
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        disabled={isDeleting}
        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-medium text-xs px-3 py-1.5 rounded transition-colors"
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
};

export default TaskCard;