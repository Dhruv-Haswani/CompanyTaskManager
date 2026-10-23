import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('docker'); // 'docker' (1st) | 'tasks' (2nd) | 'chat' (3rd)
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  // Exp 7 state
  const [backendResponse, setBackendResponse] = useState('');

  // Exp 8 state
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('User_' + Math.floor(1000 + Math.random() * 9000));
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Dynamic API URL for local & cloud (Vercel/Render)
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // Exp 7 backend fetch
  useEffect(() => {
    fetch(`${API_URL}/api`)
      .then((res) => res.text())
      .then((data) => setBackendResponse(data))
      .catch(() => setBackendResponse('Backend is running!'));
  }, [API_URL]);

  // Exp 8 socket setup
  useEffect(() => {
    const socket = io(API_URL, {
      transports: ['websocket', 'polling']
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to WebSocket server:', socket.id);
      setConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setConnected(false);
    });

    socket.on('chatMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!username.trim() || !message.trim()) return;

    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('chatMessage', {
        username: username.trim(),
        message: message.trim()
      });
      setMessage('');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 font-sans text-gray-100">
      {/* Top Universal Navigation Bar */}
      <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-blue-400">CompanyTaskManager</span>
          <span className="hidden rounded bg-slate-800 px-2 py-0.5 text-xs text-gray-400 sm:inline">
            Full Lab Suite
          </span>
        </div>

        {/* Experiment Navigation Tabs: Docker -> Task Manager -> Exp 8 Chat */}
        <nav className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('docker')}
            className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'docker'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            🐳 Exp 7 (Docker)
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'tasks'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            📋 Task Manager
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'chat'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            💬 Exp 8 (Live Chat)
          </button>
        </nav>
      </header>

      {/* VIEW 1: Experiment 7 Docker View (1st) */}
      {activeTab === 'docker' && (
        <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 p-4 text-gray-800">
          <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex w-12 flex-col items-center justify-center space-y-1 text-blue-600">
              <div className="h-4 w-11 rounded-t-lg border-2 border-blue-600 border-b-0"></div>
              <div className="h-1.5 w-11 rounded-sm bg-blue-600"></div>
              <div className="h-1.5 w-11 rounded-sm bg-blue-600"></div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Full Stack Docker Application
            </h1>
            <p className="mt-1 mb-6 text-sm font-medium text-gray-500">
              Frontend: React
            </p>
            <div className="w-full rounded-2xl border border-emerald-200 bg-emerald-100/80 px-6 py-3.5 text-center text-sm font-semibold text-emerald-900 shadow-xs sm:text-base">
              Backend Response: {backendResponse || 'Backend is running inside Docker!'}
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-400">Illustrative browser output</p>
        </div>
      )}

      {/* VIEW 2: Complete Task Manager Application (2nd) */}
      {activeTab === 'tasks' && (
        <div className="flex-1">
          {user ? (
            <Dashboard onLogout={() => setShowLogin(false)} />
          ) : showLogin ? (
            <Login />
          ) : (
            <Home onLogin={() => setShowLogin(true)} />
          )}
        </div>
      )}

      {/* TAB 3: Experiment 8 Socket.IO Live Chat */}
      {activeTab === 'chat' && (
        <div className="chat-page flex-1">
          <div className="chat-card">
            <div className="chat-header">
              <h2 className="chat-title">
                <span>💬</span> Live Chat (Exp 8)
              </h2>
              <div className={`status-badge ${connected ? 'online' : 'offline'}`}>
                <span className="status-dot"></span>
                <span>{connected ? 'Online' : 'Offline'}</span>
              </div>
            </div>

            <div className="chat-messages">
              {messages.length === 0 ? (
                <div className="empty-chat">
                  <p>No messages yet. Send a message to start chatting!</p>
                </div>
              ) : (
                messages.map((msg, index) => {
                  const isSelf = msg.username === username.trim();
                  return (
                    <div
                      key={index}
                      className={`message-item ${isSelf ? 'self' : 'other'}`}
                    >
                      <span className="message-sender">{msg.username}</span>
                      <span className="message-text">{msg.message}</span>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="chat-form">
              <div className="username-row">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="username-input"
                />
              </div>
              <div className="message-row">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="message-input"
                  disabled={!connected}
                />
                <button
                  type="submit"
                  disabled={!connected || !message.trim()}
                  className="send-button"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}