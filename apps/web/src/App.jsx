import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import Verification from './pages/email-verification/Verification';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/email-verification" element={<Verification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
