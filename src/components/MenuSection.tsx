import { useState } from 'react';
import { motion } from 'framer-motion';
import { pizzaFlavors, PizzaFlavor, extraProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Sparkles, Flame } from 'lucide-react';
import CustomizationModal from './CustomizationModal';
import OrderStatsModal from './OrderStatsModal';

interface MenuSectionProps {
  onNavigate?: (section: string) => void;
}

const MenuSection = ({ onNavigate }: MenuSectionProps) => {
  const [selectedFlavor, setSelectedFlavor] = useState<PizzaFlavor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('todas');

  const handleCustomize = (flavor: PizzaFlavor) => {
    setSelectedFlavor(flavor);
    setIsModalOpen(true);
  };

  const categories = [
    { id: 'todas', label: 'Todas' },
    { id: 'tradicional', label: 'Tradicionais' },
    { id: 'especial', label: 'Especiais' },
    { id: 'premium', label: 'Premium' },
  ];

  const filteredFlavors = activeCategory === 'todas'
    ? pizzaFlavors
    : pizzaFlavors.filter(f => f.category === activeCategory);

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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-6 sm:mb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Escolha sua</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground">
              Pizzas 🍕
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
        </motion.div>

        {/* Promo Banner */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-3 sm:p-4 mb-6 sm:mb-8 flex items-center gap-3"
        >
          <div className="bg-primary/15 rounded-lg p-2 shrink-0">
            <Flame className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-card-foreground">🔥 Promoção do dia!</p>
            <p className="text-xs text-muted-foreground">Descontos especiais em sabores selecionados</p>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Pizza Cards */}
        <div className="space-y-3">
          {filteredFlavors.map((flavor, index) => (
            <motion.div
              key={flavor.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
              whileHover={{ scale: 1.01 }}
            >
              <Card
                className="overflow-hidden border-border/60 hover:border-primary/30 transition-colors cursor-pointer"
                onClick={() => handleCustomize(flavor)}
              >
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 shadow-sm">
                      <img
                        alt={flavor.name}
                        className="w-full h-full object-cover"
                        src={flavor.image}
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-base sm:text-lg font-bold text-card-foreground truncate">{flavor.name}</h3>
                        {flavor.popular && <span className="text-[10px] text-amber-600 font-semibold shrink-0">🔥</span>}
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0 ${
                          flavor.category === 'premium' ? 'bg-amber-100 text-amber-700' :
                          flavor.category === 'especial' ? 'bg-blue-100 text-blue-700' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {flavor.category === 'premium' ? '⭐ Premium' : flavor.category === 'especial' ? 'Especial' : 'Tradicional'}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1 line-clamp-1">{flavor.ingredients.join(' • ')}</p>
                      <div className="flex items-center gap-2">
                        <div>
                          {flavor.originalPrices?.grande && (
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-muted-foreground line-through">
                                R${flavor.originalPrices.grande.toFixed(2).replace('.', ',')}
                              </span>
                              <span className="text-[10px] font-bold text-green-600 bg-green-100 px-1 py-0.5 rounded">
                                -{getDiscount(flavor.originalPrices.grande, flavor.prices.grande)}%
                              </span>
                            </div>
                          )}
                          <span className="font-bold text-primary text-sm sm:text-base">
                            a partir de R${flavor.prices.broto.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1.5 rounded-full whitespace-nowrap shrink-0">
                      Montar Pizza
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Extra Products by Category */}
        {Object.entries(
          extraProducts.reduce((acc, p) => {
            if (!acc[p.category]) acc[p.category] = [];
            acc[p.category].push(p);
            return acc;
          }, {} as Record<string, typeof extraProducts>)
        ).map(([category, products], catIndex) => (
          <div key={category} className="mt-8">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + catIndex * 0.1 }}
              className="text-xl font-bold text-card-foreground mb-4 flex items-center gap-2"
            >
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              {category}
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Card className="overflow-hidden border-border/60 hover:border-primary/30 transition-colors">
                    <CardContent className="p-3 sm:p-4 flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-sm">
                        <img alt={product.name} className="w-full h-full object-cover" src={product.image} loading="lazy" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-card-foreground truncate">{product.name}</p>
                          {product.popular && (
                            <span className="text-[10px] text-amber-600 font-semibold shrink-0">🔥</span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{product.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through block">
                            R${product.originalPrice.toFixed(2).replace('.', ',')}
                          </span>
                        )}
                        <span className="font-bold text-primary">
                          R${product.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <CustomizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedFlavor={selectedFlavor}
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
