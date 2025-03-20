import React, { useState } from 'react';
import { FaStar, FaShoppingCart, FaBolt, FaMinus, FaPlus } from 'react-icons/fa';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Demo data - sau này sẽ lấy từ API
  const product = {
    id: 1,
    name: 'Samsung Galaxy S24 Ultra',
    price: 31990000,
    rating: 4.8,
    reviews: 124,
    stock: 50,
    description: 'Samsung Galaxy S24 Ultra là flagship cao cấp nhất của Samsung, tích hợp bút S-Pen, màn hình Dynamic AMOLED 2X 6.8 inch, chip Snapdragon 8 Gen 3, camera 200MP với khả năng zoom 100x.',
    images: [
      '/src/assets/img/Samsung/image_61.jpg',
      '/src/assets/img/Samsung/image_60.jpg',
      '/src/assets/img/Samsung/image_59.jpg',
      '/src/assets/img/Samsung/image_58.jpg'
    ],
    specs: [
      { name: 'Màn hình', value: '6.8 inch, Dynamic AMOLED 2X' },
      { name: 'Chip', value: 'Snapdragon 8 Gen 3' },
      { name: 'RAM', value: '12GB' },
      { name: 'Bộ nhớ trong', value: '256GB/512GB/1TB' },
      { name: 'Camera sau', value: 'Chính 200MP, Ultra-wide 12MP, Tele 50MP (5x), Tele 10MP (3x)' },
      { name: 'Camera trước', value: '12MP' },
      { name: 'Pin', value: '5000mAh, sạc nhanh 45W' }
    ]
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

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
            <div className="details-rating">
              <div className="details-stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.floor(product.rating) ? 'filled' : 'empty'}
                  />
                ))}
                <span className="details-rating-number">{product.rating}</span>
              </div>
              <span className="details-review-count">{product.reviews} đánh giá</span>
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
                disabled={quantity >= product.stock}
              >
                <FaPlus />
              </button>
            </div>
            <span className="details-stock">{product.stock} sản phẩm có sẵn</span>
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