import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Fonts } from './assets/fonts/Fonts.jsx'
import { theme } from './assets/theme/theme.jsx'
import { Provider } from 'react-redux'
import {store} from './redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Fonts />
    <App />
    </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
