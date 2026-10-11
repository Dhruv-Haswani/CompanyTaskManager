const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('JWT Authentication API is running');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});