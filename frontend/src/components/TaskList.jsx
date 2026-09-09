import React, { useState } from 'react';
import { useTask } from '../context/TaskContext';
import TaskCard from './TaskCard';

const TaskList = () => {
  const { tasks } = useTask();
  const [filter, setFilter] = useState('All');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Pending') return task.status === 'Pending';
    if (filter === 'Completed') return task.status === 'Completed';
    return true; // 'All'
  });

  return (
    <div className="w-full mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">My Tasks</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-slate-800 text-white border border-slate-700 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="All">All Tasks</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-8 text-center text-slate-400">
          No tasks found under "{filter}".
        </div>
      ) : (
        filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TaskList;