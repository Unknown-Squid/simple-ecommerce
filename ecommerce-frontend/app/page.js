'use client';

import { useRouter } from 'next/navigation';
import PrimaryButton from '@/app/components/Buttons/PrimaryButton';
import ProductCard from '@/app/components/Cards/ProductCard';

export default function LandingPage() {
  const router = useRouter();

  const products = [
    {
      id: 1,
      name: 'Handwoven Basket',
      description: 'Beautifully crafted from natural materials',
      price: '$45',
      image: 'https://placehold.co/400x400/e8d5b7/6b4423?text=Handwoven+Basket'
    },
    {
      id: 2,
      name: 'Ceramic Pottery Set',
      description: 'Traditional hand-thrown ceramics',
      price: '$85',
      image: 'https://placehold.co/400x400/d4a574/5c3a1f?text=Ceramic+Pottery'
    },
    {
      id: 3,
      name: 'Wooden Carving',
      description: 'Intricate hand-carved wooden art',
      price: '$120',
      image: 'https://placehold.co/400x400/8b7355/3d2817?text=Wooden+Carving'
    },
    {
      id: 4,
      name: 'Textile Art',
      description: 'Hand-stitched traditional patterns',
      price: '$65',
      image: 'https://placehold.co/400x400/c9a96e/5d4a2f?text=Textile+Art'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-amber-800">Handicraft Haven</h1>
          <PrimaryButton onClick={() => router.push('/login')} variant="primary">
            Login
          </PrimaryButton>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Handcrafted with Love
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover unique handmade treasures crafted by skilled artisans. 
            Each piece tells a story of tradition, passion, and artistry.
          </p>
        </div>

        {/* Featured Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {products.map((product) => (
            <ProductCard key={product.id} className="overflow-hidden">
              <div className="aspect-square bg-gray-100 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <p className="text-xl font-bold text-amber-600">{product.price}</p>
              </div>
            </ProductCard>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-700 mb-6">
            Join our community and explore more exclusive handicrafts
          </p>
          <PrimaryButton onClick={() => router.push('/login')} variant="primary" className="text-lg px-8 py-4">
            Get Started
          </PrimaryButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-gray-400">© 2024 Handicraft Haven. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
