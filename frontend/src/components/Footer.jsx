import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Về Chúng Tôi</h3>
          <p>PhoneShop - Nơi cung cấp các sản phẩm điện thoại chính hãng với giá tốt nhất. Chúng tôi cam kết mang đến cho khách hàng những trải nghiệm mua sắm tuyệt vời.</p>
        </div>

        <div className="footer-section">
          <h3>Liên Hệ</h3>
          <ul className="footer-links">
            <li>
              <FaPhone />
              <a href="tel:+84123456789">0123 456 789</a>
            </li>
            <li>
              <FaEnvelope />
              <a href="mailto:contact@webshop.com">contact@webshop.com</a>
            </li>
            <li>
              <FaMapMarkerAlt />
              <span>123 Đường ABC, Quận 1, TP.HCM</span>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Liên Kết Nhanh</h3>
          <ul className="footer-links">
            <li>
              <Link to="/">Trang Chủ</Link>
            </li>
            <li>
              <Link to="/products">Sản Phẩm</Link>
            </li>
            <li>
              <Link to="/about">Về Chúng Tôi</Link>
            </li>
            <li>
              <Link to="/contact">Liên Hệ</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Theo Dõi Chúng Tôi</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 WebShop. Tất cả quyền được bảo lưu.</p>
      </div>
    </footer>
  );
};

export default Footer; 