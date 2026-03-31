import { Phone, MapPin, Mail, Clock } from 'lucide-react';
import '../components/InfoContact.css'; // Podemos reusar parte del grid original si es necesario

export default function ContactPage() {
  return (
    <div style={{ paddingTop: '120px', paddingBottom: '80px', backgroundColor: 'var(--color-black)', minHeight: '80vh', color: 'var(--color-white)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-white)' }}>CONTÁCTANOS</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-gray)', marginTop: '16px' }}>Estamos listos para asesorarte con el equipamiento ideal para ti.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
          
          {/* Columna de detalles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Phone className="text-red" size={32} />
              <div>
                <h4 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Teléfono (WhatsApp)</h4>
                <p style={{ color: 'var(--color-gray)' }}>+593 99 999 9999</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <MapPin className="text-red" size={32} />
              <div>
                <h4 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Sede Principal</h4>
                <p style={{ color: 'var(--color-gray)' }}>Av. Naciones Unidas y Shyris<br/>Quito, Ecuador</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Mail className="text-red" size={32} />
              <div>
                <h4 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Correo Corporativo</h4>
                <p style={{ color: 'var(--color-gray)' }}>contacto@gympro.ec</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Clock className="text-red" size={32} />
              <div>
                <h4 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Horarios de Atención</h4>
                <p style={{ color: 'var(--color-gray)' }}>Lunes a Viernes: 08:00 - 18:00<br/>Sábados: 09:00 - 14:00</p>
              </div>
            </div>
          </div>

          {/* Columna del Mapa (Google Maps) */}
          <div style={{ borderRadius: '8px', overflow: 'hidden', minHeight: '350px' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.231904123863!2d-78.48421005!3d-0.1751333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a72cd0158a1%3A0xc3f58a9e0f135b45!2sParque%20La%20Carolina!5e0!3m2!1ses!2sec!4v1700000000000!5m2!1ses!2sec" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(0.8) contrast(1.2)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>

        </div>
      </div>
    </div>
  );
}
