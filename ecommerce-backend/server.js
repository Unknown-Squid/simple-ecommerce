const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection, sequelize } = require('./config/database');
const { syncDatabase } = require('./src/System/ModelsRelationship/models');

// Import routes
const accountRoutes = require('./src/Account/Routes/AccountRoutes');
const storeRoutes = require('./src/Store/Routes/StoreRoutes');
const paymentRoutes = require('./src/Payment/Routes/PaymentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// API Routes
app.use('/api/account', accountRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/payment', paymentRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();
    
    // Sync database (set force: true to drop and recreate tables)
    await syncDatabase(false);
    
    // Start listening
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Handle port already in use error
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`\n❌ Port ${PORT} is already in use!`);
        console.error(`Please either:`);
        console.error(`  1. Stop the process using port ${PORT}`);
        console.error(`  2. Change the PORT in your .env file`);
        console.error(`\nTo find and kill the process:`);
        console.error(`  Windows: netstat -ano | findstr :${PORT}`);
        console.error(`  Then: taskkill /PID <PID> /F\n`);
      } else {
        console.error('Server error:', error);
      }
      process.exit(1);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await sequelize.close();
  process.exit(0);
});

module.exports = app;
