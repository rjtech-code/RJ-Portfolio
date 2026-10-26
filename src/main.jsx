import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Prerendered pages embed the data they were rendered with (scripts/prerender.js).
// Hydrate only when that page is the one being visited; otherwise render from scratch
// (admin routes and URLs served from the empty shell).
const initialData = window.__INITIAL_DATA__ || null
const container = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App initialData={initialData} />
    </BrowserRouter>
  </StrictMode>
)

const { pathname } = window.location
const currentPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname

if (container.hasChildNodes() && initialData?.path === currentPath) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
