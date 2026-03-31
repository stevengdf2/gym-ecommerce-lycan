import { useState } from 'react';
import { Search } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import './Shop.css';

const categories = ['Todos', 'Equipamiento', 'Suplementos', 'Indumentaria', 'Accesorios'];

export default function Shop() {
  const [activeTab, setActiveTab] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('relevant'); // relevant, low-to-high, high-to-low

  // Primero filtramos la categoría y el texto
  let displayProducts = products.filter(p => {
    const matchCategory = activeTab === 'Todos' || p.category === activeTab;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Luego ordenamos según la selección
  if (sortOrder === 'low-to-high') {
    displayProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'high-to-low') {
    displayProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <section id="tienda" className="section bg-white">
      <div className="container">
        <h2 className="section-title">EL CATÁLOGO</h2>
        
        {/* Filtros Avanzados */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', marginBottom: '32px', padding: '16px', backgroundColor: 'var(--color-gray-light)', borderRadius: '8px' }}>
          
          <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
            <Search size={20} color="#888" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Buscar productos..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 40px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem', outline: 'none' }}
            />
          </div>

          <div style={{ flex: '0 0 auto' }}>
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
              style={{ padding: '12px 16px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem', backgroundColor: 'white', cursor: 'pointer', outline: 'none' }}
            >
              <option value="relevant">Más Relevantes</option>
              <option value="low-to-high">Precio: Menor a Mayor</option>
              <option value="high-to-low">Precio: Mayor a Menor</option>
            </select>
          </div>

        </div>

        <div className="tabs-container">
          {categories.map(category => (
            <button 
              key={category}
              className={`tab-item ${activeTab === category ? 'active' : ''}`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {displayProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--color-gray)' }}>
            <h3>No encontramos productos que coincidan con tu búsqueda.</h3>
          </div>
        ) : (
          <div className="products-grid">
            {displayProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
