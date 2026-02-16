import { useState } from 'react';
import { ShoppingCart, X, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

interface FloatingCartProps {
  onNavigate: (section: string) => void;
}

const FloatingCart = ({ onNavigate }: FloatingCartProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCart();

  if (totalItems === 0) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
      >
        <ShoppingCart className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setIsOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold text-foreground">Seu Carrinho ({totalItems})</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="bg-muted rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-foreground">{item.sizeLabel}</h3>
                    <button onClick={() => removeItem(item.id)} className="p-1 text-destructive hover:bg-destructive/10 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {item.fruit && (
                    <p className="text-xs text-muted-foreground">Fruta: {item.fruit}</p>
                  )}
                  {item.freeComplements.length > 0 && (
                    <p className="text-xs text-muted-foreground">Complementos: {item.freeComplements.join(', ')}</p>
                  )}
                  {item.adicionais.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Adicionais: {item.adicionais.map(a => a.name).join(', ')}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full bg-background hover:bg-border">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full bg-background hover:bg-border">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-bold text-primary">
                      R$ {(item.totalPrice * item.quantity).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-foreground">Total:</span>
                <span className="text-xl font-bold text-primary">
                  R$ {totalPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <Button
                onClick={() => { setIsOpen(false); onNavigate('finalizar'); }}
                className="w-full py-3 rounded-xl font-semibold"
              >
                Finalizar Pedido
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FloatingCart;
