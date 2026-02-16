import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AcaiSize, AcaiType, fruits, freeComplements, adicionais } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSize: AcaiSize | null;
  selectedType: AcaiType;
}

const CustomizationModal = ({ isOpen, onClose, selectedSize, selectedType }: CustomizationModalProps) => {
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
    if (selectedAdicionais.includes(name)) {
      setSelectedAdicionais(prev => prev.filter(a => a !== name));
    } else {
      setSelectedAdicionais(prev => [...prev, name]);
    }
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

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-card-foreground">
            {selectedSize.label} — {selectedType === 'trufado' ? 'Trufado' : 'Tradicional'}
          </DialogTitle>
          <p className="text-primary font-semibold text-lg">
            R$ {basePrice.toFixed(2).replace('.', ',')}
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Fruit selection */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-3">
              Fruta <span className="text-muted-foreground font-normal">(escolha 1)</span>
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {fruits.map((fruit) => (
                <div
                  key={fruit}
                  className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedFruit === fruit
                      ? 'bg-primary/10 border-primary'
                      : 'bg-background border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedFruit(fruit)}
                >
                  <Label className="cursor-pointer text-card-foreground text-center">{fruit}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Complements */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-1">
              Complementos{' '}
              <span className="text-muted-foreground font-normal">
                (escolha até 2) — {selectedComplements.length}/2
              </span>
            </h3>
            <p className="text-xs text-muted-foreground mb-3">Leite condensado já incluso</p>
            <div className="grid grid-cols-2 gap-2">
              {freeComplements.map((complement) => (
                <div
                  key={complement}
                  className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
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
                  <Label className="cursor-pointer text-card-foreground text-sm">{complement}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Adicionais */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-3">
              Adicionais <span className="text-muted-foreground font-normal">(opcional)</span>
            </h3>
            <div className="space-y-2">
              {adicionais.map((adicional) => (
                <div
                  key={adicional.name}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
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
                      <Label className="cursor-pointer text-card-foreground">{adicional.name}</Label>
                      {adicional.description && (
                        <p className="text-xs text-muted-foreground">{adicional.description}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-primary font-semibold text-sm">
                    +R$ {adicional.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total and Add to Cart */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-card-foreground">Total:</span>
              <span className="text-2xl font-bold text-primary">
                R$ {totalPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <Button
              onClick={handleAddToCart}
              className="w-full py-4 rounded-lg font-semibold text-lg"
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
