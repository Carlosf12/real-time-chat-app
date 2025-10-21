const Room = require('./models/Room');
const User = require('./models/User');

// Track connected users
const connectedUsers = new Map();

const handleSocketEvents = (io, socket) => {
  console.log('User connected:', socket.id);
  
  // Track user connection
  socket.on('set_username', (data) => {
    const { username } = data;
    connectedUsers.set(socket.id, { username, isOnline: true });
    
    // Broadcast updated user list to all clients
    const userList = Array.from(connectedUsers.values());
    io.emit('user_list_updated', userList);
    console.log('User list updated:', userList);
  });
  
  // Join room event
  socket.on('join_room', async (data) => {
    try {
      const { roomId, userId, username } = data;
      socket.join(roomId);
      
      // Track user in room
      connectedUsers.set(socket.id, { username, isOnline: true });
      
      console.log(`User ${username} joined room ${roomId}`);
      
      // Broadcast updated user list
      const userList = Array.from(connectedUsers.values());
      io.emit('user_list_updated', userList);
      
      // Emit confirmation back to user
      socket.emit('joined_room', { 
        roomId, 
        message: 'Successfully joined room' 
      });
      
      // Notify other users in room
      socket.to(roomId).emit('user_joined', { 
        username,
        message: `${username} joined the room`,
        userList
      });
      
    } catch (error) {
      console.error('Join room error:', error);
      socket.emit('error', { message: 'Failed to join room' });
    }
  });
  
  // Send message event
  socket.on('send_message', async (data) => {
    try {
      const { roomId, userId, username, message } = data;
      
      console.log(`Message from ${username} in room ${roomId}: ${message}`);
      
      // Create message object
      const messageData = {
        userId,
        username,
        content: message,
        timestamp: new Date()
      };
      
      // Broadcast message to all users in room
      io.to(roomId).emit('message_received', messageData);
      
    } catch (error) {
      console.error('Send message error:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });
  
  // Leave room event
  socket.on('leave_room', (data) => {
    const { roomId, username } = data;
    socket.leave(roomId);
    
    console.log(`User ${username} left room ${roomId}`);
    
    socket.emit('left_room', { roomId });
    socket.to(roomId).emit('user_left', { 
      username,
      message: `${username} left the room` 
    });
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    // Remove user from tracking
    const user = connectedUsers.get(socket.id);
    if (user) {
      connectedUsers.delete(socket.id);
      
      // Broadcast updated user list
      const userList = Array.from(connectedUsers.values());
      io.emit('user_list_updated', userList);
      
      console.log('User list updated after disconnect:', userList);
    }
  });
};

module.exports = handleSocketEvents;