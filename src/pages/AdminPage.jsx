import { useState } from 'react';
import { Lock, LogIn, Edit, Trash2, X, PackagePlus, CheckCircle2 } from 'lucide-react';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../firebase/config';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useProducts } from '../context/ProductContext';
import { products as localProducts } from '../data/products';

export default function AdminPage() {
  useDocumentTitle("Panel de Control | GymPro");
  
  // Seguridad de Bóveda: Google Auth
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Contexto de la tienda para mostrar el inventario vivo abajo
  const { products } = useProducts();

  // Estados del Formulario (Ahora comparte Modos de Crear y Editar)
  const [editingId, setEditingId] = useState(null); // null = Modo Lanzar. ID numérico = Modo Editar
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Equipamiento');
  const [price, setPrice] = useState('');
  const [badge, setBadge] = useState(''); // NEW
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLogged(true);
    } catch (error) {
      alert("Acceso Denegado ❌\nTu correo o contraseña no coincide con los permisos maestros de la base de datos.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setPrice('');
    setBadge(''); // NEW
    setImage('');
    setDescription('');
    setFeaturesText('');
  };

  const handleCreateOrUpdateProduct = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setSuccessMsg('');

    try {
      const cleanPrice = parseFloat(price.toString().replace(',', '.'));
      const featureArray = featuresText.split(';').map(f => f.trim()).filter(f => f.length > 0);

      const finalId = editingId || Date.now(); 
      const productPayload = {
        id: finalId,
        name: name,
        category: category,
        price: cleanPrice,
        badge: badge, // NEW
        image: image || "https://via.placeholder.com/600x600?text=Sin+Foto",
        description: description,
        features: featureArray
      };

      // Optimistic UI, envío invisible y rápido a la Nube
      setDoc(doc(db, 'products', finalId.toString()), productPayload).catch(e => console.log("Silent error", e));
      
      setSuccessMsg(editingId ? `¡El artículo "${name}" se actualizó con éxito!` : `¡"${name}" fue subido al catálogo mundial!`);
      resetForm();
      
    } catch (error) {
      console.error(error);
      alert("Hubo un error armando el producto o con el navegador.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditClick = (prod) => {
    setEditingId(prod.id);
    setName(prod.name);
    setCategory(prod.category);
    setPrice(prod.price);
    setBadge(prod.badge || ''); // NEW
    setImage(prod.image);
    setDescription(prod.description);
    setFeaturesText(prod.features ? prod.features.join('; ') : '');
    setSuccessMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = (prodId, prodName) => {
    const confirmation = window.confirm(`CUIDADO: ¿Estás SEGURO de que deseas borrar "${prodName}" permanentemente de tu tienda?`);
    if (confirmation) {
      deleteDoc(doc(db, 'products', prodId.toString())).catch(e => console.error("Error al borrar optimista", e));
    }
  };

  const handleMassiveUpload = () => {
    const confirm = window.confirm("ATENCIÓN: ¿Seguro que deseas inyectar los 40 productos pre-agregados al servidor de Google?");
    if (confirm) {
      localProducts.forEach(item => {
         setDoc(doc(db, 'products', item.id.toString()), item);
      });
      alert("¡Todos los 40 artículos se inyectaron a la bóveda y ya están a la venta! Te sugiero que borres el inventario anterior usando los tachos rojos de abajo.");
    }
  };

  if (!isLogged) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9' }}>
        <form onSubmit={handleLogin} style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <Lock size={48} color="var(--color-red)" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Área de Control</h2>
          <p style={{ color: 'var(--color-gray)', marginBottom: '24px' }}>Identidad Requerida.</p>
          
          <input 
            type="email"
            required
            placeholder="Correo electrónico maestro"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
          />

          <input 
            type="password"
            required
            placeholder="Introduce la contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '24px', border: '1px solid #ccc', borderRadius: '4px' }}
          />

          <button disabled={isLoggingIn} type="submit" className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <LogIn size={20} />
            {isLoggingIn ? "Verificando..." : "Autorizar Acceso"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '80vh', backgroundColor: '#f4f4f4' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* PARTE A: EL FORMULARIO MAESTRO (CREAR / EDITAR) */}
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', marginBottom: '40px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', borderBottom: '2px solid #eee', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
               <PackagePlus size={36} color={editingId ? "#10b981" : "var(--color-red)"} />
               <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', margin: 0 }}>
                 {editingId ? "Modificar Artículo" : "Publicar Nuevo Artículo"}
               </h1>
            </div>
            {editingId && (
              <button 
                onClick={resetForm}
                className="btn-outline"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '0.9rem' }}
              >
                <X size={16} /> Cancelar Edición
              </button>
            )}
          </div>

          {successMsg && (
            <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '16px', borderRadius: '4px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 />
              <b>{successMsg}</b>
            </div>
          )}

          <form onSubmit={handleCreateOrUpdateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 2 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Nombre del Producto *</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Ej: Prensa de Piernas 45..." />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Precio ($) *</label>
                <input required type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="0.00" />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Categoría *</label>
                <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}>
                  <option value="Equipamiento">Equipamiento</option>
                  <option value="Suplementos">Suplementos</option>
                  <option value="Indumentaria">Indumentaria</option>
                  <option value="Accesorios">Accesorios</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: 'var(--color-red)' }}>Insignia Oferta (Opcional)</label>
                <input type="text" value={badge} onChange={e => setBadge(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid var(--color-red)', borderRadius: '4px', backgroundColor: '#fff5f5' }} placeholder="Ej: -20% OFF" />
              </div>
              <div style={{ flex: 2 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Link Fotografía *</label>
                <input required type="url" value={image} onChange={e => setImage(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="https://mi-disco/foto.jpg" />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Descripción Larga *</label>
              <textarea required rows={4} value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }} placeholder="Este artículo fue concebido para resistir..." />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Viñetas (Características Especiales)</label>
              <input type="text" value={featuresText} onChange={e => setFeaturesText(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Separado por Punto y Coma (;) -> Ej: Acero de Calidad; Resistente al agua;" />
              <small style={{ color: '#888' }}>Ejemplo: Garantía 2 años; Cobertura nacional; (El sistema creará las bolitas de lista interactiva)</small>
            </div>

            <button disabled={isUploading} type="submit" style={{ padding: '16px', fontSize: '1.2rem', marginTop: '16px', backgroundColor: editingId ? '#10b981' : 'var(--color-red)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-heading)', opacity: isUploading ? 0.5 : 1 }}>
              {isUploading ? '💾 Procesando...' : (editingId ? '✅ Guardar Modificación' : '🚀 Lanzar Producto a la Tienda')}
            </button>
          </form>
        </div>

        {/* BOTÓN MÁGICO DE CARGA MASIVA */}
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', marginBottom: '40px', textAlign: 'center', border: '2px dashed var(--color-red)' }}>
          <h3 style={{ marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>Sincronización Inteligente de Stock (40 items listos)</h3>
          <p style={{ color: '#555', marginBottom: '16px', fontSize: '0.9rem' }}>Pulsa aquí si quieres saltarte escribir los 40 artículos a mano. El sistema los insertará de un solo golpe según la lista que diseñé para ti.</p>
          <button 
            onClick={handleMassiveUpload}
            style={{ backgroundColor: '#111', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '1.1rem', cursor: 'pointer', fontFamily: 'var(--font-heading)' }}
          >
            ⚡ INYECTAR CATÁLOGO MASIVO A LA NUBE
          </button>
        </div>

        {/* PARTE B: EL INVENTARIO EN VIVO (TABLA) */}
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
           <h2 style={{ fontFamily: 'var(--font-heading)', borderBottom: '2px solid #eee', paddingBottom: '16px', marginBottom: '24px' }}>
             Inventario Operacional ({products.length} Artículos)
           </h2>
           
           {products.length === 0 ? (
             <p style={{ color: '#888', textAlign: 'center', padding: '20px' }}>No hay productos vivos en la Nube actualmente.</p>
           ) : (
             <div style={{ overflowX: 'auto' }}>
               <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                 <thead>
                   <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                     <th style={{ padding: '12px', color: '#495057' }}>Producto</th>
                     <th style={{ padding: '12px', color: '#495057' }}>Precio</th>
                     <th style={{ padding: '12px', color: '#495057' }}>Categoría</th>
                     <th style={{ padding: '12px', color: '#495057', textAlign: 'center' }}>Acciones</th>
                   </tr>
                 </thead>
                 <tbody>
                   {products.map(prod => (
                     <tr key={prod.id} style={{ borderBottom: '1px solid #e9ecef', backgroundColor: editingId === prod.id ? '#fcf8e3' : 'white' }}>
                       <td style={{ padding: '12px', fontWeight: '500' }}>{prod.name}</td>
                       <td style={{ padding: '12px' }}>${prod.price.toFixed(2)}</td>
                       <td style={{ padding: '12px' }}>
                         <span style={{ backgroundColor: '#e9ecef', padding: '4px 8px', borderRadius: '12px', fontSize: '0.85rem' }}>{prod.category}</span>
                       </td>
                       <td style={{ padding: '12px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                         <button 
                           onClick={() => handleEditClick(prod)}
                           title="Editar este producto"
                           style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                         >
                           <Edit size={16} />
                         </button>
                         <button 
                           onClick={() => handleDeleteClick(prod.id, prod.name)}
                           title="Borrar de la Nube"
                           style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                         >
                           <Trash2 size={16} />
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           )}
        </div>

      </div>
    </div>
  );
}
