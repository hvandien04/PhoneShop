import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaShoppingCart, FaBolt, FaMinus, FaPlus } from 'react-icons/fa';
import { API_ENDPOINTS } from '../config/api';
import api from '../services/api';
import useScrollToTop from '../hooks/useScrollToTop';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useScrollToTop();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`${API_ENDPOINTS.GET_PRODUCTS}/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError('Có lỗi xảy ra khi tải thông tin sản phẩm');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <div className="details-container">
      <div className="details-content">
        {/* Gallery Section */}
        <div className="details-gallery">
          <div className="details-main-image">
            <img src={product.images[selectedImage]} alt={product.name} />
          </div>
          <div className="details-thumbnail-list">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`details-thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${product.name} - ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="details-info">
          <h1>{product.name}</h1>
          
          <div className="details-meta">
            <div className="details-brand">
              Thương hiệu: <span>{product.brand}</span>
            </div>
            <div className="details-sold">
              Đã bán: <span>{product.soldQuantity}</span>
            </div>
          </div>

          <div className="details-price">
            {product.price.toLocaleString()}đ
          </div>

          <div className="details-description">
            <h3>Mô tả sản phẩm</h3>
            <p>{product.description}</p>
          </div>

          <div className="details-quantity">
            <span>Số lượng:</span>
            <div className="details-quantity-controls">
              <button 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <FaMinus />
              </button>
              <span>{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
              >
                <FaPlus />
              </button>
            </div>
          </div>

          <div className="details-actions">
            <button className="details-button cart">
              <FaShoppingCart />
              Thêm vào giỏ hàng
            </button>
            <button className="details-button buy">
              <FaBolt />
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="details-specs">
        <h3>Thông số kỹ thuật</h3>
        <div className="details-specs-table">
          {product.specs.map((spec, index) => (
            <div key={index} className="details-spec-row">
              <div className="details-spec-name">{spec.name}</div>
              <div className="details-spec-value">{spec.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 