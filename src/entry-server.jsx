import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'

// Used by scripts/prerender.js to render public routes to static HTML at build time
export function render(url, initialData) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App initialData={initialData} />
      </StaticRouter>
    </StrictMode>,
  )
}
