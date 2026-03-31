import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          <button className="cart-btn" aria-label="Carrito">
            <ShoppingBag size={24} />
          </button>
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
