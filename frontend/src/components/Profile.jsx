import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaLock } from 'react-icons/fa';
import '../styles/Profile.css';

const Profile = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setMessage({ type: 'success', text: 'Cập nhật thông tin thành công!' });
        setIsEditing(false);
      } else {
        setMessage({ type: 'error', text: result.error || 'Có lỗi xảy ra!' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Có lỗi xảy ra!' });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Mật khẩu xác nhận không khớp!' });
      return;
    }

    try {
      const result = await changePassword({
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Đổi mật khẩu thành công!' });
        setIsChangingPassword(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setMessage({ type: 'error', text: result.error || 'Có lỗi xảy ra khi đổi mật khẩu!' });
      }
    } catch (error) {
      console.error('Password change error:', error);
      setMessage({ type: 'error', text: 'Có lỗi xảy ra khi đổi mật khẩu!' });
    }
  };

  if (!user) {
    return <div className="profile-container">Vui lòng đăng nhập để xem thông tin tài khoản.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <FaUser size={40} />
        </div>
        <h1>Thông tin tài khoản</h1>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="profile-content">
        <div className="profile-section">
          <h2>Thông tin cá nhân</h2>
          <div className="profile-form-group">
            <label>
              <FaUser className="profile-icon" />
              Họ và tên
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            ) : (
              <p>{formData.name}</p>
            )}
          </div>

          <div className="profile-form-group">
            <label>
              <FaEnvelope className="profile-icon" />
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            ) : (
              <p>{formData.email}</p>
            )}
          </div>

          <div className="profile-form-group">
            <label>
              <FaPhone className="profile-icon" />
              Số điện thoại
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            ) : (
              <p>{formData.phone || 'Chưa cập nhật'}</p>
            )}
          </div>

          <div className="profile-form-group">
            <label>
              <FaMapMarkerAlt className="profile-icon" />
              Địa chỉ
            </label>
            {isEditing ? (
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
              />
            ) : (
              <p>{formData.address || 'Chưa cập nhật'}</p>
            )}
          </div>

          <div className="profile-actions">
            {isEditing ? (
              <>
                <button 
                  type="button" 
                  className="profile-save-button"
                  onClick={handleSubmit}
                >
                  <FaSave /> Lưu thay đổi
                </button>
                <button
                  type="button"
                  className="profile-cancel-button"
                  onClick={() => {
                    setIsEditing(false);
                    setMessage({ type: '', text: '' });
                  }}
                >
                  <FaTimes /> Hủy
                </button>
              </>
            ) : (
              <button
                type="button"
                className="profile-edit-button"
                onClick={() => {
                  setIsEditing(true);
                  setMessage({ type: '', text: '' });
                }}
              >
                <FaEdit /> Chỉnh sửa
              </button>
            )}
          </div>
        </div>

        <div className="profile-section">
          <h2>Đổi mật khẩu</h2>
          {isChangingPassword ? (
            <div>
              <div className="profile-form-group">
                <label>
                  <FaLock className="profile-icon" />
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="profile-form-group">
                <label>
                  <FaLock className="profile-icon" />
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="profile-form-group">
                <label>
                  <FaLock className="profile-icon" />
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="profile-actions">
                <button 
                  type="button" 
                  className="profile-save-button"
                  onClick={handlePasswordSubmit}
                >
                  <FaSave /> Lưu mật khẩu
                </button>
                <button
                  type="button"
                  className="profile-cancel-button"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setMessage({ type: '', text: '' });
                  }}
                >
                  <FaTimes /> Hủy
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="profile-edit-button"
              onClick={() => {
                setIsChangingPassword(true);
                setMessage({ type: '', text: '' });
              }}
            >
              <FaEdit /> Đổi mật khẩu
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 