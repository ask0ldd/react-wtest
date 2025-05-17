import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ServicesProvider } from './context/servicesContext.tsx'
import CustomRouter from './router/CustomRouter.tsx'
import { LayoutModeProvider } from './context/layoutModeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ServicesProvider>
      <LayoutModeProvider>
        <CustomRouter/>
      </LayoutModeProvider>
    </ServicesProvider>
  </StrictMode>,
)
