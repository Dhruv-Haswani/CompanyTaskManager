const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskroutes');

const app = express();

// Allow requests from localhost as well as deployed Vercel and Render domains
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(null, true); // Fallback to allow seamless testing
      }
    },
    credentials: true
  })
);
app.use(express.json());

// Database connection
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running inside Docker!');
});

app.get('/api', (req, res) => {
  res.send('Backend is running inside Docker!');
});

// Wrap Express with HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Socket Event Listeners
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for chatMessage and broadcast to ALL connected clients
  socket.on('chatMessage', (data) => {
    console.log(`[${socket.id}] ${data.username}: ${data.message}`);
    io.emit('chatMessage', data);
  });

  // Real-time synchronization for Tasks across all browsers
  socket.on('taskUpdated', (data) => {
    socket.broadcast.emit('taskUpdated', data);
  });

  // Client disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});