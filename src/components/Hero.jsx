import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-background">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
          alt="Entrenamiento funcional background" 
          className="hero-image"
          loading="lazy"
        />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content container animate-fade-up">
        <h1 className="hero-title">EQUIPAMIENTO DE<br/>ALTO RENDIMIENTO</h1>
        <p className="hero-subtitle">Arma tu espacio de entrenamiento con calidad profesional.</p>
        <Link to="/tienda" className="btn-primary" style={{ marginTop: '32px' }}>
          Explorar Catálogo
        </Link>
      </div>

      <Link to="/tienda" className="hero-scroll-indicator" aria-label="Explorar Catálogo">
        <ChevronDown size={32} />
      </Link>
    </section>
  );
}
