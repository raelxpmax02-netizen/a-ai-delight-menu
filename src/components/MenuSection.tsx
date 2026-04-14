import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { pizzaFlavors, PizzaFlavor, extraProducts } from '@/data/products';
import { Card, CardContent } from '@/components/ui/card';
import CustomizationModal from './CustomizationModal';
import OrderStatsModal from './OrderStatsModal';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface MenuSectionProps {
  onNavigate?: (section: string) => void;
}

const MenuSection = ({ onNavigate }: MenuSectionProps) => {
  const [selectedFlavor, setSelectedFlavor] = useState<PizzaFlavor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddExtra = (product: typeof extraProducts[0]) => {
    addItem({
      flavorId: product.id,
      flavorName: product.name,
      image: product.image,
      size: '',
      sizeLabel: product.name,
      basePrice: product.price,
      borda: '',
      bordaPrice: 0,
      adicionais: [],
      observations: '',
      quantity: 1,
      totalPrice: product.price,
    });
    toast({
      title: 'Adicionado ao carrinho',
      description: `${product.name} adicionado.`,
    });
  };

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

  const filteredFlavors = pizzaFlavors.filter(f => {
    const matchCategory = activeCategory === 'todas' || f.category === activeCategory;
    const matchSearch = searchQuery === '' || 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <section id="cardapio" className="py-10 sm:py-14 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-1">Cardápio</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground">Nossas Pizzas</h2>
          </div>
          <button
            onClick={() => setIsStatsOpen(true)}
            className="text-xs text-muted-foreground hover:text-primary transition-colors underline underline-offset-2"
          >
            Relatório
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar pizza ou ingrediente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-card-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Pizza Cards */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredFlavors.map((flavor, index) => (
              <motion.div
                key={flavor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                layout
              >
                <Card
                  className="overflow-hidden border-border/50 hover:border-primary/30 transition-all cursor-pointer group"
                  onClick={() => handleCustomize(flavor)}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3 p-3">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 shadow-sm">
                        <img
                          alt={flavor.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          src={flavor.image}
                          loading="lazy"
                          width={800}
                          height={800}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-sm sm:text-base font-semibold text-card-foreground truncate">{flavor.name}</h3>
                          {flavor.popular && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium shrink-0">
                              Popular
                            </span>
                          )}
                          {flavor.category === 'premium' && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-medium shrink-0">
                              Premium
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground mb-2 line-clamp-1">{flavor.ingredients.join(' · ')}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            {flavor.originalPrices?.broto && (
                              <span className="text-[10px] text-muted-foreground line-through">
                                R${flavor.originalPrices.broto.toFixed(2).replace('.', ',')}
                              </span>
                            )}
                            <span className="font-semibold text-primary text-sm">
                              a partir de R${flavor.prices.broto.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                          <span className="text-[11px] sm:text-xs font-semibold text-primary-foreground bg-primary px-3 py-1 rounded-full group-hover:shadow-md transition-shadow">
                            Pedir Pizza
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredFlavors.length === 0 && (
            <p className="text-center text-muted-foreground py-8 text-sm">
              Nenhuma pizza encontrada para "{searchQuery}"
            </p>
          )}
        </div>

        {/* Extra Products */}
        {Object.entries(
          extraProducts.reduce((acc, p) => {
            if (!acc[p.category]) acc[p.category] = [];
            acc[p.category].push(p);
            return acc;
          }, {} as Record<string, typeof extraProducts>)
        ).map(([category, products]) => (
          <div key={category} className="mt-10">
            <h3 className="text-lg font-bold text-card-foreground mb-4">{category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden border-border/50">
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                      <img alt={product.name} className="w-full h-full object-cover" src={product.image} loading="lazy" width={400} height={400} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-card-foreground truncate">{product.name}</p>
                      <p className="text-[11px] text-muted-foreground">{product.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      {product.originalPrice && (
                        <span className="text-[10px] text-muted-foreground line-through block">
                          R${product.originalPrice.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                      <span className="font-semibold text-primary text-sm">
                        R${product.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
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
