import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChatContainer from './components/ChatContainer';
import './App.scss';

function App() {
  const [socket, setSocket] = useState(null);
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000');
    setSocket(newSocket);

    // Socket event listeners
    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
      
      // Create new session
      newSocket.emit('create-session');
    });

    newSocket.on('session-created', (data) => {
      setSessionId(data.sessionId);
      newSocket.emit('join-session', data.sessionId);
    });

    newSocket.on('session-history', (history) => {
      setMessages(history || []);
    });

    newSocket.on('bot-response', (data) => {
      setMessages(prev => [...prev, {
        user: data.userMessage,
        bot: data.botResponse,
        timestamp: data.timestamp
      }]);
      setIsLoading(false);
    });

    newSocket.on('session-reset', () => {
      setMessages([]);
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
      setIsLoading(false);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    });

    // Cleanup on component unmount
    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (message) => {
    if (socket && message.trim() && sessionId) {
      setIsLoading(true);
      socket.emit('send-message', { sessionId, message });
    }
  };

  const resetSession = () => {
    if (socket && sessionId) {
      socket.emit('reset-session', sessionId);
    }
  };

  return (
    <div className="App">
      <ChatContainer
        messages={messages}
        onSendMessage={sendMessage}
        onResetSession={resetSession}
        isConnected={isConnected}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
