import React, { useState, useEffect } from 'react';
import ChatRoom from './components/Chat/ChatRoom';
import UserList from './components/User/UserList';
import useSocket from './hooks/useSocket';
import './App.css';

function App() {
  const [currentRoom, setCurrentRoom] = useState('general');
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        setIsConnected(true);
        console.log('Connected to server');
      });

      socket.on('disconnect', () => {
        setIsConnected(false);
        console.log('Disconnected from server');
      });

      return () => {
        socket.off('connect');
        socket.off('disconnect');
      };
    }
  }, [socket]);

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setUsername(username.trim());
    }
  };

  if (!username) {
    return (
      <div className="app">
        <div className="username-form">
          <h1>Welcome to Chat App</h1>
          <form onSubmit={handleUsernameSubmit}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="username-input"
            />
            <button type="submit" className="username-button">
              Join Chat
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="chat-container">
        <div className="sidebar">
          <div className="connection-status">
            <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></span>
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
          <UserList username={username} />
        </div>
        <div className="main-chat">
          <ChatRoom 
            roomId={currentRoom} 
            username={username} 
            socket={socket}
          />
        </div>
      </div>
    </div>
  );
}

export default App;