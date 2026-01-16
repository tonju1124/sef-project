import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import login from './login.jsx'
import Upload from './upload.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Upload />
  </StrictMode>,
)
