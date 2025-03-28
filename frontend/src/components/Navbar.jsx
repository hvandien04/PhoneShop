import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaHome, FaMobileAlt, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import '../styles/Navbar.css';
import useScrollPosition from '../hooks/useScrollPosition';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const isScrolled = useScrollPosition();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <nav className={`nav-main ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-wrapper">
        <Link to="/" className="nav-logo">
          <img src="/img/logo.png" alt="logo" />
          PhoneShop
        </Link>

        <div className="nav-search">
          <input 
            type="text" 
            placeholder="Tìm kiếm sản phẩm..." 
            className="search-input"
          />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>

        <ul className="nav-menu">
          <li>
            <Link 
              to="/" 
              className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
            >
              <FaHome />
              <span>Trang Chủ</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/products" 
              className={`nav-item ${location.pathname === '/products' ? 'active' : ''}`}
            >
              <FaMobileAlt />
              <span>Sản Phẩm</span>
            </Link>
          </li>
          {user ? (
            <li className="user-menu-container" ref={userMenuRef}>
              <button 
                className="nav-item user-menu-button"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <FaUserCircle />
                <span>{user.fullName}</span>
              </button>
              {showUserMenu && (
                <div className="user-menu">
                  <Link to="/profile" className="user-menu-item" onClick={() => setShowUserMenu(false)}>
                    <FaUser />
                    <span>Thông tin tài khoản</span>
                  </Link>
                  <Link to="/cart" className="user-menu-item" onClick={() => setShowUserMenu(false)}>
                    <FaShoppingCart />
                    <span>Giỏ hàng</span>
                  </Link>
                  <Link to="/login" onClick={handleLogout} className="user-menu-item">
                    <FaSignOutAlt />
                    <span>Đăng xuất</span>
                  </Link>
                </div>
              )}
            </li>
          ) : (
            <li>
              <Link 
                to="/login" 
                className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}
              >
                <FaUser />
                <span>Đăng Nhập</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 