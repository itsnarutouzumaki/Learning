import React, { useState, useEffect, useRef } from 'react';
import useWebSocket from 'react-use-websocket';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('User');
  const [clientId, setClientId] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const messagesEndRef = useRef(null);

  // WebSocket connection
  const WS_URL = 'ws://localhost:8080';
  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('✅ WebSocket connected');
      addSystemMessage('Connected to server');
    },
    onClose: () => {
      console.log('❌ WebSocket disconnected');
      addSystemMessage('Disconnected from server');
    },
    onError: (event) => {
      console.error('WebSocket error:', event);
    },
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 3000,
    share: true,
  });

  // Add message helper
  const addMessage = (sender, text, isSystem = false, timestamp = new Date()) => {
    setMessages(prev => [...prev, {
      id: Date.now() + Math.random(),
      sender,
      text,
      isSystem,
      isOwn: sender === 'You',
      timestamp: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const addSystemMessage = (text) => {
    addMessage('System', text, true);
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const data = JSON.parse(lastMessage.data);
        console.log('📨 Received:', data);

        switch (data.type) {
          case 'welcome':
            setClientId(data.clientId);
            addSystemMessage(data.message);
            if (!username.startsWith('User')) {
              setUsername(`User_${data.clientId}`);
            }
            break;

          case 'chat':
            addMessage(
              data.username || `User_${data.clientId}`,
              data.message,
              false,
              new Date(data.timestamp)
            );
            break;

          case 'user-joined':
            addSystemMessage(data.message);
            setConnectedUsers(prev => [...prev, {
              id: data.clientId,
              username: data.username || `User_${data.clientId}`
            }]);
            break;

          case 'user-left':
            addSystemMessage(data.message);
            setConnectedUsers(prev => prev.filter(user => user.id !== data.clientId));
            break;

          case 'typing':
            setTypingUsers(prev => {
              const newSet = new Set(prev);
              newSet.add(data.username || `User_${data.clientId}`);
              return newSet;
            });
            // Clear after 3 seconds
            setTimeout(() => {
              setTypingUsers(prev => {
                const newSet = new Set(prev);
                newSet.delete(data.username || `User_${data.clientId}`);
                return newSet;
              });
            }, 3000);
            break;

          case 'echo':
            console.log('Echo received:', data);
            break;

          default:
            console.log('Unknown message type:', data);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
        addSystemMessage('Error receiving message');
      }
    }
  }, [lastMessage]);

  // Send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && readyState === 1) {
      const msgData = {
        type: 'chat',
        message: message,
        username: username,
        timestamp: new Date().toISOString()
      };
      
      sendMessage(JSON.stringify(msgData));
      addMessage('You', message);
      setMessage('');
    }
  };

  // Send typing indicator
  const handleTyping = () => {
    if (message.trim() && readyState === 1) {
      sendMessage(JSON.stringify({
        type: 'typing',
        username: username
      }));
    }
  };

  // Debounced typing indicator
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (message.trim()) {
        handleTyping();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [message]);

  // Test connection
  const testConnection = () => {
    if (readyState === 1) {
      sendMessage(JSON.stringify({
        type: 'test',
        message: 'Ping from client',
        timestamp: new Date().toISOString(),
        clientId: clientId
      }));
      addSystemMessage('Test message sent');
    }
  };

  // Connection status
  const connectionStatus = {
    0: { text: 'Connecting...', color: 'orange' },
    1: { text: 'Connected', color: 'green' },
    2: { text: 'Closing', color: 'orange' },
    3: { text: 'Disconnected', color: 'red' }
  }[readyState];

  // Active users count
  const activeUsers = connectedUsers.length + 1; // +1 for current user

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>💬 WebSocket Chat</h1>
          <div className="connection-info">
            <div className={`status-dot ${connectionStatus.text.toLowerCase()}`}></div>
            <span className="status-text">{connectionStatus.text}</span>
            {clientId && <span className="client-id">• ID: {clientId}</span>}
            <span className="users-count">• 👥 {activeUsers} online</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Chat Panel */}
        <div className="chat-panel">
          {/* Messages Container */}
          <div className="messages-container">
            {messages.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">💬</div>
                <h3>No messages yet</h3>
                <p>Start a conversation by sending a message!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.isSystem ? 'system' : ''} ${msg.isOwn ? 'own' : ''}`}
                >
                  {!msg.isSystem && (
                    <div className="message-header">
                      <span className="message-sender">{msg.sender}</span>
                      <span className="message-time">{msg.timestamp}</span>
                    </div>
                  )}
                  <div className="message-content">
                    {msg.text}
                    {msg.isSystem && <span className="system-icon">⚡</span>}
                  </div>
                </div>
              ))
            )}

            {/* Typing Indicators */}
            {typingUsers.size > 0 && (
              <div className="typing-indicator">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="typing-text">
                  {Array.from(typingUsers).join(', ')} {typingUsers.size === 1 ? 'is' : 'are'} typing...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="input-area">
            <form onSubmit={handleSendMessage} className="message-form">
              <div className="input-group">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
                  placeholder="Type your message here..."
                  disabled={readyState !== 1}
                  className="message-input"
                />
                <button
                  type="submit"
                  disabled={!message.trim() || readyState !== 1}
                  className="send-button"
                >
                  <span className="button-text">Send</span>
                  <span className="button-icon">📤</span>
                </button>
              </div>
            </form>

            {/* Quick Actions */}
            <div className="quick-actions">
              <div className="username-section">
                <label htmlFor="username">Your Name:</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your name"
                  className="username-input"
                />
              </div>
              
              <button
                onClick={testConnection}
                disabled={readyState !== 1}
                className="test-button"
              >
                Test Connection
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-section">
            <h3>👤 User Info</h3>
            <div className="user-info-card">
              <div className="user-avatar">{username.charAt(0).toUpperCase()}</div>
              <div className="user-details">
                <div className="user-name">{username}</div>
                <div className="user-id">ID: {clientId || 'Connecting...'}</div>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>🌐 Connection</h3>
            <div className="connection-stats">
              <div className="stat">
                <div className="stat-label">Status</div>
                <div className={`stat-value ${connectionStatus.text.toLowerCase()}`}>
                  {connectionStatus.text}
                </div>
              </div>
              <div className="stat">
                <div className="stat-label">Server URL</div>
                <div className="stat-value url">{WS_URL}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Messages</div>
                <div className="stat-value">{messages.length}</div>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>🛠️ Tools</h3>
            <div className="tools">
              <button
                onClick={() => setMessages([])}
                className="tool-button"
              >
                🗑️ Clear Chat
              </button>
              <button
                onClick={() => window.location.reload()}
                className="tool-button"
              >
                🔄 Refresh
              </button>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>📚 Instructions</h3>
            <ul className="instructions">
              <li>✅ Type a message and press Enter or Send</li>
              <li>✅ See typing indicators when others type</li>
              <li>✅ Watch real-time user join/leave notifications</li>
              <li>✅ Change your username anytime</li>
              <li>✅ Connection automatically reconnects</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>WebSocket Demo • Real-time Communication • Built with React + Vite</p>
        <p className="footer-note">
          Backend running on: <code>ws://localhost:8080</code> • 
          Open multiple tabs to test multi-user chat
        </p>
      </footer>
    </div>
  );
}

export default App;