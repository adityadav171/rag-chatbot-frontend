import React, { useEffect, useRef } from 'react';

const MessageList = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="welcome-message">
          <h2>Welcome to the RAG News Chatbot!</h2>
          <p>Ask me anything about recent news and I'll search through the latest articles to give you informed answers.</p>
          <div className="example-questions">
            <p><strong>Try asking:</strong></p>
            <ul>
              <li>"What's the latest news about technology?"</li>
              <li>"Tell me about recent political developments"</li>
              <li>"What's happening in sports today?"</li>
            </ul>
          </div>
        </div>
      ) : (
        messages.map((message, index) => (
          <div key={index} className="message-pair">
            <div className="message user-message">
              <div className="message-content">
                <strong>You:</strong> {message.user}
              </div>
              <div className="message-time">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
            <div className="message bot-message">
              <div className="message-content">
                <strong>Bot:</strong> {message.bot}
              </div>
            </div>
          </div>
        ))
      )}
      
      {isLoading && (
        <div className="message bot-message">
          <div className="message-content loading">
            <strong>Bot:</strong> <span className="typing-indicator">Thinking...</span>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
