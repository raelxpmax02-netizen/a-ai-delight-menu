import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { WHATSAPP_NUMBER, STORE_NAME } from '@/data/products';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface CheckoutSectionProps {
  onNavigate: (section: string) => void;
}

const CheckoutSection = ({ onNavigate }: CheckoutSectionProps) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryType, setDeliveryType] = useState('');
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();

  const isEmpty = items.length === 0;

  const handleSendWhatsApp = async () => {
    if (!name.trim()) {
      toast({ title: 'Nome obrigatório', description: 'Por favor, informe seu nome.', variant: 'destructive' });
      return;
    }
    if (!address.trim() && deliveryType === 'entrega') {
      toast({ title: 'Endereço obrigatório', description: 'Por favor, informe seu endereço de entrega.', variant: 'destructive' });
      return;
    }
    if (!paymentMethod) {
      toast({ title: 'Forma de pagamento obrigatória', description: 'Por favor, selecione a forma de pagamento.', variant: 'destructive' });
      return;
    }
    if (!deliveryType) {
      toast({ title: 'Entrega ou retirada?', description: 'Por favor, selecione entrega ou retirada.', variant: 'destructive' });
      return;
    }

    let message = `*PEDIDO — ${STORE_NAME.toUpperCase()}*\n\n`;
    message += `*Cliente:* ${name.trim()}\n`;
    message += `*Tipo:* ${deliveryType === 'entrega' ? 'Entrega' : 'Retirada no local'}\n`;
    if (deliveryType === 'entrega') {
      message += `*Endereço:* ${address.trim()}\n`;
    }
    message += `*Pagamento:* ${paymentMethod}\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*ITENS DO PEDIDO:*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;

    items.forEach((item, index) => {
      message += `*${index + 1}. ${item.sizeLabel}* (x${item.quantity})\n`;
      if (item.borda && item.borda !== 'Sem adicional de borda') {
        message += `   Borda: ${item.borda}\n`;
      }
      if (item.adicionais.length > 0) {
        message += `   Adicionais: ${item.adicionais.map(a => `${a.name} (+R$${a.price.toFixed(2).replace('.', ',')})`).join(', ')}\n`;
      }
      if (item.observations) {
        message += `   Obs: ${item.observations}\n`;
      }
      message += `   R$ ${(item.totalPrice * item.quantity).toFixed(2).replace('.', ',')}\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*TOTAL: R$ ${totalPrice.toFixed(2).replace('.', ',')}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    await supabase.from('orders').insert({
      customer_name: name.trim(),
      items_count: items.reduce((sum, item) => sum + item.quantity, 0),
      total_price: totalPrice,
      delivery_type: deliveryType,
      payment_method: paymentMethod,
    });

    toast({ title: 'Pedido enviado!', description: 'Seu pedido foi enviado para o WhatsApp.' });
    clearCart();
    setName('');
    setAddress('');
    setPaymentMethod('');
    setDeliveryType('');
  };

  return (
    <section id="finalizar" className="py-14 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.15em] mb-1">Checkout</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground">Finalizar Pedido</h2>
          <p className="text-sm text-muted-foreground mt-1">Preencha seus dados para enviar via WhatsApp</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {isEmpty && (
            <Card className="border border-border/50">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground mb-3">Seu carrinho está vazio.</p>
                <Button variant="outline" onClick={() => onNavigate('cardapio')} className="text-sm">Ver Cardápio</Button>
              </CardContent>
            </Card>
          )}
          <Card className="border border-border/50">
            <CardContent className="p-5 space-y-5">
              <div>
                <Label htmlFor="name" className="text-card-foreground text-xs font-medium">Seu Nome *</Label>
                <Input id="name" placeholder="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
              </div>

              <div>
                <Label className="text-card-foreground text-xs font-medium block mb-2">Entrega ou Retirada? *</Label>
                <RadioGroup value={deliveryType} onValueChange={setDeliveryType} className="flex gap-3">
                  <label htmlFor="entrega" className={`flex-1 flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${deliveryType === 'entrega' ? 'bg-primary/5 border-primary/40' : 'border-border hover:border-primary/20'}`}>
                    <RadioGroupItem value="entrega" id="entrega" />
                    <span className="cursor-pointer text-sm text-card-foreground">Entrega</span>
                  </label>
                  <label htmlFor="retirada" className={`flex-1 flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${deliveryType === 'retirada' ? 'bg-primary/5 border-primary/40' : 'border-border hover:border-primary/20'}`}>
                    <RadioGroupItem value="retirada" id="retirada" />
                    <span className="cursor-pointer text-sm text-card-foreground">Retirada</span>
                  </label>
                </RadioGroup>
              </div>

              {deliveryType === 'entrega' && (
                <div>
                  <Label htmlFor="address" className="text-card-foreground text-xs font-medium">Endereço *</Label>
                  <Input id="address" placeholder="Rua, número, bairro" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1.5" />
                </div>
              )}

              <div>
                <Label className="text-card-foreground text-xs font-medium block mb-2">Pagamento *</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-2">
                  {['Dinheiro', 'Pix', 'Crédito', 'Débito'].map((method) => (
                    <label
                      key={method}
                      htmlFor={`pay-${method}`}
                      className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-all ${paymentMethod === method ? 'bg-primary/5 border-primary/40' : 'border-border hover:border-primary/20'}`}
                    >
                      <RadioGroupItem value={method} id={`pay-${method}`} />
                      <span className="cursor-pointer text-card-foreground text-sm">{method}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border border-border/50">
            <CardContent className="p-5">
              <h3 className="text-sm font-bold text-card-foreground mb-3">Resumo</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.quantity}x {item.sizeLabel}
                    </span>
                    <span className="font-medium text-card-foreground">
                      R$ {(item.totalPrice * item.quantity).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
                <div className="border-t border-border/40 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-card-foreground">Total</span>
                    <span className="text-xl font-bold text-primary">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleSendWhatsApp}
            disabled={isEmpty}
            className="w-full py-3.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2.5 bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Enviar Pedido via WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSection;
