const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// Security and utility middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting middleware: 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
});
app.use(limiter);

// Routes
app.use('/api/users', userRoutes);

// Centralized Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/secure_rest_api';

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected successfully');
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
