import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './Chat.scss';

const ChatContainer = ({ 
  messages, 
  onSendMessage, 
  onResetSession, 
  isConnected, 
  isLoading 
}) => {
  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>RAG News Chatbot</h1>
        <div className="chat-controls">
          <span className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? '● Connected' : '● Disconnected'}
          </span>
          <button 
            className="reset-btn" 
            onClick={onResetSession}
            disabled={!isConnected}
          >
            Reset Chat
          </button>
        </div>
      </div>
      
      <MessageList messages={messages} isLoading={isLoading} />
      
      <MessageInput 
        onSendMessage={onSendMessage} 
        isConnected={isConnected}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatContainer;
