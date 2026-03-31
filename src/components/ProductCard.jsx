import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAdd = (e) => {
    e.preventDefault(); // Evitar navegar si se hizo clic en el contenedor de Link
    addToCart(product);
    showToast(`✅ ${product.name} al carrito`);
  };

  return (
    <div className="product-card">
      <Link to={`/producto/${product.id}`} className="product-image-container" style={{ display: 'block' }}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image" 
          loading="lazy" 
        />
        <button 
          className="add-to-cart-btn" 
          aria-label={`Añadir ${product.name} al carrito`}
          onClick={handleAdd}
        >
          <ShoppingCart size={20} />
          <span>Añadir al carrito</span>
        </button>
      </Link>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <Link to={`/producto/${product.id}`} style={{ display: 'block' }}>
          <h3 className="product-name" style={{ transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--color-red)'} onMouseOut={e => e.target.style.color='var(--color-black)'}>{product.name}</h3>
        </Link>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
