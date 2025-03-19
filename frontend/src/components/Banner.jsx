import '../styles/Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h2>Khuyến mãi đặc biệt</h2>
        <p>Giảm giá lên đến 50% cho các sản phẩm điện thoại</p>
        <button className="banner-button">Xem ngay</button>
      </div>
      <div className="banner-overlay"></div>
    </div>
  );
};

export default Banner; 