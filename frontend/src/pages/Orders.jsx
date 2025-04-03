import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import '../styles/Orders.css';


const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);


  // Chuyển đổi Unix timestamp thành định dạng ngày tháng dễ đọc
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Unix timestamp tính bằng giây
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }) + ' ' + date.toLocaleTimeString('vi-VN');
  };

  const getExchangeRate = async () => {
    try {
      const response = await fetch("https://api.exchangerate-api.com/v4/latest/VND");
      const data = await response.json();
      return data.rates.USD; // Lấy tỷ giá USD
    } catch (error) {
      console.error("Lỗi lấy tỷ giá:", error);
      return 24000; // Dự phòng nếu API lỗi
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/orders/user/${user.id}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Không thể tải danh sách đơn hàng');
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Pending':
        return 'Chờ xác nhận';
      case 'Completed':
        return 'Đã xác nhận';
      case 'Cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Completed':
        return 'status-confirmed';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="orders-container">
        <h1>Đơn hàng của tôi</h1>
        <div className="loading">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-container">
        <h1>Đơn hàng của tôi</h1>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1>Đơn hàng của tôi</h1>
      
      {orders.length === 0 ? (
        <div className="orders-empty">
          <p>Bạn chưa có đơn hàng nào</p>
          <button onClick={() => navigate('/products')}>Tiếp tục mua sắm</button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Đơn hàng</h3>
                  <p className="order-date">
                    {formatDate(order.orderDate)}
                  </p>
                </div>
                <div className={`order-status ${getStatusClass(order.status)}`}>
                  {getStatusText(order.status)}
                </div>
              </div>

              <div className="order-items">
                {order.items && order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="order-item-image">
                      <img src={item.imageUrl} alt={item.name} />
                    </div>
                    <div className="order-item-info">
                      <h4>{item.name}</h4>
                      <p className="order-item-price">
                        {item.price ? item.price.toLocaleString() : 0}đ
                      </p>
                      <p className="order-item-quantity">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <span>Tổng cộng:</span>
                  <span>{order.totalAmount ? order.totalAmount.toLocaleString() : 0}đ</span>
                </div>
                <div className="order-actions">
                  <button 
                    className="view-details-button"
                    onClick={() => handleViewDetails(order)}
                  >
                    Xem chi tiết
                  </button>
                  {order.status === 'PENDING' && (
                    <button 
                      className="cancel-order-button"
                      onClick={() => {
                        // TODO: Implement cancel order
                        alert('Chức năng hủy đơn hàng đang được phát triển!');
                      }}
                    >
                      Hủy đơn hàng
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Chi tiết đơn hàng #{selectedOrder.id}</h2>
              <button className="close-button" onClick={handleCloseModal}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="order-detail-section">
                <h3>Thông tin đơn hàng</h3>
                <div className="detail-row">
                  <span className="detail-label">Trạng thái:</span>
                  <span className={`detail-value ${getStatusClass(selectedOrder.status)}`}>
                    {getStatusText(selectedOrder.status)}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Ngày đặt:</span>
                  <span className="detail-value">
                    {formatDate(selectedOrder.orderDate)}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phương thức thanh toán:</span>
                  <span className="detail-value">{selectedOrder.paymentMethod}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Trạng thái thanh toán:</span>
                  <span className={`detail-value ${selectedOrder.paymentStatus === 'PAID' ? 'status-paid' : 'status-unpaid'}`}>
                    {selectedOrder.paymentStatus === 'Paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                  </span>
                </div>
              </div>

              <div className="order-detail-section">
                <h3>Thông tin giao hàng</h3>
                <div className="detail-row">
                  <span className="detail-label">Người nhận:</span>
                  <span className="detail-value">{user.fullName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Số điện thoại:</span>
                  <span className="detail-value">{user.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Địa chỉ:</span>
                  <span className="detail-value">{user.address}</span>
                </div>
              </div>

              <div className="order-detail-section">
                <h3>Sản phẩm</h3>
                {selectedOrder.items && selectedOrder.items.map(item => (
                  <div key={item.id} className="detail-item">
                    <div className="detail-item-image">
                      <img src={item.imageUrl} alt={item.name} />
                    </div>
                    <div className="detail-item-info">
                      <h4>{item.name}</h4>
                      <p className="detail-item-price">
                        {item.price ? item.price.toLocaleString() : 0}đ x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-detail-section">
                <h3>Tổng thanh toán</h3>
                <div className="detail-row">
                  <span className="detail-label">Tổng tiền hàng:</span>
                  <span className="detail-value">
                    {selectedOrder.totalAmount ? selectedOrder.totalAmount.toLocaleString() : 0}đ
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phí vận chuyển:</span>
                  <span className="detail-value">
                    {selectedOrder.shippingFee ? selectedOrder.shippingFee.toLocaleString() : 0}đ
                  </span>
                </div>
                <div className="detail-row total">
                  <span className="detail-label">Tổng cộng:</span>
                  <span className="detail-value total-amount">
                    {selectedOrder.totalAmount ? selectedOrder.totalAmount.toLocaleString() : 0}đ
                  </span>
                </div>
              </div>

              {selectedOrder.paymentStatus !== 'Paid' && selectedOrder.status === 'Pending' && (
                <div className="payment-section">
                  <h3>Thanh toán</h3>
                  <div className="payment-methods">
                      <PayPalScriptProvider options={{ "client-id": "AVyLZSEe19v0s1YyVdE-5Q4Ha2E0hTxAzh_B6d-OjoQd3Yo2z35Y6n3Ab4qUU6HVtWRlACDefEbaJ7dS" }}>
                        <PayPalButtons className = "payment-method-button"
                          createOrder={async (data, actions) => {
                            const exchangeRate = await getExchangeRate(); 
                            const amountInUSD = (selectedOrder.totalAmount * exchangeRate).toFixed(2);
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    currency_code: "USD",
                                    value: amountInUSD,
                                  },
                                },
                              ],
                            });
                          }}
                          onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                              navigate(`/order`);
                              setShowPayPal(false);
                              // Gửi thông tin đơn hàng đã thanh toán lên backend
                              fetch(`http://localhost:8080/api/orders/${selectedOrder.id}/payment-status?paymentStatus=Paid`, {
                                method: "PUT",
                                credentials: "include",
                              });
                            });
                          }}
                          onCancel={() => {
                            alert("Thanh toán đã bị hủy!");
                            setShowPayPal(false);
                          }}
                          onError={(err) => {
                            console.error("Lỗi thanh toán:", err);
                            alert("Đã xảy ra lỗi trong quá trình thanh toán.");
                          }}
                        />
                      </PayPalScriptProvider>
                    <button className="payment-method-button">
                      <span>Chuyển khoản ngân hàng</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
