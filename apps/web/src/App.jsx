import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Signup from './pages/signup/Index';
import Verification from './pages/email-verification/Index';
import Signin from './pages/signin/Index';
import RequestPasswordReset from './pages/request-password-reset/Index';
import Auth from './components/Auth/Auth';
import ResetPassword from './pages/reset-password/Index';
import Profile from './pages/profile/Index';
// import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';
import Order from './pages/order';
import { Product } from './pages/product-list/container';

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
        <Route path="/product" element={<Product />} />
      </Routes>
    </Auth>
    </Box>
  );
}

export default App;
