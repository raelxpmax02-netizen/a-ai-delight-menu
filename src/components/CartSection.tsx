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
            <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-4">
              Seu Carrinho
            </h2>
            <p className="text-lg text-muted-foreground">Seu carrinho está vazio</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <CardContent className="p-0">
                <div className="w-24 h-24 flex items-center justify-center bg-muted rounded-full mx-auto mb-6">
                  <ShoppingCart className="w-12 h-12 text-muted-foreground" />
                </div>
                <p className="text-xl text-muted-foreground mb-6">
                  Adicione itens ao seu carrinho para continuar
                </p>
                <Button
                  onClick={() => onNavigate('cardapio')}
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                >
                  Ver Cardápio
                </Button>
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
          <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-4">
            Seu Carrinho
          </h2>
          <p className="text-lg text-muted-foreground">
            {items.length} {items.length === 1 ? 'item' : 'itens'} no carrinho
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-card-foreground mb-2">
                      {item.sizeLabel}
                    </h3>
                    
                    {item.freeComplements.length > 0 && (
                      <p className="text-sm text-muted-foreground mb-1">
                        <span className="font-medium">Complementos:</span>{' '}
                        {item.freeComplements.join(', ')}
                      </p>
                    )}
                    
                    {item.paidComplements.length > 0 && (
                      <p className="text-sm text-muted-foreground mb-1">
                        <span className="font-medium">Extras:</span>{' '}
                        {item.paidComplements.join(', ')} (+R$ {(item.paidComplements.length * 2).toFixed(2).replace('.', ',')})
                      </p>
                    )}
                    
                    {item.sauce && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Calda:</span> {item.sauce}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 rounded-full bg-muted hover:bg-border transition-colors"
                      >
                        <Minus className="w-4 h-4 text-card-foreground" />
                      </button>
                      <span className="w-8 text-center font-semibold text-card-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 rounded-full bg-muted hover:bg-border transition-colors"
                      >
                        <Plus className="w-4 h-4 text-card-foreground" />
                      </button>
                    </div>

                    <span className="text-xl font-bold text-primary min-w-[100px] text-right">
                      R$ {(item.totalPrice * item.quantity).toFixed(2).replace('.', ',')}
                    </span>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 rounded-full bg-destructive/10 hover:bg-destructive/20 transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Total */}
          <Card className="bg-white rounded-xl shadow-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-card-foreground">Total:</span>
                <span className="text-3xl font-bold text-primary">
                  R$ {totalPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={() => onNavigate('finalizar')}
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold hover:bg-teal-700 transition-colors text-lg"
          >
            Finalizar Pedido
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CartSection;
