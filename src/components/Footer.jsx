import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-black">
      <div className="container">
        
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <h3 className="footer-logo">GYM<span className="text-red">PRO</span></h3>
            <p className="footer-mission">Equipamiento deportivo premium para verdaderos atletas. Supera tus límites.</p>
          </div>
          
          <div className="footer-col links-col">
            <h4 className="footer-heading">Enlaces Rápidos</h4>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/tienda">Catálogo</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>
          
          <div className="footer-col social-col">
            <h4 className="footer-heading">Síguenos</h4>
            <div className="social-links">
              <a href="#" aria-label="Instagram"><Instagram size={24}/></a>
              <a href="#" aria-label="Facebook"><Facebook size={24}/></a>
              <a href="#" aria-label="Twitter"><Twitter size={24}/></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} GymPro. Todos los derechos reservados.</p>
          <p className="footer-tagline">Diseñado para el alto rendimiento</p>
        </div>

      </div>
    </footer>
  );
}
