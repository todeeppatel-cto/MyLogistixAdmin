// Vercel serverless function handler
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
<<<<<<< HEAD
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Connect to MongoDB with proper error handling
let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;
    
    try {
        const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mylogistix";
        
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        isConnected = true;
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        isConnected = false;
    }
};
=======
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));

// MongoDB connection with retry logic
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mylogistix";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        // Don't throw error in serverless environment
    }
};

// Connect to MongoDB
connectDB();
>>>>>>> 4294f1946b14aaf24c7268081f666962aaf7c5f6

// Initialize database connection
connectDB();

// Health check endpoint
<<<<<<< HEAD
app.get('/api/health', async (req, res) => {
    try {
        await connectDB();
        res.json({ 
            status: 'OK', 
            message: 'MyLogistix API is running',
            database: isConnected ? 'connected' : 'disconnected'
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'ERROR', 
            message: 'Database connection failed',
            error: error.message 
        });
    }
=======
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'MyLogistix API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('API Error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
>>>>>>> 4294f1946b14aaf24c7268081f666962aaf7c5f6
});

// Simple test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working' });
});

// Import routes with error handling
try {
    const Routes = require("../backend/routes/route.js");
    app.use("/", Routes);
} catch (error) {
    console.error('Error loading main routes:', error);
}

try {
    const userRoutes = require('../backend/routes/userRoutes');
    app.use('/', userRoutes);
} catch (error) {
    console.error('Error loading user routes:', error);
}

// Export for Vercel
module.exports = app;