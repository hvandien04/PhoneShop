import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaGoogle, FaFacebook, FaShieldAlt, FaTruck, FaHeadset, FaCreditCard } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import '../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await authService.login(formData.username, formData.password);
      
      if (success) {
        const userData = await authService.getCurrentUser();
        login(userData);
        navigate('/');
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không chính xác');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setError(error.response?.data || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
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
                  <FaUser />
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
                  placeholder="Nhập mật khẩu"
                  required
                />
                <div className="icon-wrapper">
                  <FaLock />
                </div>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="auth-button" disabled={isLoading}>
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