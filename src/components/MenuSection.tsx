import { useState } from 'react';
import { acaiSizes, AcaiSize } from '@/data/products';
import SizeCard from './SizeCard';
import CustomizationModal from './CustomizationModal';

const MenuSection = () => {
  const [selectedSize, setSelectedSize] = useState<AcaiSize | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCustomize = (size: AcaiSize) => {
    setSelectedSize(size);
    setIsModalOpen(true);
  };

  return (
    <section id="cardapio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-4">
            Nosso Cardápio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o tamanho ideal e personalize com seus complementos favoritos
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {acaiSizes.map((size) => (
            <SizeCard key={size.id} size={size} onCustomize={handleCustomize} />
          ))}
        </div>
      </div>

      <CustomizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedSize={selectedSize}
      />
    </section>
  );
};

export default MenuSection;
