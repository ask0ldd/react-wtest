import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ServicesProvider } from './context/services-context.tsx'
import CustomRouter from './router/CustomRouter.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ServicesProvider>
        <CustomRouter/>
      </ServicesProvider>
  </StrictMode>,
)
