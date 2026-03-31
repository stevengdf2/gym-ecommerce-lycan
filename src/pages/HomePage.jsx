import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import InfoContact from '../components/InfoContact';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function HomePage() {
  useDocumentTitle('GymPro | Equipamiento de Alto Rendimiento');
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <InfoContact />
    </>
  );
}
