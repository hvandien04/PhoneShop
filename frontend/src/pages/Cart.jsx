import React, { useState } from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import '../styles/Cart.css';

const Cart = () => {
  // Demo data - sau này sẽ lấy từ global state/API
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Samsung Galaxy S24 Ultra',
      price: 31990000,
      image: '/src/assets/img/Samsung/image_61.jpg',
      quantity: 1
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24+',
      price: 24990000,
      image: '/src/assets/img/Samsung/image_60.jpg',
      quantity: 1
    }
  ]);

  const handleQuantityChange = (id, change) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          if (newQuantity >= 1) {
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <h2>Giỏ hàng trống</h2>
          <p>Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-content">
        <div className="cart-items">
          <h2>Giỏ hàng của bạn</h2>
          
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="item-details">
                <h3>{item.name}</h3>
                <div className="item-price">{item.price.toLocaleString()}đ</div>
                
                <div className="item-actions">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  
                  <button 
                    className="remove-button"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              
              <div className="item-total">
                {(item.price * item.quantity).toLocaleString()}đ
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Tổng tiền</h3>
          <div className="summary-row">
            <span>Tạm tính:</span>
            <span>{calculateTotal().toLocaleString()}đ</span>
          </div>
          <div className="summary-row">
            <span>Phí vận chuyển:</span>
            <span>Miễn phí</span>
          </div>
          <div className="summary-total">
            <span>Tổng cộng:</span>
            <span>{calculateTotal().toLocaleString()}đ</span>
          </div>
          <button className="checkout-button">
            Tiến hành thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart; 