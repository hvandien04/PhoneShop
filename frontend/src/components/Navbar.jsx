import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaHome, FaMobileAlt } from 'react-icons/fa';
import '../styles/Navbar.css';
import useScrollPosition from '../hooks/useScrollPosition';

const Navbar = () => {
  const location = useLocation();
  const isScrolled = useScrollPosition();

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
          <li>
            <Link 
              to="/cart" 
              className={`nav-item ${location.pathname === '/cart' ? 'active' : ''}`}
            >
              <FaShoppingCart />
              <span>Giỏ Hàng</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/login" 
              className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}
            >
              <FaUser />
              <span>Đăng Nhập</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 