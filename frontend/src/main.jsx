import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './features/auth/context/AuthContext.jsx'
import { ChatProvider } from './features/chat/context/ChatContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </AuthProvider>
  </BrowserRouter>,
)
