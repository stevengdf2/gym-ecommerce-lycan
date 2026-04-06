import { createContext, useState, useEffect, useContext } from 'react';
import { collection, onSnapshot, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { products as localProducts } from '../data/products';

const ProductContext = createContext();

export function useProducts() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(localProducts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Abrir un canal de escucha EN VIVO con la Base de datos de Google
    const productCollection = collection(db, 'products');
    
    const unsubscribe = onSnapshot(productCollection, async (snapshot) => {
      
      // Sembrado automático: Si la nube de Firebase está totalmente vacía 
      // (Porque es la primera vez que la usamos), subimos el catálogo viejo.
      if (snapshot.empty) {
        // 1. Mostrar contenido inmediatamente (Rescate Visual)
        setProducts(localProducts);
        setIsLoading(false);

        // 2. Intentar sembrado en segundo plano (Fire and forget sin await)
        if (!window.hasAttemptedSeed) {
          window.hasAttemptedSeed = true;
          localProducts.forEach(item => {
             setDoc(doc(db, 'products', item.id.toString()), item).catch(e => {
                console.error("Fallo silencioso subiendo a la nube", e);
             });
          });
        }
        return; 
      }

      // Si sí vienen datos, los convertimos en un arreglo que React pueda leer
      const liveProducts = snapshot.docs.map(docu => ({
        id: parseInt(docu.id) || docu.id,
        ...docu.data()
      }));

      // Ordenar por ID para que el catálogo mantenga el orden lógico y no se mezcle
      liveProducts.sort((a, b) => a.id - b.id);
      
      setProducts(liveProducts);
      setIsLoading(false);
      
    }, (error) => {
      console.error("La conexión a Firebase fue denegada o falló:", error);
      // Fallback: Si se corta el internet, inyectamos la versión estática de rescate
      setProducts(localProducts);
      setIsLoading(false);
    });

    // Apagar la conexión si cierran la página
    return () => unsubscribe();
  }, []);

  return (
    <ProductContext.Provider value={{ products, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
}
