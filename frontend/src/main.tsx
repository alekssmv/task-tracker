import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './routes.tsx'
import GlobalStyle from './global-style.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle />
    <Router />
  </StrictMode>,
)
