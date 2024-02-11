import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { Fonts } from './assets/fonts/Fonts.jsx'
import { theme } from './assets/theme/theme.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Fonts />
        <App />
        <Toaster/>
      </ChakraProvider>
    </BrowserRouter>
  </Provider>,
)
