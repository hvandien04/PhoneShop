import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook, FaShieldAlt, FaTruck, FaHeadset, FaCreditCard } from 'react-icons/fa';
import '../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    try {
      // TODO: Implement login logic here
      console.log('Login data:', formData);
      navigate('/'); // Redirect to home page after successful login
    } catch (err) {
      setError('Email hoặc mật khẩu không chính xác');
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
            <h2>Đăng Nhập</h2>
            <p>Chào mừng bạn quay trở lại!</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
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

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="auth-button">
              Đăng Nhập
            </button>
          </form>

          <div className="social-login">
            <p>Hoặc đăng nhập với</p>
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
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 