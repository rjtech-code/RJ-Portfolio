import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Only "/" is prerendered at build time (scripts/prerender.js). Other routes are
// served from an empty shell, so they render on the client from scratch.
const PRERENDERED_PATHS = ['/']

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

if (container.hasChildNodes() && PRERENDERED_PATHS.includes(window.location.pathname)) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
