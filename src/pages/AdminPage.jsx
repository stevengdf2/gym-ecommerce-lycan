import { useState } from 'react';
import { CheckCircle2, PackagePlus, Lock } from 'lucide-react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function AdminPage() {
  useDocumentTitle("Panel de Control | GymPro");
  
  // Seguridad simple de acceso administrativo
  const [isLogged, setIsLogged] = useState(false);
  const [password, setPassword] = useState('');
  
  // Estado del Formulario
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Equipamiento');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'administrador') {
      setIsLogged(true);
    } else {
      alert("Contraseña incorrecta. Contacte a Antigravity o sistemas.");
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setSuccessMsg('');

    try {
      // 1. Limpiar datos y comas de precios
      const cleanPrice = parseFloat(price.replace(',', '.'));
      
      // 2. Transforma los "features" separados por "Punto y coma" en items reales (viñetas)
      const featureArray = featuresText.split(';').map(f => f.trim()).filter(f => f.length > 0);

      // 3. Crear el nuevo Producto
      const newId = Date.now(); // ID único basado en el momento de creación
      const newProduct = {
        id: newId,
        name: name,
        category: category,
        price: cleanPrice,
        image: image || "https://via.placeholder.com/600x600?text=Sin+Foto",
        description: description,
        features: featureArray
      };

      // 4. Inyectar en la Base de Datos Firebase permanentemente
      await setDoc(doc(db, 'products', newId.toString()), newProduct);
      
      // 5. Mostrar éxito visual
      setSuccessMsg(`¡${name} fue subido al catálogo mundial con éxito!`);
      
      // 6. Limpiar casilleros para poder meter otro producto
      setName('');
      setPrice('');
      setImage('');
      setDescription('');
      setFeaturesText('');
      
    } catch (error) {
      console.error(error);
      alert("Hubo un error subiendo el producto a Google. Revisa tu internet.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!isLogged) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9' }}>
        <form onSubmit={handleLogin} style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <Lock size={48} color="var(--color-red)" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Área de Control</h2>
          <p style={{ color: 'var(--color-gray)', marginBottom: '24px' }}>Solo para Empleados Autorizados.</p>
          
          <input 
            type="password"
            placeholder="Introduce la contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Ingresar</button>
        </form>
      </div>
    );
  }

  // Si está logeado, mostrar el DASHBOARD
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '80vh', backgroundColor: '#f4f4f4' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', borderBottom: '2px solid #eee', paddingBottom: '16px' }}>
            <PackagePlus size={36} color="var(--color-red)" />
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', m: 0 }}>Publicar Nuevo Artículo</h1>
          </div>

          {successMsg && (
            <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '16px', borderRadius: '4px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 />
              <b>{successMsg}</b>
            </div>
          )}

          <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
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
              <div style={{ flex: 2 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Link de la Fotografía *</label>
                <input required type="url" value={image} onChange={e => setImage(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="https://mi-disco/foto.jpg" />
                <small style={{ color: '#888' }}>*Sube la foto a Facebook o Drive y pega el enlace aquí.</small>
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

            <button disabled={isUploading} type="submit" className="btn-primary" style={{ padding: '16px', fontSize: '1.2rem', marginTop: '16px', opacity: isUploading ? 0.5 : 1 }}>
              {isUploading ? '💾 Subiendo a la Nube...' : '🚀 Lanzar Producto a la Tienda'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
