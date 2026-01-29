import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import { UserProvider } from './context/UserContext'
import UserSwitcher from './components/UserSwitcher'
import LogIn from './login.jsx'
import Upload from './upload.jsx'
import SignUp from './SignUp.jsx'
import MainPage from './MainPage.jsx'
import Notification from './Notification.jsx'
import Analytics from './Analytics.jsx'
import Verification from './Verification.jsx'
import UserPublication from './UserPublication.jsx'
import UserProfile from './UserProfile.jsx'
import Bookmark from './Bookmark.jsx'
import AdminAnnouncement from './AdminAnnouncement.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <Router>
        <UserSwitcher />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/user-publication" element={<UserPublication />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/announcement" element={<AdminAnnouncement />} />
        </Routes>
      </Router>
    </UserProvider>
  </StrictMode>,
)
