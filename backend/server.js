const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
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
    origin: 'http://localhost:3000',
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

  // Client disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});