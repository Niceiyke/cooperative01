import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import AccessProvider from './contexts/userContext.jsx'


const queryClient =new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AccessProvider>
          <App />
        </AccessProvider>
      </QueryClientProvider>
    </BrowserRouter>

  </React.StrictMode>,
)
