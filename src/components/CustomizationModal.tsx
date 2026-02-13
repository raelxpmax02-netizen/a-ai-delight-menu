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
import { AcaiSize, freeComplements, paidComplements, sauces } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSize: AcaiSize | null;
}

const CustomizationModal = ({ isOpen, onClose, selectedSize }: CustomizationModalProps) => {
  const [selectedFreeComplements, setSelectedFreeComplements] = useState<string[]>([]);
  const [selectedPaidComplements, setSelectedPaidComplements] = useState<string[]>([]);
  const [selectedSauce, setSelectedSauce] = useState<string>('');
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setSelectedFreeComplements([]);
      setSelectedPaidComplements([]);
      setSelectedSauce('');
    }
  }, [isOpen]);

  if (!selectedSize) return null;

  const toggleFreeComplement = (complement: string) => {
    if (selectedFreeComplements.includes(complement)) {
      setSelectedFreeComplements(prev => prev.filter(c => c !== complement));
    } else if (selectedFreeComplements.length < 3) {
      setSelectedFreeComplements(prev => [...prev, complement]);
    } else {
      toast({
        title: 'Limite atingido',
        description: 'Você pode escolher no máximo 3 complementos gratuitos.',
        variant: 'destructive',
      });
    }
  };

  const togglePaidComplement = (complement: string) => {
    if (selectedPaidComplements.includes(complement)) {
      setSelectedPaidComplements(prev => prev.filter(c => c !== complement));
    } else {
      setSelectedPaidComplements(prev => [...prev, complement]);
    }
  };

  const paidComplementsTotal = selectedPaidComplements.length * 2;
  const totalPrice = selectedSize.price + paidComplementsTotal;

  const handleAddToCart = () => {
    addItem({
      size: selectedSize.id,
      sizeLabel: selectedSize.label,
      basePrice: selectedSize.price,
      freeComplements: selectedFreeComplements,
      paidComplements: selectedPaidComplements,
      sauce: selectedSauce,
      quantity: 1,
      totalPrice,
    });

    toast({
      title: 'Adicionado ao carrinho!',
      description: `${selectedSize.label} foi adicionado ao seu carrinho.`,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-card-foreground">
            Personalize seu {selectedSize.label}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Free Complements */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-3">
              Complementos Gratuitos{' '}
              <span className="text-muted-foreground font-normal">
                (escolha até 3) - {selectedFreeComplements.length}/3
              </span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {freeComplements.map((complement) => (
                <div
                  key={complement}
                  className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedFreeComplements.includes(complement)
                      ? 'bg-purple-50 border-primary'
                      : 'bg-white border-border hover:border-primary/50'
                  }`}
                  onClick={() => toggleFreeComplement(complement)}
                >
                  <Checkbox
                    checked={selectedFreeComplements.includes(complement)}
                    onCheckedChange={() => toggleFreeComplement(complement)}
                  />
                  <Label className="cursor-pointer text-card-foreground">{complement}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Paid Complements */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-3">
              Complementos Pagos{' '}
              <span className="text-primary font-normal">(+R$ 2,00 cada)</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {paidComplements.map((complement) => (
                <div
                  key={complement.name}
                  className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedPaidComplements.includes(complement.name)
                      ? 'bg-purple-50 border-primary'
                      : 'bg-white border-border hover:border-primary/50'
                  }`}
                  onClick={() => togglePaidComplement(complement.name)}
                >
                  <Checkbox
                    checked={selectedPaidComplements.includes(complement.name)}
                    onCheckedChange={() => togglePaidComplement(complement.name)}
                  />
                  <Label className="cursor-pointer text-card-foreground">{complement.name}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Sauces */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-3">
              Calda{' '}
              <span className="text-muted-foreground font-normal">(escolha 1 grátis)</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {sauces.map((sauce) => (
                <div
                  key={sauce}
                  className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedSauce === sauce
                      ? 'bg-purple-50 border-primary'
                      : 'bg-white border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedSauce(sauce)}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedSauce === sauce ? 'border-primary' : 'border-border'
                    }`}
                  >
                    {selectedSauce === sauce && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <Label className="cursor-pointer text-card-foreground">{sauce}</Label>
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
              className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-lg"
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
