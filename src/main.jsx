import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import { UserProvider } from './context/UserContext'
import ProtectedRoute from './components/ProtectedRoute'
import LogIn from './login.jsx'
import ForgotPassword from './ForgotPassword.jsx'
import ResetPassword from './ResetPassword.jsx'
import Upload from './upload.jsx'
import SignUp from './SignUp.jsx'
import MainPage from './MainPage.jsx'
import Notification from './Notification.jsx'
import Analytics from './Analytics.jsx'
import Verification from './Verification.jsx'
import UserPublication from './UserPublication.jsx'
import UserProfile from './UserProfile.jsx'
import AdminAnnouncement from './AdminAnnouncement.jsx'
import AdminUserManagement from './AdminUserManage.jsx'
import HiddenPublication from './AdminHidePublication.jsx';
import CoordinatorAnalytics from './CoordinatorAnalytics.jsx';
import CoordinatorVerify from './CoordinatorVerify.jsx';
import PublicationPage from './PublicationPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Protected Routes - require login */}
          <Route path="/" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
          <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notification /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/verification" element={<ProtectedRoute><Verification /></ProtectedRoute>} />
          <Route path="/user-publication" element={<ProtectedRoute><UserPublication /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/announcement" element={<ProtectedRoute><AdminAnnouncement /></ProtectedRoute>} />
          <Route path="/adminusermanagement" element={<ProtectedRoute><AdminUserManagement /></ProtectedRoute>} />
          <Route path="/hiddenpublication" element={<ProtectedRoute><HiddenPublication /></ProtectedRoute>} />
          <Route path="/verifypublication" element={<ProtectedRoute><CoordinatorVerify /></ProtectedRoute>} />
          <Route path="/departmentanalytics" element={<ProtectedRoute><CoordinatorAnalytics /></ProtectedRoute>} />
          <Route path="/publication/:id" element={<ProtectedRoute><PublicationPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </UserProvider>
  </StrictMode>,
)
