import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Signup from './pages/signup/Index';
import Verification from './pages/email-verification/Index';
import Signin from './pages/signin/Index';
import Order from './pages/order';
import { Product } from './pages/product-list/container';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/email-verification" element={<Verification />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/order" element={<Order />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
