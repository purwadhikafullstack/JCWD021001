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
import { Dashboard } from './pages/dashboard/container'
import OrderManagement from './pages/order-management'
import { AuthenticatedRouteOrder } from './pages/order/authenticatedRouteOrder'
import { CartProvider } from './components/navbar/services/cartContext'
import UserList from './pages/user-list'
import WarehouseList from './pages/warehouse-list'
import CreateWarehouse from './pages/warehouse-list/components/create-warehouse'
import EditWarehousePage from './pages/warehouse-list/components/edit-warehouses'

function App() {
  return (
    <Box>
      <Auth>
        <CartProvider>
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
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/cart/order"
              element={
                <AuthenticatedRouteOrder>
                  <Order />
                </AuthenticatedRouteOrder>
              }
            />
            <Route path="/order-list" element={<OrderList />} />
            <Route path="/order-management" element={<OrderManagement />} />
            <Route path="/payment" element={<Payment />} />
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
            {/* <Route path="/dashboard/:admin-list" element={<Dashboard />} /> */}
            {/* <Route path="/user-list" element={<UserList />} /> */}
            <Route path="/warehouse-list" element={<WarehouseList />} />
            <Route path="/warehouse-list/create-warehouse" element={<CreateWarehouse />} />
            <Route path="/edit-warehouse" element={<EditWarehousePage />} />
          </Routes>
        </CartProvider>
      </Auth>
    </Box>
  )
}

export default App
