import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaSearch, FaSortAmountDown, FaStar, FaShoppingCart, FaBolt } from 'react-icons/fa';
import '../styles/Products.css';

const BRANDS = [
  { id: 'samsung', name: 'Samsung' },
  { id: 'apple', name: 'Apple' },
  { id: 'oppo', name: 'OPPO' },
  { id: 'xiaomi', name: 'Xiaomi' },
  { id: 'vivo', name: 'Vivo' },
  { id: 'realme', name: 'Realme' }
];

const PRICE_RANGES = [
  { id: '0-5000000', name: 'Dưới 5 triệu' },
  { id: '5000000-10000000', name: '5 - 10 triệu' },
  { id: '10000000-15000000', name: '10 - 15 triệu' },
  { id: '15000000-25000000', name: '15 - 25 triệu' },
  { id: '25000000', name: 'Trên 25 triệu' }
];

// Mock data for products
const MOCK_PRODUCTS = [
  // Samsung Products
  {
    id: 1,
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'samsung',
    price: 29990000,
    image: '/src/assets/img/Samsung/image_61.jpg',
    rating: 5
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24+',
    brand: 'samsung',
    price: 24990000,
    image: '/src/assets/img/Samsung/image_60.jpg',
    rating: 4
  },
  {
    id: 3,
    name: 'Samsung Galaxy S24',
    brand: 'samsung',
    price: 19990000,
    image: '/src/assets/img/Samsung/image_59.jpg',
    rating: 4
  },
  {
    id: 4,
    name: 'Samsung Galaxy Z Fold5',
    brand: 'samsung',
    price: 39990000,
    image: '/src/assets/img/Samsung/image_58.jpg',
    rating: 5
  },
  {
    id: 5,
    name: 'Samsung Galaxy Z Flip5',
    brand: 'samsung',
    price: 19990000,
    image: '/src/assets/img/Samsung/image_57.jpg',
    rating: 4
  },
  // iPhone Products
  {
    id: 6,
    name: 'iPhone 15 Pro Max',
    brand: 'apple',
    price: 34990000,
    image: '/src/assets/img/Iphone/image_60.jpg',
    rating: 5
  },
  {
    id: 7,
    name: 'iPhone 15 Pro',
    brand: 'apple',
    price: 29990000,
    image: '/src/assets/img/Iphone/image_59.jpg',
    rating: 5
  },
  {
    id: 8,
    name: 'iPhone 15 Plus',
    brand: 'apple',
    price: 24990000,
    image: '/src/assets/img/Iphone/image_58.jpg',
    rating: 4
  },
  {
    id: 9,
    name: 'iPhone 15',
    brand: 'apple',
    price: 19990000,
    image: '/src/assets/img/Iphone/image_57.jpg',
    rating: 4
  },
  // OPPO Products
  {
    id: 10,
    name: 'OPPO Find X7 Ultra',
    brand: 'oppo',
    price: 24990000,
    image: '/src/assets/img/Oppo/image_79.jpg',
    rating: 4
  },
  {
    id: 11,
    name: 'OPPO Find X7 Pro',
    brand: 'oppo',
    price: 19990000,
    image: '/src/assets/img/Oppo/image_77.jpg',
    rating: 4
  },
  {
    id: 12,
    name: 'OPPO Find X7',
    brand: 'oppo',
    price: 15990000,
    image: '/src/assets/img/Oppo/image_75.jpg',
    rating: 4
  },
  {
    id: 13,
    name: 'OPPO Reno11 Pro+',
    brand: 'oppo',
    price: 15990000,
    image: '/src/assets/img/Oppo/image_73.jpg',
    rating: 4
  },
  {
    id: 14,
    name: 'OPPO Reno11 Pro',
    brand: 'oppo',
    price: 12990000,
    image: '/src/assets/img/Oppo/image_71.jpg',
    rating: 4
  }
];

const ProductCard = ({ product }) => (
  <div className="product-card">
    <Link to={`/products/${product.id}`} className="product-link">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'} />
          ))}
          <span>({product.rating})</span>
        </div>
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

const Products = () => {
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: '',
    search: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular'); // popular, price-asc, price-desc

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

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    if (filters.brands.length && !filters.brands.includes(product.brand)) {
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
            {BRANDS.map(brand => (
              <label key={brand.id} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand.id)}
                  onChange={() => handleBrandFilter(brand.id)}
                />
                <span>{brand.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4>Mức giá</h4>
          <div className="filter-options">
            {PRICE_RANGES.map(range => (
              <label key={range.id} className="filter-option">
                <input
                  type="radio"
                  name="price-range"
                  checked={filters.priceRange === range.id}
                  onChange={() => handlePriceRangeFilter(range.id)}
                />
                <span>{range.name}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

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

          <div className="header-actions">
            <button className="filter-button" onClick={() => setShowFilters(!showFilters)}>
              <FaFilter />
              <span>Lọc</span>
            </button>

            <div className="sort-dropdown">
              <FaSortAmountDown />
              <select value={sortBy} onChange={(e) => handleSort(e.target.value)}>
                <option value="popular">Phổ biến</option>
                <option value="price-asc">Giá thấp đến cao</option>
                <option value="price-desc">Giá cao đến thấp</option>
              </select>
            </div>
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