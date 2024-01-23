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
import { Product } from './pages/product-list/container'
import { LoggedInRoute } from './components/Auth/ProtectedRoute'
import CreateAddress from './pages/create-address'
import ManageAddress from './pages/manage-address'
import Cart from './pages/cart'
import Order from './pages/order/Index'
import { ProductDetails } from './pages/product-details/container'
import { ProductSearch } from './pages/product-search/container'
import OrderList from './pages/order-list'
import Payment from './pages/payments'

function App() {
  // const { user, isLogin } = useSelector((state) => state.AuthReducer);
  console.log('halo')
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
          <Route
            path="/profile"
            element={
              <LoggedInRoute>
                <Profile />
              </LoggedInRoute>
            }
          />
          <Route
            path="/create-address"
            element={
              <LoggedInRoute>
                <CreateAddress />
              </LoggedInRoute>
            }
          />
          <Route path="/order" element={<Order />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product" element={<Product />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order-list" element={<OrderList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/p/:gender/:group?/:category?" element={<Product />} />
          <Route path="/search" element={<ProductSearch />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/manage-address" element={<ManageAddress />} />
        </Routes>
      </Auth>
    </Box>
  )
}

export default App
