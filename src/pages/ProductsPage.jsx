import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import LoadingSpinner from '../components/LoadingSpinner';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        
        if (!response.ok) {
          throw new Error('Ошибка загрузки товаров');
        }
        
        const productsData = await response.json();
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        setError(error.message);
        console.error('Ошибка загрузки товаров:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    applySearchFilter();
  }, [searchQuery, products]);

  const applySearchFilter = () => {
    if (searchQuery && products.length > 0) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleFilterChange = (filters) => {
    let filtered = [...products];

    // Применяем поиск если есть
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по категории
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Фильтр по цене
    if (filters.minPrice) {
      filtered = filtered.filter(product => product.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(product => product.price <= parseFloat(filters.maxPrice));
    }

    // Сортировка
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="page-container">
        <LoadingSpinner message="Загрузка товаров..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-container">
          <h2>Ошибка загрузки товаров</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Попробовать ещё раз
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-layout">
        <Sidebar onFilterChange={handleFilterChange} />
        
        <div className="products-content">
          <div className="products-header">
            <h1>Каталог товаров</h1>
            {searchQuery && (
              <p className="search-info">
                Результаты поиска для: <strong>"{searchQuery}"</strong>
              </p>
            )}
            <p className="products-count">
              Найдено товаров: <strong>{filteredProducts.length}</strong>
            </p>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <h2>Товары не найдены</h2>
              <p>Попробуйте изменить параметры поиска или посмотрите все товары</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
