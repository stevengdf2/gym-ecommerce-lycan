import { MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './WhatsAppButton.css';

export default function WhatsAppButton() {
  const { cartItems, getCartTotal } = useCart();
  const waNumber = "593963366512";

  let finalUrl = `https://wa.me/${waNumber}?text=Hola%20GymPro,%20estoy%20interesado%20en%20equipamiento`;

  if (cartItems && cartItems.length > 0) {
    let message = `¡Hola GymPro! Quiero comprar lo siguiente:\n\n`;
    cartItems.forEach(item => {
      message += `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})\n`;
    });
    message += `\n*TOTAL A PAGAR: $${getCartTotal().toFixed(2)}*\n\n¿Me ayudan con los datos de transferencia?`;
    
    finalUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  }

  return (
    <a 
      href={finalUrl}
      target="_blank" 
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  );
}
