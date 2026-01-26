import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import LogIn from './login.jsx'
import Upload from './upload.jsx'
import SignUp from './SignUp.jsx'
import MainPage from './MainPage.jsx'
import Notification from './Notification.jsx'
import Analytics from './Analytics.jsx'
import Verification from './Verification.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
    </Router>
  </StrictMode>,
)
