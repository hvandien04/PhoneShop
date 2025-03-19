import ProductList from '../components/ProductList';
import Banner from '../components/Banner';
import '../styles/Home.css';

const Home = () => {
  // Dữ liệu sản phẩm mẫu
  const products = [
    {
      id: 1,
      name: 'iPhone 13 Pro Max',
      description: 'iPhone 13 Pro Max 256GB chính hãng VN/A',
      price: 25990000,
      image: 'https://cdn.tgdd.vn/Products/Images/42/250261/iphone-13-pro-max-graphite-600x600.jpg',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S23 Ultra',
      description: 'Samsung Galaxy S23 Ultra 256GB chính hãng',
      price: 22990000,
      image: 'https://cdn.tgdd.vn/Products/Images/42/249948/samsung-galaxy-s23-ultra-xanh-600x600.jpg',
    },
    {
      id: 3,
      name: 'Xiaomi 13 Pro',
      description: 'Xiaomi 13 Pro 256GB chính hãng',
      price: 19990000,
      image: 'https://cdn.tgdd.vn/Products/Images/42/249948/xiaomi-13-pro-den-600x600.jpg',
    },
    {
      id: 4,
      name: 'OPPO Find X6 Pro',
      description: 'OPPO Find X6 Pro 256GB chính hãng',
      price: 18990000,
      image: 'https://cdn.tgdd.vn/Products/Images/42/249948/oppo-find-x6-pro-den-600x600.jpg',
    },
    {
      id: 5,
      name: 'OPPO Find X6 Pro',
      description: 'OPPO Find X6 Pro 256GB chính hãng',
      price: 18990000,
      image: 'https://cdn.tgdd.vn/Products/Images/42/249948/oppo-find-x6-pro-den-600x600.jpg',
    },
    {
      id: 6,
      name: 'OPPO Find X6 Pro',
      description: 'OPPO Find X6 Pro 256GB chính hãng',
      price: 18990000,
      image: 'https://cdn.tgdd.vn/Products/Images/42/249948/oppo-find-x6-pro-den-600x600.jpg',
    },
  ];

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Chào mừng đến với PhoneShop</h1>
        <p>Chuyên bán điện thoại chính hãng với giá tốt nhất</p>
      </div>
      <Banner />
      <section className="featured-products">
        <h2>Sản phẩm nổi bật</h2>
        <ProductList products={products} />
      </section>
    </div>
  );
};

export default Home; 