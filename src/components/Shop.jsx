import { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import './Shop.css';

const categories = ['Todos', 'Equipamiento', 'Suplementos', 'Indumentaria', 'Accesorios'];

export default function Shop() {
  const [activeTab, setActiveTab] = useState('Todos');

  const filteredProducts = activeTab === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <section id="tienda" className="section bg-white">
      <div className="container">
        <h2 className="section-title">EL CATÁLOGO</h2>
        
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

        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
