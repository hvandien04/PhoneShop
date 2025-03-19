import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className="product-overlay">
          <button className="add-to-cart">
            <i className="fas fa-shopping-cart"></i>
            Thêm vào giỏ
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">
          {product.price.toLocaleString('vi-VN')}đ
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 