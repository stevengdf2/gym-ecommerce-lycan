import { ShoppingCart } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image" 
          loading="lazy" 
        />
        <button className="add-to-cart-btn" aria-label={`Añadir ${product.name} al carrito`}>
          <ShoppingCart size={20} />
          <span>Añadir al carrito</span>
        </button>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
