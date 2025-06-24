import { useState, useEffect } from 'react';

function Sidebar({ onFilterChange, isVisible = true }) {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'default'
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
      }
    };

    fetchCategories();
  }, []);

  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'default'
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  if (!isVisible) return null;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Фильтры</h3>
      </div>
      
      <div className="sidebar-content">
        <div className="filter-section">
          <h4>Категория</h4>
          <select 
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="filter-select"
          >
            <option value="">Все категории</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-section">
          <h4>Цена</h4>
          <div className="price-filters">
            <input
              type="number"
              placeholder="От"
              value={filters.minPrice}
              onChange={(e) => updateFilter('minPrice', e.target.value)}
              className="price-input"
              min="0"
            />
            <input
              type="number"
              placeholder="До"
              value={filters.maxPrice}
              onChange={(e) => updateFilter('maxPrice', e.target.value)}
              className="price-input"
              min="0"
            />
          </div>
        </div>

        <div className="filter-section">
          <h4>Сортировка</h4>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="filter-select"
          >
            <option value="default">По умолчанию</option>
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
            <option value="name-asc">Название: А-Я</option>
            <option value="name-desc">Название: Я-А</option>
          </select>
        </div>

        <button className="reset-button" onClick={resetFilters}>
          Сбросить фильтры
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
