import React from 'react';
import { BrowserRouter as Router, Routes, Route,useLocation, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Settings from './pages/admin/Settings';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import FeedbackPage from './pages/admin/Feedback';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import './styles/App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './hooks/ScrollToTop';



function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { user } = useAuth();
  const RequireAdmin = () => {
    const {user} = useAuth();
  
    if (!user) {
      return <Navigate to="/login" replace />;
    }
  
    if (user.role !== 1) {
      return <Navigate to="/" replace />;
    }
  
    return <AdminLayout />;
  };
  



  return (
    <>
      <ScrollToTop />
      <div className="layout">
        <ToastContainer />
        {!isAdminRoute && <Navbar />}
        <main className={isAdminRoute ? '' : 'main-content'}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<div>Tài khoản</div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order" element={<Orders />} />

            {/* Admin routes */}
            <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<Users />} />
              <Route path="feedback" element={<FeedbackPage />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </main>
        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
