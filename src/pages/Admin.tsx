import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { STORE_NAME } from '@/data/products';
import { Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, CalendarRange, Calendar, TrendingUp, ShoppingBag, DollarSign } from 'lucide-react';

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
      const todayOrders = allOrders.filter(o => o.created_at >= startOfDay);
      const weekOrders = allOrders.filter(o => o.created_at >= startOfWeek);

      setStats({
        today: todayOrders.length,
        week: weekOrders.length,
        month: allOrders.length,
        todayRevenue: todayOrders.reduce((s, o) => s + Number(o.total_price), 0),
        weekRevenue: weekOrders.reduce((s, o) => s + Number(o.total_price), 0),
        monthRevenue: allOrders.reduce((s, o) => s + Number(o.total_price), 0),
        todayItems: todayOrders.reduce((s, o) => s + o.items_count, 0),
        weekItems: weekOrders.reduce((s, o) => s + o.items_count, 0),
        monthItems: allOrders.reduce((s, o) => s + o.items_count, 0),
      });

      setRecentOrders(allOrders.slice(0, 10));
    }
    setLoading(false);
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

            {/* Recent Orders */}
            <Card className="border border-border">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-card-foreground mb-4">Últimos Pedidos</h2>
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
                          <th className="text-left py-3 px-2">Tipo</th>
                          <th className="text-left py-3 px-2">Pagamento</th>
                          <th className="text-right py-3 px-2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-border/50 hover:bg-muted/50">
                            <td className="py-3 px-2 font-medium text-card-foreground">{order.customer_name}</td>
                            <td className="py-3 px-2 text-muted-foreground">{formatDate(order.created_at)}</td>
                            <td className="py-3 px-2 text-center text-card-foreground">{order.items_count}</td>
                            <td className="py-3 px-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${order.delivery_type === 'entrega' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                {order.delivery_type === 'entrega' ? '🛵 Entrega' : '🏪 Retirada'}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-muted-foreground">{order.payment_method}</td>
                            <td className="py-3 px-2 text-right font-bold text-primary">{formatCurrency(Number(order.total_price))}</td>
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
