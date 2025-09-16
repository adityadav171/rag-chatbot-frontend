import React, { useState } from 'react';

const MessageInput = ({ onSendMessage, isConnected, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={
          !isConnected 
            ? "Connecting..." 
            : isLoading 
              ? "Please wait..." 
              : "Ask me about the news..."
        }
        disabled={!isConnected || isLoading}
        maxLength={500}
      />
      <button 
        type="submit" 
        disabled={!isConnected || !message.trim() || isLoading}
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

export default MessageInput;
