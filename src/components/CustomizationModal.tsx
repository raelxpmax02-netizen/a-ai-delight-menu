import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { AcaiSize, AcaiType, fruits, freeComplements, adicionais } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSize: AcaiSize | null;
  selectedType: AcaiType;
  onAddedToCart?: () => void;
}

const CustomizationModal = ({ isOpen, onClose, selectedSize, selectedType, onAddedToCart }: CustomizationModalProps) => {
  const [selectedFruit, setSelectedFruit] = useState<string>('');
  const [selectedComplements, setSelectedComplements] = useState<string[]>([]);
  const [selectedAdicionais, setSelectedAdicionais] = useState<string[]>([]);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setSelectedFruit('');
      setSelectedComplements([]);
      setSelectedAdicionais([]);
    }
  }, [isOpen]);

  if (!selectedSize) return null;

  const basePrice = selectedType === 'trufado' ? selectedSize.priceTrufado : selectedSize.priceTradicional;

  // Só o div pai controla o toggle — o Checkbox é visual apenas (onCheckedChange vazio + stopPropagation)
  const toggleComplement = (complement: string) => {
    if (selectedComplements.includes(complement)) {
      setSelectedComplements(prev => prev.filter(c => c !== complement));
    } else if (selectedComplements.length < 2) {
      setSelectedComplements(prev => [...prev, complement]);
    } else {
      toast({
        title: 'Limite atingido',
        description: 'Você pode escolher no máximo 2 complementos.',
        variant: 'destructive',
      });
    }
  };

  const toggleAdicional = (name: string) => {
    setSelectedAdicionais(prev =>
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  const adicionaisTotal = selectedAdicionais.reduce((sum, name) => {
    const item = adicionais.find(a => a.name === name);
    return sum + (item?.price || 0);
  }, 0);

  const totalPrice = basePrice + adicionaisTotal;

  const handleAddToCart = () => {
    const selectedAdicionaisItems = selectedAdicionais.map(name => {
      const item = adicionais.find(a => a.name === name)!;
      return { name: item.name, price: item.price };
    });

    addItem({
      size: selectedSize.id,
      sizeLabel: `${selectedSize.label} ${selectedType === 'trufado' ? '(Trufado)' : '(Tradicional)'}`,
      type: selectedType,
      basePrice,
      fruit: selectedFruit,
      freeComplements: selectedComplements,
      adicionais: selectedAdicionaisItems,
      quantity: 1,
      totalPrice,
    });

    toast({
      title: 'Adicionado ao carrinho!',
      description: `${selectedSize.label} ${selectedType === 'trufado' ? 'Trufado' : 'Tradicional'} foi adicionado.`,
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
            {selectedSize.label} — {selectedType === 'trufado' ? 'Trufado' : 'Tradicional'}
          </DialogTitle>
          <p className="text-primary font-semibold text-base sm:text-lg">
            R$ {basePrice.toFixed(2).replace('.', ',')}
          </p>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Fruit selection */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-2 text-sm sm:text-base">
              Fruta <span className="text-muted-foreground font-normal">(escolha 1)</span>
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {fruits.map((fruit) => (
                <div
                  key={fruit}
                  className={`flex items-center justify-center p-2 sm:p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedFruit === fruit
                      ? 'bg-primary/10 border-primary'
                      : 'bg-background border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedFruit(fruit)}
                >
                  <span className="text-card-foreground text-center text-xs sm:text-sm font-medium">{fruit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Complements */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-1 text-sm sm:text-base">
              Complementos{' '}
              <span className="text-muted-foreground font-normal">
                (até 2) — {selectedComplements.length}/2
              </span>
            </h3>
            <p className="text-xs text-muted-foreground mb-2">Leite condensado já incluso</p>
            <div className="grid grid-cols-2 gap-2">
              {freeComplements.map((complement) => (
                <div
                  key={complement}
                  className={`flex items-center space-x-2 p-2 sm:p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedComplements.includes(complement)
                      ? 'bg-primary/10 border-primary'
                      : 'bg-background border-border hover:border-primary/50'
                  }`}
                  onClick={() => toggleComplement(complement)}
                >
                  <Checkbox
                    checked={selectedComplements.includes(complement)}
                    onCheckedChange={() => {}}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="text-card-foreground text-xs sm:text-sm pointer-events-none">{complement}</span>
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
                    <div>
                      <span className="text-card-foreground text-xs sm:text-sm font-medium pointer-events-none">{adicional.name}</span>
                      {adicional.description && (
                        <p className="text-xs text-muted-foreground">{adicional.description}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-primary font-semibold text-xs sm:text-sm shrink-0 ml-2">
                    +R$ {adicional.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              ))}
            </div>
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
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizationModal;
