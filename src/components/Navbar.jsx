import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext'; // NEW
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { getCartCount } = useCart();
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // Filter logic para el buscador predictivo
  const searchResults = searchTerm.length > 1 
    ? products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5)
    : [];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Cierre del menú de búsqueda al dar clic fuera
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Si no es la página de inicio, forzamos que el Navbar sea sólido usando la clase "scrolled"
  const isSolid = location.pathname !== '/' || isScrolled;

  return (
    <nav className={`navbar ${isSolid ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          GYM<span className="text-red">PRO</span>
        </Link>
        
        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link></li>
          <li><Link to="/tienda" onClick={() => setMenuOpen(false)}>Tienda</Link></li>
          <li><Link to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</Link></li>
          <li className="mobile-only"><Link to="/carrito" onClick={() => setMenuOpen(false)}>Carrito</Link></li>
        </ul>

        <div className="navbar-actions">
          {/* BUSCADOR PREDICTIVO NAVBAR */}
          <div ref={searchRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="#aaa" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Buscar suplemento..." 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setShowResults(true); }}
                onFocus={() => setShowResults(true)}
                style={{ padding: '8px 10px 8px 32px', borderRadius: '20px', border: '1px solid #333', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', width: '180px', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>
            {/* Lista desplegable flotante */}
            {showResults && searchTerm.length > 1 && (
              <div style={{ position: 'absolute', top: '120%', right: 0, width: '250px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', overflow: 'hidden', zIndex: 100 }}>
                {searchResults.length > 0 ? searchResults.map(p => (
                   <Link 
                     key={p.id} 
                     to={`/producto/${p.id}`} 
                     onClick={() => { setShowResults(false); setSearchTerm(''); }}
                     style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderBottom: '1px solid #f0f0f0', color: '#111', textDecoration: 'none', transition: 'background-color 0.2s' }}
                     onMouseOver={e => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                     onMouseOut={e => e.currentTarget.style.backgroundColor = 'white'}
                   >
                     <img src={p.image} alt={p.name} style={{ width: '35px', height: '35px', objectFit: 'contain' }} />
                     <div style={{ fontSize: '0.85rem', lineHeight: '1.2' }}>
                       <span style={{ display: 'block', fontWeight: 'bold' }}>{p.name.length > 25 ? p.name.substring(0,25) + '...' : p.name}</span>
                       <span style={{ color: 'var(--color-red)' }}>${p.price.toFixed(2)}</span>
                     </div>
                   </Link>
                )) : (
                   <div style={{ padding: '16px', fontSize: '0.85rem', color: '#888', textAlign: 'center' }}>No se encontraron resultados</div>
                )}
              </div>
            )}
          </div>

          <Link to="/carrito" className="cart-btn" aria-label="Ver Carrito" style={{ position: 'relative' }}>
            <ShoppingBag size={24} />
            {getCartCount() > 0 && (
              <span className="cart-badge" style={{
                position: 'absolute',
                top: '-5px',
                right: '-8px',
                backgroundColor: 'var(--color-red)',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {getCartCount()}
              </span>
            )}
          </Link>
          <button 
            className="menu-btn" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
