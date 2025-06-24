import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Товар не найден');
        }
        
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        setError(error.message);
        console.error('Ошибка загрузки товара:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    
    // Имитируем небольшую задержку для UX
    setTimeout(() => {
      addToCart(product);
      setIsAddingToCart(false);
      alert('Товар добавлен в корзину!');
    }, 500);
  };

  if (loading) {
    return (
      <div className="page-container">
        <LoadingSpinner message="Загрузка товара..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page-container">
        <div className="error-container">
          <h2>Товар не найден</h2>
          <p>{error || 'Запрашиваемый товар не существует'}</p>
          <button onClick={() => navigate('/products')}>
            Вернуться к товарам
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="product-detail">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Назад
        </button>
        
        <div className="product-detail-content">
          <div className="product-image-section">
            <img 
              src={product.image} 
              alt={product.title}
              className="product-detail-image"
            />
          </div>
          
          <div className="product-info-section">
            <h1 className="product-detail-title">{product.title}</h1>
            
            <p className="product-detail-category">{product.category}</p>
            
            <div className="product-detail-price">
              ${product.price.toFixed(2)}
            </div>
            
            {product.rating && (
              <div className="product-rating-detail">
                <span className="rating-stars">
                  ⭐ {product.rating.rate.toFixed(1)}
                </span>
                <span className="rating-count">
                  ({product.rating.count} отзывов)
                </span>
              </div>
            )}
            
            <div className="product-description">
              <h3>Описание</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="product-actions">
              <button 
                className={`add-to-cart-detail ${isAddingToCart ? 'loading' : ''}`}
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? '⏳ Добавляем...' : '🛒 Добавить в корзину'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;

