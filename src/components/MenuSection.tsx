import { useState } from 'react';
import { acaiSizes, AcaiSize, AcaiType } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CustomizationModal from './CustomizationModal';

interface MenuSectionProps {
  onNavigate?: (section: string) => void;
}

const MenuSection = ({ onNavigate }: MenuSectionProps) => {
  const [selectedSize, setSelectedSize] = useState<AcaiSize | null>(null);
  const [selectedType, setSelectedType] = useState<AcaiType>('tradicional');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCustomize = (size: AcaiSize, type: AcaiType) => {
    setSelectedSize(size);
    setSelectedType(type);
    setIsModalOpen(true);
  };

  return (
    <section id="cardapio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2">• monte o seu •</p>
          <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-4">
            AÇAÍ
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o tamanho e a modalidade ideal para você
          </p>
        </div>

        {/* Pricing Table */}
        <div className="max-w-3xl mx-auto mb-12">
          <Card className="overflow-hidden border-primary/20">
            <CardContent className="p-0">
              {/* Header */}
              <div className="grid grid-cols-3 bg-primary text-primary-foreground">
                <div className="p-4 font-bold text-lg flex items-center justify-center">
                  TAMANHOS
                </div>
                <div className="p-4 font-bold text-lg text-center border-l border-primary-foreground/20">
                  Tradicional
                </div>
                <div className="p-4 font-bold text-lg text-center border-l border-primary-foreground/20">
                  <div>Trufado</div>
                  <p className="text-xs font-normal opacity-80 mt-1">creme de avelã • creme de ninho</p>
                </div>
              </div>

              {/* Rows */}
              {acaiSizes.map((size, index) => (
                <div
                  key={size.id}
                  className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-muted/50' : 'bg-background'}`}
                >
                  <div className="p-4 font-bold text-card-foreground flex items-center justify-center text-lg">
                    {size.size}
                  </div>
                  <div className="p-4 flex items-center justify-center gap-2 border-l border-border">
                    <span className="font-bold text-lg text-primary">R${size.priceTradicional.toFixed(0)}</span>
                    <Button
                      onClick={() => handleCustomize(size, 'tradicional')}
                      size="sm"
                      className="text-xs px-3 h-8"
                    >
                      Personalizar
                    </Button>
                  </div>
                  <div className="p-4 flex items-center justify-center gap-2 border-l border-border">
                    <span className="font-bold text-lg text-primary">R${size.priceTrufado.toFixed(0)}</span>
                    <Button
                      onClick={() => handleCustomize(size, 'trufado')}
                      size="sm"
                      className="text-xs px-3 h-8"
                    >
                      Personalizar
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Size Cards with images */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {acaiSizes.map((size) => (
            <Card key={size.id} className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105 border border-border">
              <div className="w-full h-48 bg-muted">
                <img
                  alt={size.label}
                  className="w-full h-full object-cover object-top"
                  src={size.image}
                />
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="text-lg font-bold text-card-foreground">{size.size}</h3>
                <p className="text-sm text-muted-foreground mb-2">{size.description}</p>
                <p className="text-sm text-card-foreground">
                  <span className="font-semibold text-primary">R${size.priceTradicional.toFixed(0)}</span>
                  <span className="text-muted-foreground mx-2">|</span>
                  <span className="font-semibold text-primary">R${size.priceTrufado.toFixed(0)}</span>
                  <span className="text-xs text-muted-foreground ml-1">trufado</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <CustomizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedSize={selectedSize}
        selectedType={selectedType}
        onAddedToCart={() => {
          setIsModalOpen(false);
          onNavigate?.('carrinho');
        }}
      />
    </section>
  );
};

export default MenuSection;
