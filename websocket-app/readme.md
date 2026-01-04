# WebSocket Chat Application

A real-time chat application built with **React + Vite** frontend and **Node.js + Express + WebSocket** backend. Features real-time messaging, typing indicators, user presence notifications, and a modern responsive UI.

![WebSocket Chat Demo](https://img.shields.io/badge/WebSocket-Realtime-blue)
![React](https://img.shields.io/badge/React-18.x-61DAFB)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933)

## ✨ Features

### 🚀 Real-time Communication
- **Instant Messaging**: Send and receive messages in real-time
- **Typing Indicators**: See when other users are typing
- **User Presence**: Get notified when users join or leave
- **Connection Status**: Live connection monitoring with automatic reconnection
- **Multi-user Support**: Chat with multiple users simultaneously

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme**: Clean, modern interface with smooth animations
- **Message Bubbles**: Distinct visual styling for your vs others' messages
- **Sidebar Panel**: Connection info, user details, and quick actions
- **Real-time Stats**: Active users, message count, and connection status

### 🔧 Technical Features
- **WebSocket Protocol**: Full-duplex communication over a single TCP connection
- **Error Handling**: Automatic reconnection with exponential backoff
- **State Management**: Efficient React state management with hooks
- **Debounced Typing**: Optimized typing indicators with debouncing
- **JSON Message Format**: Structured message protocol for easy extension

## 📁 Project Structure

```
websocket-chat/
├── frontend/                 # React + Vite Frontend
│   ├── src/
│   │   ├── App.jsx          # Main application component
│   │   ├── App.css          # Global styles
│   │   └── main.jsx         # Application entry point
│   ├── package.json
│   └── vite.config.js
│
└── backend/                  # Node.js + WebSocket Backend
    ├── server.js            # WebSocket server
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Step 1: Clone and Setup
```bash
# Create project directory
mkdir websocket-chat
cd websocket-chat

# Create backend folder
mkdir backend
cd backend
```

### Step 2: Setup Backend
```bash
# Initialize backend
npm init -y

# Install dependencies
npm install ws express cors

# Create server.js file (copy code from above)
# ... paste server.js content ...

# Start backend server
node server.js
```

### Step 3: Setup Frontend
```bash
# Open new terminal in project root
cd ..

# Create Vite React app
npm create vite@latest frontend -- --template react
cd frontend

# Install WebSocket library
npm install react-use-websocket

# Replace default files with provided code
# ... replace App.jsx, App.css, main.jsx ...

# Start frontend development server
npm run dev
```

### Step 4: Run the Application
1. **Backend Server**: Runs on `http://localhost:8080`
2. **Frontend App**: Runs on `http://localhost:3000`
3. Open browser and navigate to `http://localhost:3000`
4. Open multiple tabs/windows to test multi-user chat

## 🔌 API & WebSocket Protocol

### WebSocket Endpoint
```
ws://localhost:8080
```

### Message Types

#### 1. Client → Server
```json
{
  "type": "chat",
  "message": "Hello world!",
  "username": "JohnDoe",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

```json
{
  "type": "typing",
  "username": "JohnDoe"
}
```

#### 2. Server → Client
```json
{
  "type": "welcome",
  "message": "Connected to server!",
  "clientId": 1673789400000
}
```

```json
{
  "type": "chat",
  "message": "Hello everyone!",
  "username": "User_1673789400000",
  "clientId": 1673789400000,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

```json
{
  "type": "user-joined",
  "message": "User 1673789400000 joined the chat",
  "clientId": 1673789400000,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

```json
{
  "type": "typing",
  "username": "User_1673789400000",
  "clientId": 1673789400000
}
```

### REST Endpoints
```
GET /api/status
```
Response:
```json
{
  "status": "ok",
  "connectedClients": 5,
  "serverTime": "2024-01-15T10:30:00Z"
}
```

## 🎯 Usage Guide

### Basic Chat
1. Open the application in your browser
2. Enter your username (or use the default)
3. Type a message in the input field
4. Press Enter or click Send
5. Messages appear in real-time for all connected users

### Testing Multi-user Chat
1. Open the application in multiple browser tabs/windows
2. Each tab gets a unique user ID
3. Send messages from different tabs
4. Watch typing indicators appear as users type
5. See join/leave notifications

### Features Demonstration
- **Typing Indicators**: Start typing in one tab, see indicator in another
- **User Presence**: Close a tab, see "user left" notification in others
- **Reconnection**: Stop backend server, then restart - frontend reconnects automatically
- **Real-time Stats**: Monitor active users and connection status in sidebar

## 🔧 Configuration

### Backend Configuration
Edit `backend/server.js`:
```javascript
const PORT = process.env.PORT || 8080;  // Change port if needed
```

### Frontend Configuration
Edit `frontend/vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3000,  // Change frontend port
    proxy: {
      '/ws': {
        target: 'ws://localhost:8080',
        ws: true,
      }
    }
  }
})
```

## 📱 Responsive Design

The application is fully responsive:
- **Desktop**: Sidebar + chat panel layout
- **Tablet**: Optimized spacing and fonts
- **Mobile**: Single column layout with touch-friendly buttons

## 🛠️ Development

### Available Scripts

**Frontend:**
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

**Backend:**
```bash
cd backend
node server.js   # Start WebSocket server
# or with nodemon for auto-restart:
npm install -g nodemon
nodemon server.js
```

### Adding New Features
1. **New Message Types**: Add new `type` values in message objects
2. **UI Components**: Create new React components in `src/components/`
3. **Styles**: Modify `App.css` or create component-specific CSS modules
4. **Backend Logic**: Extend server.js with new message handlers

## 🧪 Testing

### Manual Testing
1. **Connection Test**: Click "Test Connection" button
2. **Multi-tab Test**: Open multiple browser tabs
3. **Network Test**: Disable/Enable network to test reconnection
4. **Stress Test**: Open many tabs (limited by system resources)

### Automated Testing (Future)
```bash
# Frontend tests
npm run test

# Backend tests
npm test
```

## 🔒 Security Considerations

⚠️ **Note**: This is a demo application. For production use:

1. **Add Authentication**: Implement user authentication
2. **Use HTTPS/WSS**: Enable SSL/TLS for secure connections
3. **Input Validation**: Validate and sanitize all messages
4. **Rate Limiting**: Prevent abuse with rate limits
5. **CORS Configuration**: Restrict origins in production

## 📊 Performance

- **WebSocket**: Low latency, full-duplex communication
- **React Virtual DOM**: Efficient UI updates
- **Debounced Events**: Optimized typing indicators
- **Lazy Loading**: Code splitting for larger applications
- **Minimal Dependencies**: Lightweight package structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) - Real-time protocol
- [react-use-websocket](https://github.com/robtaussig/react-use-websocket) - WebSocket React hook

## 📞 Support

For issues, questions, or suggestions:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed description
3. Include browser console errors and server logs

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the 'dist' folder to:
# - Netlify
# - Vercel
# - GitHub Pages
# - Any static hosting
```

### Backend Deployment
```bash
cd backend
# Deploy to:
# - Heroku
# - AWS EC2
# - DigitalOcean
# - Railway
# - Any Node.js hosting
```

**Note**: For production, ensure both frontend and backend are served from the same domain or configure CORS appropriately.

---

Made with ❤️ for real-time communication enthusiasts. Happy chatting! 💬