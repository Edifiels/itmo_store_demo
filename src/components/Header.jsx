import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">Fake Store</span>
        </Link>

        <form className="search-form desktop-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </form>

        <nav className="desktop-nav">
          <Link to="/" className={isActive('/')}>
            Главная
          </Link>
          <Link to="/products" className={isActive('/products')}>
            Товары
          </Link>
        </nav>

        <div className="header-actions">
          <Link to="/cart" className="cart-button">
            🛒
            {getTotalItems() > 0 && (
              <span className="cart-count">{getTotalItems()}</span>
            )}
          </Link>

          <button 
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <form className="search-form mobile-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                🔍
              </button>
            </form>

            <nav className="mobile-nav">
              <Link 
                to="/" 
                className={isActive('/')}
                onClick={() => setMobileMenuOpen(false)}
              >
                Главная
              </Link>
              <Link 
                to="/products" 
                className={isActive('/products')}
                onClick={() => setMobileMenuOpen(false)}
              >
                Товары
              </Link>
              <Link 
                to="/cart" 
                className={isActive('/cart')}
                onClick={() => setMobileMenuOpen(false)}
              >
                Корзина ({getTotalItems()})
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
