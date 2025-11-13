import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Web3Provider } from './utils/WebProvider.tsx'
import { App } from './App.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Web3Provider>

      <App />
    </Web3Provider>

  </StrictMode>,
)
