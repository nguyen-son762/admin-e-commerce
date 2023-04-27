import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { SnackbarProvider } from 'notistack'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={5}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
)
