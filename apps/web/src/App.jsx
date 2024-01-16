import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Signup from './pages/signup/Index'
import Verification from './pages/email-verification/Index'
import Signin from './pages/signin/Index'
import RequestPasswordReset from './pages/request-password-reset/Index'
import Auth from './components/Auth/Auth'
import ResetPassword from './pages/reset-password/Index'
import Profile from './pages/profile/Index'
// import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react'
import Order from './pages/order'
// import Cart from './pages/cart'
import { Product } from './pages/product-list/container'
import { ProductDetails } from './pages/product-details/container'

function App() {
  // const { user, isLogin } = useSelector((state) => state.AuthReducer);
  return (
    <Box>
      <Auth>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/email-verification" element={<Verification />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/password-reset-request" element={<RequestPasswordReset />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order" element={<Order />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/:gender/:group/:category?" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Auth>
    </Box>
  )
}

export default App
