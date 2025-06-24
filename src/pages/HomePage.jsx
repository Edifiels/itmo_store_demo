import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products?limit=3');
        
        if (!response.ok) {
          throw new Error('Ошибка загрузки товаров');
        }
        
        const products = await response.json();
        setFeaturedProducts(products);
      } catch (error) {
        setError(error.message);
        console.error('Ошибка загрузки рекомендуемых товаров:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <LoadingSpinner message="Загрузка рекомендуемых товаров..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-container">
          <h2>Ошибка загрузки</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Попробовать ещё раз
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="hero-section">
        <h1>Добро пожаловать в Fake Store!</h1>
        <p className="hero-subtitle">
          Лучшие товары по отличным ценам. Быстрая доставка и качественное обслуживание.
        </p>
        <Link to="/products" className="cta-button">
          Посмотреть все товары
        </Link>
      </div>

      <section className="featured-section">
        <h2>Рекомендуемые товары</h2>
        
        {featuredProducts.length > 0 ? (
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <p>Рекомендуемые товары временно недоступны</p>
          </div>
        )}
      </section>

      <section className="features-section">
        <h2>Почему выбирают нас?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Быстрая доставка</h3>
            <p>Доставляем по всему миру за 2-3 дня</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Безопасные платежи</h3>
            <p>Защищённые транзакции и возврат средств</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Качественные товары</h3>
            <p>Только проверенные бренды и поставщики</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📞</div>
            <h3>Поддержка 24/7</h3>
            <p>Помогаем решить любые вопросы круглосуточно</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
