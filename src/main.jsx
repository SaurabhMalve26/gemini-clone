import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './context/context.jsx'
// import ContextProvider from './context/context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // we wrap this app using context provider 
  <React.StrictMode>   
    <ContextProvider>
      <App />
    </ContextProvider> 
  </React.StrictMode>,
)
