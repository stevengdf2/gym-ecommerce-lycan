import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useProducts } from '../context/ProductContext';
import { Loader2 } from 'lucide-react';
import './Shop.css';

export default function FeaturedProducts() {
  const { products, isLoading } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <section id="productos" className="section bg-white">
      <div className="container">
        <h2 className="section-title">LO MÁS VENDIDO</h2>
        
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '64px 0', color: 'var(--color-red)' }}>
            <Loader2 size={48} className="animate-spin" />
            <style>{`.animate-spin { animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <div className="products-grid">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link to="/tienda" className="btn-primary">Ver Catálogo Completo</Link>
        </div>
      </div>
    </section>
  );
}
