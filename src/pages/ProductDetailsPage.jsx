import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, ShoppingCart, CheckCircle2, Loader2 } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { products, isLoading } = useProducts();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  
  // Salto de cámara instantáneo en lugar de deslizamiento
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);
  
  const product = products.find(p => p.id === parseInt(id));
  
  // SEO title setup
  useDocumentTitle(product ? `${product.name} | GymPro` : 'Cargando | GymPro');

  if (isLoading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-white)' }}>
         <Loader2 size={64} className="animate-spin" color="var(--color-red)" />
         <p style={{ marginTop: '16px', fontFamily: 'var(--font-heading)' }}>Sincronizando Base de Datos...</p>
         <style>{`.animate-spin { animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ paddingTop: '150px', textAlign: 'center', minHeight: '70vh' }}>
        <h2>Producto no encontrado</h2>
        <Link to="/tienda" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
          Volver a la Tienda
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`✅ ${product.name} añadido al carrito`);
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '80vh', backgroundColor: 'var(--color-white)' }}>
      <div className="container">
        
        {/* Botón Atrás visible sin necesidad de hover */}
        <div style={{ marginBottom: '32px' }}>
          <Link to="/tienda" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#111', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--color-red)'} onMouseOut={(e) => e.target.style.color = '#111'}>
            <ArrowLeft size={20} />
            Volver a la Tienda
          </Link>
        </div>

        {/* Layout Detalle */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'start' }}>
          
          {/* Imagen Gigante */}
          <div style={{ backgroundColor: 'var(--color-gray-light)', borderRadius: '8px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', maxHeight: '500px', objectFit: 'contain', mixBlendMode: 'multiply' }} 
            />
          </div>

          {/* Información Técnica */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <span style={{ color: 'var(--color-red)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>
                {product.category}
              </span>
              <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', lineHeight: '1.1', margin: '8px 0' }}>
                {product.name}
              </h1>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-black)' }}>
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p style={{ fontSize: '1.1rem', color: '#444', lineHeight: '1.8' }}>
              {product.description}
            </p>

            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '16px' }}>Especificaciones</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {product.features.map((feature, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#555' }}>
                    <CheckCircle2 size={20} color="var(--color-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: '16px' }}>
              <button 
                onClick={handleAddToCart}
                className="btn-primary" 
                style={{ width: '100%', padding: '20px', fontSize: '1.2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}
              >
                <ShoppingCart size={24} />
                AÑADIR AL CARRITO
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
