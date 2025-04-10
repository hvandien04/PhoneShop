import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaSearch, FaSortAmountDown, FaStar, FaShoppingCart, FaBolt } from 'react-icons/fa';
import { API_ENDPOINTS } from '../config/api';
import api from '../services/api';
import '../styles/Products.css';

const PRICE_RANGES = [
  { id: '0-5000000', name: 'Dưới 5 triệu' },
  { id: '5000000-10000000', name: '5 - 10 triệu' },
  { id: '10000000-15000000', name: '10 - 15 triệu' },
  { id: '15000000-25000000', name: '15 - 25 triệu' },
  { id: '25000000', name: 'Trên 25 triệu' }
];


const ProductCard = ({ product }) => {
  
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-image">
          <img src={product.images[0]} alt={product.name} />
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <div className="product-price">{product.price.toLocaleString()}đ</div>
        </div>
      </Link>
      <div className="card-actions">
        <button type="button" className="card-button buy-now">
          <FaBolt size={16} />
          Mua ngay
        </button>
      </div>
    </div>
  );
};

const Products = () => {
  
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: '',
    search: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.GET_PRODUCTS);
        setProducts(response.data);
        // Lấy danh sách brands duy nhất từ products
        const uniqueBrands = [...new Set(response.data.map(product => product.brand))];
        setBrands(uniqueBrands.map(brand => ({
          id: brand.toLowerCase(),
          name: brand
        })));
        setLoading(false);
      } catch (err) {
        setError('Có lỗi xảy ra khi tải danh sách sản phẩm');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBrandFilter = (brandId) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brandId)
        ? prev.brands.filter(b => b !== brandId)
        : [...prev.brands, brandId]
    }));
  };

  const handlePriceRangeFilter = (range) => {
    setFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange === range ? '' : range
    }));
  };

  const handleSearch = (e) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

  const handleSort = (value) => {
    setSortBy(value);
  };

  const filteredProducts = products.filter(product => {
    if (filters.brands.length && !filters.brands.includes(product.brand.toLowerCase())) {
      return false;
    }
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max && (product.price < min || product.price > max)) {
        return false;
      }
      if (!max && product.price < min) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="products-container">
      {/* Filter sidebar for desktop */}
      <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
        <div className="filters-header">
          <h3>Bộ lọc tìm kiếm</h3>
          <button className="close-filters" onClick={() => setShowFilters(false)}>×</button>
        </div>

        <div className="filter-section">
          <h4>Hãng sản xuất</h4>
          <div className="filter-options">
            {brands.map(brand => (
              <label key={brand.id} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand.id)}
                  onChange={() => handleBrandFilter(brand.id)}
                />
                {brand.name}
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4>Khoảng giá</h4>
          <div className="filter-options">
            {PRICE_RANGES.map(range => (
              <label key={range.id} className="filter-option">
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange === range.id}
                  onChange={() => handlePriceRangeFilter(range.id)}
                />
                {range.name}
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="products-main">
        <div className="products-header">
          <div className="search-bar">
            <FaSearch />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={filters.search}
              onChange={handleSearch}
            />
          </div>

          <div className="sort-options">
            <FaSortAmountDown />
            <select value={sortBy} onChange={(e) => handleSort(e.target.value)}>
              <option value="popular">Phổ biến</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products; 