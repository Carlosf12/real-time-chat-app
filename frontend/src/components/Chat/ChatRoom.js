import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatRoom = ({ roomId, username, socket }) => {
  const [messages, setMessages] = useState([]);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    if (socket && username) {
      // Join room when component mounts
      socket.emit('join_room', {
        roomId,
        userId: username, // Using username as userId for now
        username
      });

      socket.on('joined_room', (data) => {
        console.log('Joined room:', data);
        setIsJoined(true);
      });

      socket.on('message_received', (message) => {
        setMessages(prev => [...prev, message]);
      });

      socket.on('user_joined', (data) => {
        console.log('User joined:', data);
      });

      socket.on('user_left', (data) => {
        console.log('User left:', data);
      });

      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });

      return () => {
        socket.emit('leave_room', { roomId, username });
        socket.off('joined_room');
        socket.off('message_received');
        socket.off('user_joined');
        socket.off('user_left');
        socket.off('error');
      };
    }
  }, [socket, roomId, username]);

  const handleSendMessage = (message) => {
    if (socket && message.trim()) {
      socket.emit('send_message', {
        roomId,
        userId: username,
        username,
        message: message.trim()
      });
    }
  };

  return (
    <div className="chat-room">
      <div className="chat-header">
        <h2>Room: {roomId}</h2>
        <span className={`room-status ${isJoined ? 'joined' : 'joining'}`}>
          {isJoined ? 'Joined' : 'Joining...'}
        </span>
      </div>
      <MessageList messages={messages} currentUser={username} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatRoom;