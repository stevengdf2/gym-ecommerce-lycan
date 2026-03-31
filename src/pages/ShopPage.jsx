import Shop from '../components/Shop';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function ShopPage() {
  useDocumentTitle('Catálogo de Productos | GymPro');
  return (
    <div style={{ paddingTop: '100px', backgroundColor: 'var(--color-white)', minHeight: '80vh' }}>
      <Shop />
    </div>
  );
}
