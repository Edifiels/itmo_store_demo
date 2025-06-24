import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    alert('Товар добавлен в корзину!');
  };

  const truncatedTitle = product.title.length > 50 
    ? product.title.substring(0, 50) + '...'
    : product.title;

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.title}
            className="product-image"
          />
          
          {product.rating && (
            <div className="product-rating">
              ⭐ {product.rating.rate.toFixed(1)}
            </div>
          )}
        </div>
        
        <div className="product-info">
          <h3 className="product-title" title={product.title}>
            {truncatedTitle}
          </h3>
          
          <p className="product-category">
            {product.category}
          </p>
          
          <p className="product-price">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
      
      <button
        className="add-to-cart-button"
        onClick={handleAddToCart}
      >
        🛒 В корзину
      </button>
    </div>
  );
}

export default ProductCard;
