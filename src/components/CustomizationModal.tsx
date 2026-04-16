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
import { PizzaFlavor, pizzaFlavors, pizzaSizes, bordas, adicionais } from '@/data/products';
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
  const [selectedBorda, setSelectedBorda] = useState<string>('Sem adicional de borda');
  const [selectedAdicionais, setSelectedAdicionais] = useState<string[]>([]);
  const [observations, setObservations] = useState('');
  const [isHalfHalf, setIsHalfHalf] = useState(false);
  const [secondFlavor, setSecondFlavor] = useState<PizzaFlavor | null>(null);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setSelectedSize('grande');
      setSelectedBorda('Sem adicional de borda');
      setSelectedAdicionais([]);
      setObservations('');
      setIsHalfHalf(false);
      setSecondFlavor(null);
    }
  }, [isOpen]);

  if (!selectedFlavor) return null;

  const sizeData = pizzaSizes.find(s => s.id === selectedSize)!;
  const basePrice = selectedFlavor.prices[selectedSize as keyof typeof selectedFlavor.prices];
  const secondPrice = secondFlavor ? secondFlavor.prices[selectedSize as keyof typeof secondFlavor.prices] : 0;
  const halfHalfPrice = isHalfHalf && secondFlavor ? Math.max(basePrice, secondPrice) : basePrice;
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

  const totalPrice = halfHalfPrice + bordaItem.price + adicionaisTotal;

  const availableSecondFlavors = pizzaFlavors.filter(f => f.id !== selectedFlavor.id);

  const handleAddToCart = () => {
    const selectedAdicionaisItems = selectedAdicionais.map(name => {
      const item = adicionais.find(a => a.name === name)!;
      return { name: item.name, price: item.price };
    });

    const flavorName = isHalfHalf && secondFlavor
      ? `${selectedFlavor.name} / ${secondFlavor.name}`
      : selectedFlavor.name;

    addItem({
      flavorId: selectedFlavor.id,
      flavorName,
      image: selectedFlavor.image,
      size: selectedSize,
      sizeLabel: `${flavorName} (${sizeData.label})`,
      basePrice: halfHalfPrice,
      borda: selectedBorda,
      bordaPrice: bordaItem.price,
      adicionais: selectedAdicionaisItems,
      observations,
      quantity: 1,
      totalPrice,
    });

    toast({
      title: 'Adicionado ao carrinho',
      description: `${flavorName} ${sizeData.label} adicionado.`,
    });

    if (onAddedToCart) {
      onAddedToCart();
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-lg max-h-[85vh] overflow-y-auto rounded-lg p-5">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-card-foreground">
            {selectedFlavor.name}
          </DialogTitle>
          <p className="text-[11px] text-muted-foreground">{selectedFlavor.ingredients.join(' · ')}</p>
        </DialogHeader>

        <div className="space-y-5 pt-1">
          {/* Half-and-half toggle */}
          <div>
            <button
              onClick={() => {
                setIsHalfHalf(!isHalfHalf);
                if (isHalfHalf) setSecondFlavor(null);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                isHalfHalf
                  ? 'border-primary/40 bg-primary/5'
                  : 'border-border hover:border-primary/20'
              }`}
            >
              <div className="text-left">
                <span className="text-xs font-semibold text-card-foreground block">Meio a Meio</span>
                <span className="text-[10px] text-muted-foreground">Escolha dois sabores</span>
              </div>
              <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full ${
                isHalfHalf ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {isHalfHalf ? 'Ativado' : 'Ativar'}
              </span>
            </button>

            {isHalfHalf && (
              <div className="mt-3 space-y-2 max-h-40 overflow-y-auto pr-1">
                <p className="text-[11px] text-muted-foreground mb-1">Escolha o segundo sabor:</p>
                {availableSecondFlavors.map((flavor) => (
                  <button
                    key={flavor.id}
                    onClick={() => setSecondFlavor(flavor)}
                    className={`w-full flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
                      secondFlavor?.id === flavor.id
                        ? 'border-primary/40 bg-primary/5'
                        : 'border-border/50 hover:border-primary/20'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-md overflow-hidden shrink-0">
                      <img src={flavor.image} alt={flavor.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-medium text-card-foreground block truncate">{flavor.name}</span>
                      <span className="text-[10px] text-muted-foreground">
                        R${flavor.prices[selectedSize as keyof typeof flavor.prices].toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    {secondFlavor?.id === flavor.id && (
                      <span className="text-[10px] text-primary font-medium shrink-0">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Size */}
          <div>
            <p className="text-xs font-semibold text-card-foreground mb-2">Tamanho</p>
            <div className="grid grid-cols-2 gap-2">
              {pizzaSizes.map((size) => (
                <button
                  key={size.id}
                  className={`flex flex-col items-center p-2.5 rounded-lg border text-center transition-all ${
                    selectedSize === size.id
                      ? 'border-primary/40 bg-primary/5'
                      : 'border-border hover:border-primary/20'
                  }`}
                  onClick={() => setSelectedSize(size.id)}
                >
                  <span className="text-xs font-medium text-card-foreground">{size.label}</span>
                  <span className="text-[10px] text-muted-foreground">{size.slices} · {size.serves}</span>
                  <span className="text-primary font-bold text-sm mt-1">
                    R${selectedFlavor.prices[size.id as keyof typeof selectedFlavor.prices].toFixed(2).replace('.', ',')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Borda */}
          <div>
            <p className="text-xs font-semibold text-card-foreground mb-2">Borda</p>
            <div className="grid grid-cols-2 gap-2">
              {bordas.map((borda) => (
                <button
                  key={borda.name}
                  className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-all ${
                    selectedBorda === borda.name
                      ? 'border-primary/40 bg-primary/5'
                      : 'border-border hover:border-primary/20'
                  }`}
                  onClick={() => setSelectedBorda(borda.name)}
                >
                  <span className="text-xs text-card-foreground">{borda.name}</span>
                  {borda.price > 0 && (
                    <span className="text-primary text-[10px] font-medium ml-1">+R${borda.price.toFixed(2).replace('.', ',')}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Adicionais */}
          <div>
            <p className="text-xs font-semibold text-card-foreground mb-2">
              Adicionais <span className="text-muted-foreground font-normal">(opcional)</span>
            </p>
            <div className="space-y-1.5">
              {adicionais.map((adicional) => (
                <button
                  key={adicional.name}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                    selectedAdicionais.includes(adicional.name)
                      ? 'border-primary/40 bg-primary/5'
                      : 'border-border hover:border-primary/20'
                  }`}
                  onClick={() => toggleAdicional(adicional.name)}
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedAdicionais.includes(adicional.name)}
                      onCheckedChange={() => {}}
                      className="pointer-events-none"
                    />
                    <span className="text-xs text-card-foreground">{adicional.name}</span>
                  </div>
                  <span className="text-primary text-[10px] font-medium">
                    +R${adicional.price.toFixed(2).replace('.', ',')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Obs */}
          <div>
            <p className="text-xs font-semibold text-card-foreground mb-2">
              Observações <span className="text-muted-foreground font-normal">(opcional)</span>
            </p>
            <Textarea
              placeholder="Ex: Sem cebola, bem passado..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="resize-none text-sm"
              rows={2}
            />
          </div>

          {/* Total */}
          <div className="border-t border-border/40 pt-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-card-foreground">Total</span>
              <span className="text-lg font-bold text-primary">
                R${totalPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={isHalfHalf && !secondFlavor}
              className="w-full py-3 rounded-lg font-semibold text-sm"
            >
              {isHalfHalf && !secondFlavor ? 'Escolha o segundo sabor' : 'Adicionar ao carrinho'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizationModal;
