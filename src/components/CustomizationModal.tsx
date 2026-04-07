import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { PizzaFlavor, PizzaSize, pizzaSizes, bordas, adicionais } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFlavor: PizzaFlavor | null;
  onAddedToCart?: () => void;
}

const CustomizationModal = ({ isOpen, onClose, selectedFlavor, onAddedToCart }: CustomizationModalProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('grande');
  const [selectedBorda, setSelectedBorda] = useState<string>('Sem borda recheada');
  const [selectedAdicionais, setSelectedAdicionais] = useState<string[]>([]);
  const [observations, setObservations] = useState('');
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setSelectedSize('grande');
      setSelectedBorda('Sem borda recheada');
      setSelectedAdicionais([]);
      setObservations('');
    }
  }, [isOpen]);

  if (!selectedFlavor) return null;

  const sizeData = pizzaSizes.find(s => s.id === selectedSize)!;
  const basePrice = selectedFlavor.prices[selectedSize as keyof typeof selectedFlavor.prices];
  const bordaItem = bordas.find(b => b.name === selectedBorda)!;

  const toggleAdicional = (name: string) => {
    setSelectedAdicionais(prev =>
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  const adicionaisTotal = selectedAdicionais.reduce((sum, name) => {
    const item = adicionais.find(a => a.name === name);
    return sum + (item?.price || 0);
  }, 0);

  const totalPrice = basePrice + bordaItem.price + adicionaisTotal;

  const handleAddToCart = () => {
    const selectedAdicionaisItems = selectedAdicionais.map(name => {
      const item = adicionais.find(a => a.name === name)!;
      return { name: item.name, price: item.price };
    });

    addItem({
      flavorId: selectedFlavor.id,
      flavorName: selectedFlavor.name,
      size: selectedSize,
      sizeLabel: `Pizza ${selectedFlavor.name} (${sizeData.label})`,
      basePrice,
      borda: selectedBorda,
      bordaPrice: bordaItem.price,
      adicionais: selectedAdicionaisItems,
      observations,
      quantity: 1,
      totalPrice,
    });

    toast({
      title: 'Adicionado ao carrinho! 🍕',
      description: `Pizza ${selectedFlavor.name} ${sizeData.label} foi adicionada.`,
    });

    if (onAddedToCart) {
      onAddedToCart();
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-lg max-h-[85vh] overflow-y-auto rounded-xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-card-foreground">
            Pizza {selectedFlavor.name}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{selectedFlavor.ingredients.join(' • ')}</p>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Size Selection */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-2 text-sm sm:text-base">
              Tamanho <span className="text-destructive">*</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {pizzaSizes.map((size) => (
                <div
                  key={size.id}
                  className={`flex flex-col items-center p-2 sm:p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedSize === size.id
                      ? 'bg-primary/10 border-primary'
                      : 'bg-background border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedSize(size.id)}
                >
                  <span className="text-card-foreground text-sm font-semibold">{size.label}</span>
                  <span className="text-[10px] text-muted-foreground">{size.slices} • {size.serves}</span>
                  <span className="text-primary font-bold text-sm mt-1">
                    R$ {selectedFlavor.prices[size.id as keyof typeof selectedFlavor.prices].toFixed(2).replace('.', ',')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Borda Selection */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-2 text-sm sm:text-base">
              Borda
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {bordas.map((borda) => (
                <div
                  key={borda.name}
                  className={`flex items-center justify-between p-2 sm:p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedBorda === borda.name
                      ? 'bg-primary/10 border-primary'
                      : 'bg-background border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedBorda(borda.name)}
                >
                  <span className="text-card-foreground text-xs sm:text-sm font-medium">{borda.name}</span>
                  {borda.price > 0 && (
                    <span className="text-primary text-xs font-semibold">+R$ {borda.price.toFixed(2).replace('.', ',')}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Adicionais */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-2 text-sm sm:text-base">
              Adicionais <span className="text-muted-foreground font-normal">(opcional)</span>
            </h3>
            <div className="space-y-2">
              {adicionais.map((adicional) => (
                <div
                  key={adicional.name}
                  className={`flex items-center justify-between p-2 sm:p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedAdicionais.includes(adicional.name)
                      ? 'bg-primary/10 border-primary'
                      : 'bg-background border-border hover:border-primary/50'
                  }`}
                  onClick={() => toggleAdicional(adicional.name)}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedAdicionais.includes(adicional.name)}
                      onCheckedChange={() => {}}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="text-card-foreground text-xs sm:text-sm font-medium pointer-events-none">
                      {adicional.name}
                      {'popular' in adicional && adicional.popular && (
                        <span className="ml-2 text-[10px] text-amber-600 font-semibold">🔥 Popular</span>
                      )}
                    </span>
                  </div>
                  <span className="text-primary font-semibold text-xs sm:text-sm shrink-0 ml-2">
                    +R$ {adicional.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Observations */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-2 text-sm sm:text-base">
              Observações <span className="text-muted-foreground font-normal">(opcional)</span>
            </h3>
            <Textarea
              placeholder="Ex: Tirar cebola, bem assada..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="resize-none"
              rows={2}
            />
          </div>

          {/* Total and Add to Cart */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-base sm:text-lg font-semibold text-card-foreground">Total:</span>
              <span className="text-xl sm:text-2xl font-bold text-primary">
                R$ {totalPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <Button
              onClick={handleAddToCart}
              className="w-full py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg"
            >
              Adicionar ao Carrinho 🍕
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizationModal;
