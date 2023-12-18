import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Fonts } from './assets/fonts/Fonts.jsx'
import { theme } from './assets/theme/theme.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Fonts />
    <App />
    </ChakraProvider>
  </React.StrictMode>,
)
