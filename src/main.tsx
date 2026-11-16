import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/florilegium.css'
import './styles/page.css'
import './styles/ciber.css'
import './styles/fx.css'
import './styles/mosaico.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
