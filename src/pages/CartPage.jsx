import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice,
    clearCart 
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-cart">
          <h1>Корзина</h1>
          <div className="empty-cart-content">
            <div className="empty-cart-icon">🛒</div>
            <h2>Корзина пуста</h2>
            <p>Добавьте товары в корзину, чтобы они появились здесь</p>
            <Link to="/products" className="continue-shopping-button">
              Перейти к покупкам
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleClearCart = () => {
    if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
      clearCart();
    }
  };

  return (
    <div className="page-container">
      <div className="cart-page">
        <div className="cart-header">
          <h1>Корзина</h1>
          <button 
            className="clear-cart-button"
            onClick={handleClearCart}
          >
            Очистить корзину
          </button>
        </div>
        
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <Link to={`/products/${item.id}`} className="cart-item-image">
                  <img src={item.image} alt={item.title} />
                </Link>
                
                <div className="cart-item-details">
                  <Link to={`/products/${item.id}`} className="cart-item-title">
                    {item.title}
                  </Link>
                  <p className="cart-item-category">{item.category}</p>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>
                
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button 
                      className="quantity-button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button 
                      className="quantity-button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <p className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  
                  <button 
                    className="remove-item-button"
                    onClick={() => removeFromCart(item.id)}
                    title="Удалить товар"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="cart-total">
              <h2>Итого: ${getTotalPrice().toFixed(2)}</h2>
              <p>Товаров в корзине: {cartItems.length}</p>
            </div>
            
            <div className="cart-actions">
              <button className="checkout-button">
                Оформить заказ
              </button>
              <Link to="/products" className="continue-shopping-link">
                Продолжить покупки
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
