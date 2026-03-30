import { useState } from 'react';
import { acaiSizes, AcaiSize, AcaiType } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Sparkles, ChevronRight } from 'lucide-react';
import CustomizationModal from './CustomizationModal';
import OrderStatsModal from './OrderStatsModal';

interface MenuSectionProps {
  onNavigate?: (section: string) => void;
}

const MenuSection = ({ onNavigate }: MenuSectionProps) => {
  const [selectedSize, setSelectedSize] = useState<AcaiSize | null>(null);
  const [selectedType, setSelectedType] = useState<AcaiType>('tradicional');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  const handleCustomize = (size: AcaiSize, type: AcaiType) => {
    setSelectedSize(size);
    setSelectedType(type);
    setIsModalOpen(true);
  };

  const getDiscount = (original: number | undefined, current: number) => {
    if (original && original > current) {
      return Math.round(((original - current) / original) * 100);
    }
    return 0;
  };

  return (
    <section id="cardapio" className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Monte o seu</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground">
              Cardápio
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsStatsOpen(true)}
            className="text-muted-foreground hover:text-primary gap-1.5"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Relatório</span>
          </Button>
        </div>

        {/* Promo Banner */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-3 sm:p-4 mb-6 sm:mb-8 flex items-center gap-3">
          <div className="bg-primary/15 rounded-lg p-2 shrink-0">
            <span className="text-lg">🔥</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-card-foreground">Promoção do dia!</p>
            <p className="text-xs text-muted-foreground">Descontos especiais em tamanhos selecionados</p>
          </div>
        </div>

        {/* Product Cards */}
        <div className="space-y-4">
          {acaiSizes.map((size) => (
            <Card key={size.id} className="overflow-hidden border-border/60 hover:border-primary/30 transition-colors">
              <CardContent className="p-0">
                {/* Size Header */}
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-muted/80 to-transparent border-b border-border/40">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 shadow-sm">
                    <img
                      alt={size.label}
                      className="w-full h-full object-cover"
                      src={size.image}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-card-foreground">{size.size}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{size.description}</p>
                  </div>
                </div>

                {/* Type Options */}
                <div className="divide-y divide-border/40">
                  {/* Tradicional */}
                  <div
                    className="flex items-center justify-between p-3 sm:p-4 cursor-pointer hover:bg-muted/30 transition-colors group"
                    onClick={() => handleCustomize(size, 'tradicional')}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm sm:text-base font-semibold text-card-foreground">Tradicional</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      <div className="text-right">
                        {size.originalTradicional && size.originalTradicional > size.priceTradicional && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-muted-foreground line-through">
                              R${size.originalTradicional.toFixed(2).replace('.', ',')}
                            </span>
                            <span className="text-[10px] font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">
                              -{getDiscount(size.originalTradicional, size.priceTradicional)}%
                            </span>
                          </div>
                        )}
                        <span className="font-bold text-base sm:text-lg text-primary">
                          R${size.priceTradicional.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>

                  {/* Trufado */}
                  <div
                    className="flex items-center justify-between p-3 sm:p-4 cursor-pointer hover:bg-muted/30 transition-colors group"
                    onClick={() => handleCustomize(size, 'trufado')}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm sm:text-base font-semibold text-card-foreground">Trufado</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">creme de avelã • creme de ninho</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      <div className="text-right">
                        {size.originalTrufado && size.originalTrufado > size.priceTrufado && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-muted-foreground line-through">
                              R${size.originalTrufado.toFixed(2).replace('.', ',')}
                            </span>
                            <span className="text-[10px] font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">
                              -{getDiscount(size.originalTrufado, size.priceTrufado)}%
                            </span>
                          </div>
                        )}
                        <span className="font-bold text-base sm:text-lg text-primary">
                          R${size.priceTrufado.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </div>
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
      <OrderStatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
      />
    </section>
  );
};

export default MenuSection;
