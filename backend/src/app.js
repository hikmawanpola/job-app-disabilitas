// backend/src/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/database');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // URL frontend Next.js
    credentials: true
}));
app.use(express.json());

// Test Database Connection
db.query('SELECT 1')
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

// Basic Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Job App API' });
});

// Auth Routes
app.use('/api/auth', require('./routes/auth'));

// Jobs Routes
app.use('/api/jobs', require('./routes/jobs'));

// Companies Routes
app.use('/api/companies', require('./routes/companies'));

// Applications Routes
app.use('/api/applications', require('./routes/applications'));

// Users Routes
app.use('/api/users', require('./routes/users'));

// Error Handler Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Handle 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Frontend URL: http://localhost:3000`);
    console.log(`Backend API URL: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        db.end();
    });
});