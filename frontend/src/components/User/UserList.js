import React from 'react';

const UserList = ({ username }) => {
  return (
    <div className="user-list">
      <h3>Online Users</h3>
      <div className="user-item current-user">
        <span className="user-indicator"></span>
        {username} (You)
      </div>
      <div className="user-item">
        <span className="user-indicator"></span>
        Other users will appear here
      </div>
    </div>
  );
};

export default UserList;