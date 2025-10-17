const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Add fallback URI if .env fails
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chat-app';

        console.log('Connecting to MongoDB with URI:', mongoURI);

        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);

        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

    } catch (error) {
        console.warn('MongoDB connection failed, but continuing without database:', error.message);
        console.log('💡 Chat app will work without database - messages won\'t be saved');
        // Don't exit the process, just continue without database

    }
};

module.exports = connectDB;