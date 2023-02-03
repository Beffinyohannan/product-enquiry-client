import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import AdminDashboard from './pages/AdminDashboard';
import AdminLoginPage from './pages/AdminLoginPage';
import ProductEnquiryPage from './pages/ProductEnquiryPage';
import AdminRouteProtect from './auth/AdminRouteProtect';
import AdminLoginProtect from './auth/AdminLoginProtect';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProductEnquiryPage />} />
      </Routes>
      <Routes>
        <Route element={<AdminLoginProtect />} >
          <Route path='/admin-login' element={<AdminLoginPage />} />
        </Route>
        <Route element={<AdminRouteProtect />} >
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
