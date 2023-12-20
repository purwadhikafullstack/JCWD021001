import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Signup from './pages/signup/Index';
import Verification from './pages/email-verification/Index';
import Signin from './pages/signin/Index';
import RequestPasswordReset from './pages/request-password-reset/Index';
import Auth from './components/Auth/Auth';
function App() {
  return (
    <BrowserRouter>
    <Auth>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/email-verification" element={<Verification />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/password-reset-request" element={<RequestPasswordReset />} />
      </Routes>
    </Auth>
    </BrowserRouter>
  );
}

export default App;
