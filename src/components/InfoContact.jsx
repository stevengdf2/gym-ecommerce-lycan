import { Phone, MapPin, Mail } from 'lucide-react';
import './InfoContact.css';

export default function InfoContact() {
  return (
    <section id="contacto" className="section info-contact bg-black">
      <div className="container">
        
        <div className="mission-statement animate-fade-up">
          <h2>"Proveemos las mejores herramientas para llevar tu rendimiento físico al siguiente nivel."</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-item">
            <Phone className="contact-icon text-red" size={32} />
            <h4>Llámanos</h4>
            <a href="tel:+593963366512" className="contact-link">+593 96 336 6512</a>
          </div>
          
          <div className="contact-item">
            <MapPin className="contact-icon text-red" size={32} />
            <h4>Ubicación</h4>
            <p className="contact-text">Quito, Ecuador<br/>Av. Principal 123</p>
          </div>
          
          <div className="contact-item">
            <Mail className="contact-icon text-red" size={32} />
            <h4>Email</h4>
            <a href="mailto:info@gympro.ec" className="contact-link">info@gympro.ec</a>
          </div>
        </div>
      </div>
    </section>
  );
}
