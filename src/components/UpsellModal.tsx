import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { extraProducts } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpsellModal = ({ isOpen, onClose }: UpsellModalProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAdd = (product: typeof extraProducts[0]) => {
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
    toast({ title: 'Adicionado!', description: `${product.name} adicionado ao carrinho.` });
  };

  const bebidas = extraProducts.filter(p => p.category === 'Bebidas');
  const sobremesas = extraProducts.filter(p => p.category === 'Sobremesas');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-lg max-h-[80vh] overflow-y-auto rounded-lg p-5">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-card-foreground">
            Que tal adicionar algo mais?
          </DialogTitle>
          <p className="text-xs text-muted-foreground">Aproveite e complete seu pedido</p>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Bebidas */}
          <div>
            <p className="text-xs font-semibold text-card-foreground uppercase tracking-wider mb-3">Bebidas</p>
            <div className="space-y-2">
              {bebidas.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground">{product.name}</p>
                    <p className="text-[11px] text-muted-foreground">{product.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-sm font-semibold text-primary">
                      R${product.price.toFixed(2).replace('.', ',')}
                    </span>
                    <button
                      onClick={() => handleAdd(product)}
                      className="text-[10px] font-semibold text-primary-foreground bg-primary px-3 py-1 rounded-full hover:shadow-md transition-shadow"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sobremesas */}
          <div>
            <p className="text-xs font-semibold text-card-foreground uppercase tracking-wider mb-3">Sobremesas</p>
            <div className="space-y-2">
              {sobremesas.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground">{product.name}</p>
                    <p className="text-[11px] text-muted-foreground">{product.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    {product.originalPrice && (
                      <span className="text-[10px] text-muted-foreground line-through">
                        R${product.originalPrice.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                    <span className="text-sm font-semibold text-primary">
                      R${product.price.toFixed(2).replace('.', ',')}
                    </span>
                    <button
                      onClick={() => handleAdd(product)}
                      className="text-[10px] font-semibold text-primary-foreground bg-primary px-3 py-1 rounded-full hover:shadow-md transition-shadow"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border/40 pt-4 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 rounded-md text-sm">
              Não, obrigado
            </Button>
            <Button onClick={onClose} className="flex-1 rounded-md text-sm">
              Ir para o carrinho
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpsellModal;
