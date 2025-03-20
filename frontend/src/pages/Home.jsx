import ProductList from '../components/ProductList';
import Banner from '../components/Banner';
import '../styles/Home.css';

const Home = () => {
  // Dữ liệu sản phẩm mẫu
  const products = [
    {
      id: 1,
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Samsung Galaxy S24 Ultra 256GB chính hãng - Màn hình 6.8 inch, Snapdragon 8 Gen 3',
      price: 24990000,
      image: '/src/assets/img/Samsung/image_56.jpg',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24+',
      description: 'Samsung Galaxy S24+ 256GB chính hãng - Màn hình 6.7 inch, Snapdragon 8 Gen 3',
      price: 19990000,
      image: '/src/assets/img/Samsung/image_61.jpg',
    },
    {
      id: 3,
      name: 'Samsung Galaxy S24',
      description: 'Samsung Galaxy S24 256GB chính hãng - Màn hình 6.2 inch, Snapdragon 8 Gen 3',
      price: 15990000,
      image: '/src/assets/img/Samsung/image_60.jpg',
    },
    {
      id: 4,
      name: 'Samsung Galaxy S23 Ultra',
      description: 'Samsung Galaxy S23 Ultra 256GB chính hãng - Màn hình 6.8 inch, Snapdragon 8 Gen 2',
      price: 22990000,
      image: '/src/assets/img/Samsung/image_59.jpg',
    },
    {
      id: 5,
      name: 'Samsung Galaxy S23+',
      description: 'Samsung Galaxy S23+ 256GB chính hãng - Màn hình 6.6 inch, Snapdragon 8 Gen 2',
      price: 18990000,
      image: '/src/assets/img/Samsung/image_58.jpg',
    },
    {
      id: 6,
      name: 'Samsung Galaxy S23',
      description: 'Samsung Galaxy S23 256GB chính hãng - Màn hình 6.1 inch, Snapdragon 8 Gen 2',
      price: 15990000,
      image: '/src/assets/img/Samsung/image_57.jpg',
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