import React, { useState, useEffect } from 'react';
import ChatRoom from './components/Chat/ChatRoom';
import UserList from './components/User/UserList';
import useSocket from './hooks/useSocket';
import './App.css';

function App() {
  const [currentRoom, setCurrentRoom] = useState('general');
  const [username, setUsername] = useState('');
  const [inputValue, setInputValue] = useState(''); // Separate input state
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

  const handleJoinChat = () => {
    if (inputValue.trim().length >= 3) {
      setUsername(inputValue.trim());
    }
  };

  // Show username form if no username is set
  if (!username) {
    return (
      <div className="app">
        <div className="username-form">
          <h1>Welcome to Chat App</h1>
          <div className="username-input-group">
            <input
              type="text"
              placeholder="Enter your username (min 3 characters)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && inputValue.trim().length >= 3) {
                  handleJoinChat();
                }
              }}
              className="username-input"
            />
            <button 
              onClick={handleJoinChat}
              className="username-button"
              disabled={inputValue.trim().length < 3}
            >
              Join Chat
            </button>
          </div>
          {inputValue.trim().length > 0 && inputValue.trim().length < 3 && (
          <div className="username-hint">
          <span className="hint-icon">⚠️</span>
          <span className="hint-text">Minimum 3 characters</span>
          </div>
          )}
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
          <div className="username-display">
            <span className="username-text">Logged in as: {username}</span>
            <button 
              onClick={() => {
                setUsername('');
                setInputValue('');
              }} 
              className="change-username-btn"
            >
              Change
            </button>
          </div>
          <UserList username={username} socket={socket} />
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