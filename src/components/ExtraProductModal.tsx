import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExtraProduct } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ExtraProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ExtraProduct | null;
}

const ExtraProductModal = ({ isOpen, onClose, product }: ExtraProductModalProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  if (!product) return null;

  const handleAdd = () => {
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
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-sm rounded-lg p-0 overflow-hidden">
        <div className="w-full aspect-video overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-5 space-y-3">
          <DialogHeader className="p-0">
            <DialogTitle className="text-lg font-bold text-card-foreground">{product.name}</DialogTitle>
            <p className="text-xs text-muted-foreground">{product.description}</p>
          </DialogHeader>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
              {product.category}
            </span>
            {product.popular && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                Popular
              </span>
            )}
          </div>

          <div className="border-t border-border/40 pt-3 flex items-center justify-between">
            <div>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through mr-2">
                  R${product.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
              <span className="text-xl font-bold text-primary">
                R${product.price.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <Button onClick={handleAdd} className="rounded-md font-semibold text-sm px-6">
              Adicionar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExtraProductModal;
