import React, { useState, useEffect } from 'react';

const UserList = ({ username, socket }) => {
  const [users, setUsers] = useState([{ username, isOnline: true }]);

  useEffect(() => {
    if (socket) {
      // Listen for user list updates
      socket.on('user_list_updated', (userList) => {
        console.log('User list updated:', userList);
        setUsers(userList);
      });

      // Listen for user joined events
      socket.on('user_joined', (data) => {
        console.log('User joined:', data);
        if (data.userList) {
          setUsers(data.userList);
        }
      });

      // Listen for user left events
      socket.on('user_left', (data) => {
        console.log('User left:', data);
        // User list will be updated via user_list_updated event
      });

      return () => {
        socket.off('user_list_updated');
        socket.off('user_joined');
        socket.off('user_left');
      };
    }
  }, [socket, username]);

  return (
    <div className="user-list">
      <h3>Online Users</h3>
      {users.map((user, index) => (
        <div key={index} className="user-item">
          <span className="user-indicator"></span>
          {user.username} {user.username === username ? '(You)' : ''}
        </div>
      ))}
    </div>
  );
};

export default UserList;