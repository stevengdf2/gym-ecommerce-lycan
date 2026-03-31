import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const waNumber = "593963366512";

  const handleCheckout = () => {
    let message = `¡Hola GymPro! Quiero comprar lo siguiente:\n\n`;
    cartItems.forEach(item => {
      message += `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})\n`;
    });
    message += `\n*TOTAL A PAGAR: $${getCartTotal().toFixed(2)}*\n\n¿A qué cuenta puedo transferir?`;
    
    // Abrir WhatsApp en nueva pestaña
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, "_blank");
    
    // Opcional: Vaciar carrito al enviar (descomentar si se desea)
    // clearCart();
  };

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh', backgroundColor: 'var(--color-gray-light)' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '32px' }}>TU CARRITO</h1>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '64px', borderRadius: '8px' }}>
            <h2>Tu carrito está vacío</h2>
            <p style={{ color: 'var(--color-gray)', marginTop: '16px', marginBottom: '32px' }}>Aún no has añadido equipamiento a tu lista.</p>
            <Link to="/tienda" className="btn-primary">Volver a la Tienda</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '32px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #eee' }}>
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                  
                  <div style={{ flex: 1, padding: '0 24px' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{item.name}</h3>
                    <p style={{ color: 'var(--color-red)', fontWeight: 'bold' }}>${item.price.toFixed(2)} <span style={{ color: '#999', fontSize: '0.9rem', fontWeight: 'normal' }}>c/u</span></p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px' }}>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ padding: '8px 12px', fontSize: '1.2rem', color: '#666' }}>-</button>
                      <span style={{ padding: '0 12px', fontWeight: 'bold' }}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ padding: '8px 12px', fontSize: '1.2rem', color: '#666' }}>+</button>
                    </div>
                    <p style={{ fontWeight: 'bold', minWidth: '80px', textAlign: 'right' }}>${(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      style={{ color: 'var(--color-red)', padding: '8px' }}
                      aria-label="Eliminar item"
                    ><Trash2 size={24} /></button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '32px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '1.1rem', color: '#666' }}>Resumen del pedido</p>
                <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-black)' }}>Total: <span className="text-red">${getCartTotal().toFixed(2)}</span></h2>
              </div>
              <button onClick={handleCheckout} className="btn-primary" style={{ padding: '20px 40px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#25D366' }}>
                Proceder al Pago
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
