import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Signup from './pages/signup/Index'
import Verification from './pages/email-verification/Index'
import Signin from './pages/signin/Index'
import RequestPasswordReset from './pages/request-password-reset/Index'
import Auth from './components/Auth/Auth'
import ResetPassword from './pages/reset-password/Index'
import Profile from './pages/profile/Index'
import { Box } from '@chakra-ui/react'
import { Product } from './pages/product-list/container'
import { LoggedInRoute, LoggedOutRoute } from './components/Auth/ProtectedRoute'
import CreateAddress from './pages/create-address'
import ManageAddress from './pages/manage-address'
import Cart from './pages/cart/Index'
import Order from './pages/order/Index'
import { ProductDetails } from './pages/product-details/container'
import { ProductSearch } from './pages/product-search/container'
import OrderList from './pages/order-list'
import Payment from './pages/payments'
import { Dashboard } from './pages/dashboard/container'
import { AuthenticatedRouteOrder } from './pages/order/authenticatedRouteOrder'
import { CartProvider } from './components/cart-table/service/cartContext'
import CreateWarehouse from './pages/warehouse-list/components/create-warehouse'
import EditWarehousePage from './pages/warehouse-list/components/edit-warehouses'
import OrderDetails from './pages/order-details'
import OrderManagementDetails from './pages/order-management-details'
import VerifyNewEmailReq from './pages/verify-new-email-req/Index'
import VerifyNewEmail from './pages/verify-new-email/Index'



function App() {
  return (
    <Box>
      <Auth>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-unverified-email" element={<VerifyNewEmailReq />} />
            <Route path="/verify-new-email" element={<VerifyNewEmail />} />
            <Route
              path="/signup"
              element={
                <LoggedOutRoute>
                  <Signup />
                </LoggedOutRoute>
              }
            />
            <Route path="/auth/email-verification" element={<Verification />} />
            <Route
              path="/signin"
              element={
                <LoggedOutRoute>
                  <Signin />
                </LoggedOutRoute>
              }
            />
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
            <Route path="/product" element={<Product />} />
            <Route
              path="/cart"
              element={
                <LoggedInRoute>
                  <Cart />
                </LoggedInRoute>
              }
            />
            <Route
              path="/cart/order"
              element={
                <LoggedInRoute>
                  <AuthenticatedRouteOrder>
                    <Order />
                  </AuthenticatedRouteOrder>
                </LoggedInRoute>
              }
            />
            <Route
              path="/order-list"
              element={
                <LoggedInRoute>
                  <OrderList />
                </LoggedInRoute>
              }
            />
            <Route
              path="/order-details"
              element={
                <LoggedInRoute>
                  <OrderDetails />
                </LoggedInRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <LoggedInRoute>
                  <Payment />
                </LoggedInRoute>
              }
            />
            <Route path="/p/:gender/:group?/:category?" element={<Product />} />
            <Route path="/search" element={<ProductSearch />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/dashboard/:destination?/:createProduct?" element={<Dashboard />} />
            <Route path="/dashboard/:destination?/:createProduct?/:epid" element={<Dashboard />} />
            <Route
              path="/manage-address"
              element={
                <LoggedInRoute>
                  <ManageAddress />
                </LoggedInRoute>
              }
            />

            <Route path="/warehouse-list/create-warehouse" element={<CreateWarehouse />} />
            <Route path="/edit-warehouse" element={<EditWarehousePage />} />
          </Routes>
        </CartProvider>
      </Auth>
    </Box>
  )
}

export default App
