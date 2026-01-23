import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LogIn from './login.jsx'
import Upload from './upload.jsx'
import SignUp from './SignUp.jsx'
import MainPage from './MainPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainPage />
  </StrictMode>,
)
