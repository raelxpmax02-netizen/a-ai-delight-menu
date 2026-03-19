import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { STORE_NAME } from '@/data/products';
import { Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, CalendarRange, Calendar, TrendingUp, ShoppingBag, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OrderStats {
  today: number;
  week: number;
  month: number;
  todayRevenue: number;
  weekRevenue: number;
  monthRevenue: number;
  todayItems: number;
  weekItems: number;
  monthItems: number;
}

const Admin = () => {
  const [stats, setStats] = useState<OrderStats>({
    today: 0, week: 0, month: 0,
    todayRevenue: 0, weekRevenue: 0, monthRevenue: 0,
    todayItems: 0, weekItems: 0, monthItems: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchStats = async () => {
    setLoading(true);
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()).toISOString();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const { data: allOrders } = await supabase
      .from('orders')
      .select('*')
      .gte('created_at', startOfMonth)
      .order('created_at', { ascending: false });

    if (allOrders) {
      // Only count confirmed orders for stats
      const confirmedOrders = allOrders.filter(o => (o as any).status === 'confirmado');
      const todayConfirmed = confirmedOrders.filter(o => o.created_at >= startOfDay);
      const weekConfirmed = confirmedOrders.filter(o => o.created_at >= startOfWeek);

      setStats({
        today: todayConfirmed.length,
        week: weekConfirmed.length,
        month: confirmedOrders.length,
        todayRevenue: todayConfirmed.reduce((s, o) => s + Number(o.total_price), 0),
        weekRevenue: weekConfirmed.reduce((s, o) => s + Number(o.total_price), 0),
        monthRevenue: confirmedOrders.reduce((s, o) => s + Number(o.total_price), 0),
        todayItems: todayConfirmed.reduce((s, o) => s + o.items_count, 0),
        weekItems: weekConfirmed.reduce((s, o) => s + o.items_count, 0),
        monthItems: confirmedOrders.reduce((s, o) => s + o.items_count, 0),
      });

      setRecentOrders(allOrders.slice(0, 20));
    }
    setLoading(false);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus } as any)
      .eq('id', orderId);

    if (error) {
      toast({ title: 'Erro', description: 'Não foi possível atualizar o pedido.', variant: 'destructive' });
      return;
    }

    toast({
      title: newStatus === 'confirmado' ? '✅ Pedido confirmado!' : '❌ Pedido cancelado',
      description: newStatus === 'confirmado' ? 'O pedido agora conta nas estatísticas.' : 'O pedido foi removido das estatísticas.',
    });

    fetchStats();
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) =>
    `R$ ${value.toFixed(2).replace('.', ',')}`;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmado':
        return <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700"><CheckCircle className="w-3 h-3" /> Confirmado</span>;
      case 'cancelado':
        return <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-red-100 text-red-700"><XCircle className="w-3 h-3" /> Cancelado</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700"><Clock className="w-3 h-3" /> Pendente</span>;
    }
  };

  const pendingOrders = recentOrders.filter(o => !o.status || o.status === 'pendente');
  const otherOrders = recentOrders.filter(o => o.status && o.status !== 'pendente');

  const statCards = [
    { label: 'Pedidos Hoje', value: stats.today, icon: CalendarDays, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pedidos na Semana', value: stats.week, icon: CalendarRange, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pedidos no Mês', value: stats.month, icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Faturamento Hoje', value: formatCurrency(stats.todayRevenue), icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Faturamento Semana', value: formatCurrency(stats.weekRevenue), icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Faturamento Mês', value: formatCurrency(stats.monthRevenue), icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Itens Hoje', value: stats.todayItems, icon: ShoppingBag, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Itens Semana', value: stats.weekItems, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Itens Mês', value: stats.monthItems, icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="container mx-auto flex items-center gap-4">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-card-foreground">{STORE_NAME}</h1>
            <p className="text-sm text-muted-foreground">Painel de Pedidos</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Carregando...</div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {statCards.map((card) => (
                <Card key={card.label} className="border border-border">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${card.bg}`}>
                      <card.icon className={`w-6 h-6 ${card.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{card.label}</p>
                      <p className="text-2xl font-bold text-card-foreground">{card.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pending Orders */}
            {pendingOrders.length > 0 && (
              <Card className="border-2 border-yellow-300">
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold text-card-foreground mb-1 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    Pedidos Pendentes ({pendingOrders.length})
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">Confirme quando o cliente enviar a mensagem no WhatsApp</p>
                  <div className="space-y-3">
                    {pendingOrders.map((order) => (
                      <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-card-foreground">{order.customer_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(order.created_at)} • {order.items_count} itens • {formatCurrency(Number(order.total_price))}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {order.delivery_type === 'entrega' ? '🛵 Entrega' : '🏪 Retirada'} • {order.payment_method}
                          </p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => updateOrderStatus(order.id, 'confirmado')}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" /> Confirmar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() => updateOrderStatus(order.id, 'cancelado')}
                          >
                            <XCircle className="w-4 h-4 mr-1" /> Cancelar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Orders */}
            <Card className="border border-border">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-card-foreground mb-4">Histórico de Pedidos</h2>
                {recentOrders.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Nenhum pedido registrado ainda.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-muted-foreground">
                          <th className="text-left py-3 px-2">Cliente</th>
                          <th className="text-left py-3 px-2">Data</th>
                          <th className="text-center py-3 px-2">Itens</th>
                          <th className="text-left py-3 px-2">Status</th>
                          <th className="text-left py-3 px-2">Tipo</th>
                          <th className="text-right py-3 px-2">Total</th>
                          <th className="text-center py-3 px-2">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-border/50 hover:bg-muted/50">
                            <td className="py-3 px-2 font-medium text-card-foreground">{order.customer_name}</td>
                            <td className="py-3 px-2 text-muted-foreground">{formatDate(order.created_at)}</td>
                            <td className="py-3 px-2 text-center text-card-foreground">{order.items_count}</td>
                            <td className="py-3 px-2">{getStatusBadge(order.status || 'pendente')}</td>
                            <td className="py-3 px-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${order.delivery_type === 'entrega' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                {order.delivery_type === 'entrega' ? '🛵 Entrega' : '🏪 Retirada'}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-right font-bold text-primary">{formatCurrency(Number(order.total_price))}</td>
                            <td className="py-3 px-2 text-center">
                              {(!order.status || order.status === 'pendente') && (
                                <div className="flex gap-1 justify-center">
                                  <button
                                    onClick={() => updateOrderStatus(order.id, 'confirmado')}
                                    className="p-1 rounded hover:bg-green-100 text-green-600 transition-colors"
                                    title="Confirmar"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => updateOrderStatus(order.id, 'cancelado')}
                                    className="p-1 rounded hover:bg-red-100 text-red-600 transition-colors"
                                    title="Cancelar"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
};

export default Admin;
