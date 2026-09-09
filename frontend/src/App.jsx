import React from 'react';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const App = () => {
  const { user } = useAuth();

  // Show login screen if not authenticated
  if (!user) {
    return <Login />;
  }

  // Render main app layout when logged in
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default App;