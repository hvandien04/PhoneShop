import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaBolt } from 'react-icons/fa';
import { API_ENDPOINTS } from '../config/api';
import api from '../services/api';
import Banner from '../components/Banner';
import '../styles/Home.css';

const Home = () => {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.GET_PRODUCTS);
        // Sắp xếp sản phẩm theo lượt bán (soldQuantity) và lấy 6 sản phẩm đầu tiên
        const topProducts = response.data
          .sort((a, b) => b.soldQuantity - a.soldQuantity)
          .slice(0, 6);
        setProducts(topProducts);
        setLoading(false);
      } catch (err) {
        setError('Có lỗi xảy ra khi tải sản phẩm');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Chào mừng đến với PhoneShop</h1>
        <p>Chuyên bán điện thoại chính hãng với giá tốt nhất</p>
      </div>
      <Banner />
      <div className="container">
        <section className="featured-products">
          <h2>Sản phẩm nổi bật</h2>
          <div className="products-grid-home">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <Link to={`/products/${product.id}`} className="product-link">
                  <div className="product-image">
                    <img src={product.images[0]} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="product-price">{product.price.toLocaleString()}đ</div>
                    <div className="product-sold">Đã bán: {product.soldQuantity}</div>
                  </div>
                </Link>
                <div className="card-actions">
                  <button type="button" className="card-button buy-now">
                    <FaBolt size={16} />
                    Mua ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 