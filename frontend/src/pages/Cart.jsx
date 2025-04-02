import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // Xử lý chọn/bỏ chọn sản phẩm
  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  // Xử lý chọn/bỏ chọn tất cả
  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.id));
    }
  };

  // Tính tổng giá trị giỏ hàng cho các sản phẩm được chọn
  const total = cartItems.reduce((sum, item) => {
    if (selectedItems.includes(item.id)) {
      return sum + (item.price * item.quantity);
    }
    return sum;
  }, 0);

  // Xử lý thay đổi số lượng
  const handleQuantityChange = async (cartItemId, change) => {
    if (isUpdating) return;
    
    try {
      setIsUpdating(true);
      const cartItem = cartItems.find(item => item.id === cartItemId);
      if (!cartItem) return;

      const newQuantity = cartItem.quantity + change;
      if (newQuantity >= 1) {
        await updateCartItemQuantity(cartItemId, change);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Xử lý xóa sản phẩm
  const handleRemove = async (cartItemId) => {
    try {
      await removeFromCart(cartItemId);
      // Xóa khỏi danh sách đã chọn nếu có
      setSelectedItems(prev => prev.filter(id => id !== cartItemId));
    } catch (error) {
      alert(error.message);
    }
  };

  // Xử lý thanh toán
  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán!');
      return;
    }
    // TODO: Implement checkout logic
    alert('Chức năng thanh toán đang được phát triển!');
  };

  if (!user) {
    return (
      <div className="cart-empty">
        <h2>Vui lòng đăng nhập để xem giỏ hàng</h2>
        <button onClick={() => navigate('/login')}>Đăng nhập</button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Giỏ hàng trống</h2>
        <button onClick={() => navigate('/products')}>Tiếp tục mua sắm</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Giỏ hàng của bạn</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          <div className="cart-items-header">
            <label className="select-all">
              <input
                type="checkbox"
                checked={selectedItems.length === cartItems.length}
                onChange={handleSelectAll}
              />
              Chọn tất cả
            </label>
          </div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-select">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                />
              </div>
              <div className="cart-item-image-placeholder">
                <img src={item.imageUrl} alt={item.productName} />
              </div>
              
              <div className="cart-item-info">
                <h3>{item.productName}</h3>
                <p className="cart-item-price">{item.price?.toLocaleString()}đ</p>
                
                <div className="cart-item-quantity">
                  <button 
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={item.quantity <= 1 || isUpdating}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.id, 1)}
                    disabled={isUpdating}
                  >
                    +
                  </button>
                </div>
              </div>

              <button 
                className="cart-item-remove"
                onClick={() => handleRemove(item.id)}
                disabled={isUpdating}
              >
              <FaTrash />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Tổng đơn hàng</h2>
          <div className="cart-summary-item">
            <span>Tạm tính:</span>
            <span>{total.toLocaleString()}đ</span>
          </div>
          <div className="cart-summary-item">
            <span>Phí vận chuyển:</span>
            <span>Miễn phí</span>
          </div>
          <div className="cart-summary-total">
            <span>Tổng cộng:</span>
            <span>{total.toLocaleString()}đ</span>
          </div>
          <button 
            className="checkout-button"
            onClick={handleCheckout}
            disabled={isUpdating || selectedItems.length === 0}
          >
            Tiến hành thanh toán ({selectedItems.length} sản phẩm)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart; 