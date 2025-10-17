const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/database');
const handleSocketEvents = require('./socketHandlers');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
    res.json({ 
      message: 'Chat server is running!',
      timestamp: new Date().toISOString(),
      status: 'healthy'
    });
  });

// Socket.io connection handling
io.on('connection', (socket) => {
    handleSocketEvents(io, socket);
  });

// Connect to database and start server
connectDB();
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Socket.io server ready for connections`);
});