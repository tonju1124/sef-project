import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LogIn from './login.jsx'
import Upload from './upload.jsx'
import SignUp from './SignUp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LogIn  />
  </StrictMode>,
)
