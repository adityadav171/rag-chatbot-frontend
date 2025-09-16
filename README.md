RAG News Chatbot - Frontend

A React frontend for a news chatbot that provides AI-powered responses about current events with real-time chat interface.

Tech Stack:
- React 18.x - Frontend framework
- Socket.io Client - Real-time communication
- SCSS - Styling
- Create React App - Build tooling

Quick Setup:
1. Clone & Install
git clone https://github.com/yourusername/rag-chatbot-frontend.git
cd rag-chatbot-frontend
npm install

2. Environment Variables - Create .env file:
REACT_APP_BACKEND_URL=http://localhost:8000

3. Run:
npm start

Features:
- Real-time chat interface
- Message history
- Session reset functionality
- Responsive design
- Loading indicators
- Connection status

Deploy to Netlify:
1. Build the project: npm run build
2. Connect GitHub repo to Netlify
3. Set build command: npm run build
4. Set publish directory: build
5. Add environment variable: REACT_APP_BACKEND_URL

Usage:
1. Start the backend server first
2. Open the frontend app
3. Start chatting about current news
4. Use "Reset Session" to clear chat history
