import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="page-container">
      <div className="not-found">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <h2>Страница не найдена</h2>
          <p>Извините, запрашиваемая страница не существует.</p>
          <div className="not-found-actions">
            <Link to="/" className="home-button">
              Главная страница
            </Link>
            <Link to="/products" className="products-button">
              Каталог товаров
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;