import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import './Shop.css'; // Reutilizamos estilos del grid

export default function FeaturedProducts() {
  // Solo los 4 primeros productos como destacados
  const featured = products.slice(0, 4);

  return (
    <section className="section bg-white" style={{ paddingTop: '100px' }}>
      <div className="container">
        <h2 className="section-title">DESTACADOS</h2>
        
        <div className="products-grid">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link to="/tienda" className="btn-primary">Ver Catálogo Completo</Link>
        </div>
      </div>
    </section>
  );
}
