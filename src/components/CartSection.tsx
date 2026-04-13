import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CartSectionProps {
  onNavigate: (section: string) => void;
}

const CartSection = ({ onNavigate }: CartSectionProps) => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <section id="carrinho" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-4">Seu Carrinho</h2>
            <p className="text-lg text-muted-foreground">Seu carrinho está vazio</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-background rounded-2xl shadow-lg p-12 text-center">
              <CardContent className="p-0">
                <div className="w-24 h-24 flex items-center justify-center bg-muted rounded-full mx-auto mb-6">
                  <ShoppingCart className="w-12 h-12 text-muted-foreground" />
                </div>
                <p className="text-xl text-muted-foreground mb-6">Adicione pizzas ao seu carrinho para continuar</p>
                <Button onClick={() => onNavigate('cardapio')}>Ver Cardápio</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="carrinho" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-4">Seu Carrinho</h2>
          <p className="text-lg text-muted-foreground">
            {items.length} {items.length === 1 ? 'item' : 'itens'} no carrinho
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="bg-background rounded-xl shadow-md overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 shadow-sm">
                    <img src={item.image} alt={item.flavorName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-card-foreground mb-1">{item.sizeLabel}</h3>
                    {item.borda !== 'Sem borda recheada' && (
                      <p className="text-sm text-muted-foreground mb-1">
                        <span className="font-medium">Borda:</span> {item.borda} (+R${item.bordaPrice.toFixed(2).replace('.', ',')})
                      </p>
                    )}
                    {item.adicionais.length > 0 && (
                      <p className="text-sm text-muted-foreground mb-1">
                        <span className="font-medium">Adicionais:</span>{' '}
                        {item.adicionais.map(a => `${a.name} (+R$${a.price.toFixed(2).replace('.', ',')})`).join(', ')}
                      </p>
                    )}
                    {item.observations && (
                      <p className="text-sm text-muted-foreground mb-1">
                        <span className="font-medium">Obs:</span> {item.observations}
                      </p>
                    )}
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1.5">
                        <button onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, item.quantity - 1); }} className="p-1.5 rounded-full bg-muted hover:bg-border transition-colors">
                          <Minus className="w-3.5 h-3.5 text-card-foreground" />
                        </button>
                        <span className="w-6 text-center font-semibold text-card-foreground text-sm">{item.quantity}</span>
                        <button onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, item.quantity + 1); }} className="p-1.5 rounded-full bg-muted hover:bg-border transition-colors">
                          <Plus className="w-3.5 h-3.5 text-card-foreground" />
                        </button>
                      </div>
                      <span className="text-base font-bold text-primary">
                        R$ {(item.totalPrice * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                      <button onClick={(e) => { e.stopPropagation(); removeItem(item.id); }} className="p-1.5 rounded-full bg-destructive/10 hover:bg-destructive/20 transition-colors ml-auto">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-background rounded-xl shadow-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-card-foreground">Total:</span>
                <span className="text-3xl font-bold text-primary">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
              </div>
            </CardContent>
          </Card>

          <Button onClick={() => onNavigate('finalizar')} className="w-full py-4 rounded-xl font-semibold text-lg">
            Finalizar Pedido
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CartSection;
