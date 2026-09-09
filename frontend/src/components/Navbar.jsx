import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { tasks } = useTask();

  const pendingCount = tasks.filter((t) => t.status === 'Pending').length;

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <h1 className="text-xl font-bold text-white">Company Task Manager</h1>
        <span className="bg-blue-600/30 text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-500/30">
          {pendingCount} Pending
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-sm text-slate-300">
          Welcome, <strong className="text-white">{user?.email || 'User'}</strong>
        </span>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;