import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AdminPage from './pages/AdminPage';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <ToastProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tienda" element={<ShopPage />} />
                <Route path="/producto/:id" element={<ProductDetailsPage />} />
                <Route path="/contacto" element={<ContactPage />} />
                <Route path="/carrito" element={<CartPage />} />
                {/* Puerta Secreta para los empleados */}
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </main>

            <Footer />
            <WhatsAppButton />
          </div>
          </Router>
        </CartProvider>
      </ProductProvider>
    </ToastProvider>
  );
}

export default App;
