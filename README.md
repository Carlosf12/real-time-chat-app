
# 💬 Real-Time Chat Application

A full-stack real-time chat application built with React, Node.js, Socket.io, and MongoDB.

## ✨ Features

- **Real-time messaging** - Instant message delivery
- **User authentication** - Username-based login
- **Live user tracking** - See who's online
- **Message persistence** - All messages saved to database
- **Connection status** - Visual indicators
- **Username validation** - Minimum 3 characters

## 🛠️ Tech Stack

**Frontend:** React 18, Socket.io Client, CSS3
**Backend:** Node.js, Express.js, Socket.io, MongoDB, Mongoose

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/real-time-chat-app.git
   cd real-time-chat-app
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend && npm install
   
   # Frontend  
   cd ../frontend && npm install
   ```

3. **Set up environment**
   ```bash
   # Create backend/.env
   MONGODB_URI=mongodb://localhost:27017/chat-app
   PORT=5001
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   brew services start mongodb-community
   ```

5. **Start servers**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend
   cd frontend && npm start
   ```

6. **Open browser**
   ```
   http://localhost:3000
   ```

## 📱 Usage

1. Enter username (min 3 characters)
2. Click "Join Chat"
3. Start messaging!
4. See live user list in sidebar

## 🏗️ Project Structure

```
real-time-chat-app/
├── backend/
│   ├── src/
│   │   ├── config/database.js
│   │   ├── models/Room.js, User.js
│   │   ├── socketHandlers.js
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/Chat/, User/
│   │   ├── hooks/useSocket.js
│   │   └── App.js, App.css
│   └── package.json
└── README.md
```

## 🔧 Socket.io Events

**Client → Server:**
- `join_room` - Join chat room
- `send_message` - Send message
- `leave_room` - Leave room

**Server → Client:**
- `message_received` - New message
- `user_joined` - User joined
- `user_left` - User left
- `user_list_updated` - Updated user list

## 🚀 Future Features

- Multiple chat rooms
- Typing indicators
- Message reactions
- File sharing
- User avatars

## 👨‍💻 Author

**Carlos Figueira**
- GitHub: [@carlosfigueira](https://github.com/carlosfigueira)

---
