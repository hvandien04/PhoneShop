import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebook, FaShieldAlt, FaTruck, FaHeadset, FaCreditCard, FaPhone, FaUserTag } from 'react-icons/fa';
import { authService } from '../services/authService';
import '../styles/Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      // TODO: Implement register logic here
      const registerData = {
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };
      console.log('Register data:', registerData);
      const success = await authService.register(registerData);
      if (success) {
        navigate('/');
      } else {
        setError('Đã có lỗi xảy ra khi đăng ký');
      }
    } catch {
      setError('Đã có lỗi xảy ra khi đăng ký');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <h1>Chào mừng đến với WebShop</h1>
        <p>Khám phá thế giới điện thoại với những sản phẩm chất lượng cao, giá cả hợp lý và dịch vụ chuyên nghiệp.</p>
        
        <div className="auth-features">
          <div className="feature-item">
            <FaShieldAlt />
            <span>Bảo mật thông tin tuyệt đối</span>
          </div>
          <div className="feature-item">
            <FaTruck />
            <span>Giao hàng nhanh chóng</span>
          </div>
          <div className="feature-item">
            <FaHeadset />
            <span>Hỗ trợ 24/7</span>
          </div>
          <div className="feature-item">
            <FaCreditCard />
            <span>Thanh toán an toàn</span>
          </div>
        </div>
      </div>

      <div className="auth-form-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Đăng Ký</h2>
            <p>Tạo tài khoản mới để trải nghiệm!</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Tên đăng nhập</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Nhập tên đăng nhập"
                  required
                />
                <div className="icon-wrapper">
                  <FaUserTag />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="fullName">Họ và tên</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên của bạn"
                  required
                />
                <div className="icon-wrapper">
                  <FaUser />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Nhập email của bạn"
                  required
                />
                <div className="icon-wrapper">
                  <FaEnvelope />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Số điện thoại</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại của bạn"
                  required
                />
                <div className="icon-wrapper">
                  <FaPhone />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu của bạn"
                  required
                />
                <div className="icon-wrapper">
                  <FaLock />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu của bạn"
                  required
                />
                <div className="icon-wrapper">
                  <FaLock />
                </div>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="auth-button">
              Đăng Ký
            </button>
          </form>

          <div className="social-login">
            <p>Hoặc đăng ký với</p>
            <div className="social-buttons">
              <button className="social-button">
                <FaGoogle />
              </button>
              <button className="social-button">
                <FaFacebook />
              </button>
            </div>
          </div>

          <div className="auth-switch">
            Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 