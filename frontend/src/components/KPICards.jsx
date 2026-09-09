import React from 'react';
import { useTask } from '../context/TaskContext';

const KPICards = () => {
  const { tasks } = useTask();

  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === 'Pending').length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-center shadow-sm">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Tasks</p>
        <p className="text-3xl font-bold text-white mt-1">{total}</p>
      </div>

      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-center shadow-sm">
        <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider">Pending</p>
        <p className="text-3xl font-bold text-white mt-1">{pending}</p>
      </div>

      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-center shadow-sm">
        <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">Completed</p>
        <p className="text-3xl font-bold text-white mt-1">{completed}</p>
      </div>
    </div>
  );
};

export default KPICards;