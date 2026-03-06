import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Lock, TrendingUp, ShoppingBag, DollarSign, CalendarDays, CalendarRange, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface OrderStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHART_COLORS = [
  'hsl(280, 60%, 45%)',
  'hsl(280, 60%, 60%)',
  'hsl(280, 30%, 70%)',
  'hsl(200, 60%, 50%)',
  'hsl(150, 60%, 45%)',
];

const OrderStatsModal = ({ isOpen, onClose }: OrderStatsModalProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    today: 0, week: 0, month: 0,
    todayRevenue: 0, weekRevenue: 0, monthRevenue: 0,
    todayItems: 0, weekItems: 0, monthItems: 0,
  });
  const [dailyData, setDailyData] = useState<{ day: string; pedidos: number; receita: number }[]>([]);
  const [paymentData, setPaymentData] = useState<{ name: string; value: number }[]>([]);
  const [deliveryData, setDeliveryData] = useState<{ name: string; value: number }[]>([]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'mariah2026') {
      setAuthenticated(true);
      setError('');
      fetchStats();
    } else {
      setError('Senha incorreta');
    }
  };

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

      // Daily chart data (last 7 days)
      const last7 = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(now);
        d.setDate(d.getDate() - (6 - i));
        return d;
      });

      const daily = last7.map(date => {
        const dayStr = date.toISOString().split('T')[0];
        const dayOrders = allOrders.filter(o => o.created_at.startsWith(dayStr));
        return {
          day: date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit' }),
          pedidos: dayOrders.length,
          receita: dayOrders.reduce((s, o) => s + Number(o.total_price), 0),
        };
      });
      setDailyData(daily);

      // Payment method distribution
      const paymentMap: Record<string, number> = {};
      allOrders.forEach(o => {
        paymentMap[o.payment_method] = (paymentMap[o.payment_method] || 0) + 1;
      });
      setPaymentData(Object.entries(paymentMap).map(([name, value]) => ({ name, value })));

      // Delivery type distribution
      const deliveryMap: Record<string, number> = {};
      allOrders.forEach(o => {
        const label = o.delivery_type === 'entrega' ? 'Entrega' : 'Retirada';
        deliveryMap[label] = (deliveryMap[label] || 0) + 1;
      });
      setDeliveryData(Object.entries(deliveryMap).map(([name, value]) => ({ name, value })));
    }
    setLoading(false);
  };

  const handleClose = () => {
    setAuthenticated(false);
    setPassword('');
    setError('');
    onClose();
  };

  const formatCurrency = (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`;

  const statCards = [
    { label: 'Hoje', orders: stats.today, revenue: stats.todayRevenue, items: stats.todayItems, icon: CalendarDays },
    { label: 'Semana', orders: stats.week, revenue: stats.weekRevenue, items: stats.weekItems, icon: CalendarRange },
    { label: 'Mês', orders: stats.month, revenue: stats.monthRevenue, items: stats.monthItems, icon: Calendar },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={`${authenticated ? 'max-w-4xl max-h-[90vh] overflow-y-auto' : 'max-w-sm'}`}>
        {!authenticated ? (
          <div className="py-4">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 justify-center text-card-foreground">
                <Lock className="w-5 h-5 text-primary" />
                Área Restrita
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Digite a senha para acessar os relatórios de pedidos
              </p>
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="text-center"
                autoFocus
              />
              {error && <p className="text-destructive text-sm text-center">{error}</p>}
              <Button type="submit" className="w-full">
                Acessar
              </Button>
            </form>
          </div>
        ) : loading ? (
          <div className="py-20 text-center text-muted-foreground">Carregando dados...</div>
        ) : (
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-card-foreground">
                <TrendingUp className="w-5 h-5 text-primary" />
                Relatório de Pedidos
              </DialogTitle>
            </DialogHeader>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {statCards.map((card) => (
                <Card key={card.label} className="border-border">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <card.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">{card.label}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-card-foreground">{card.orders}</span>
                      <span className="text-xs text-muted-foreground">pedidos</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {formatCurrency(card.revenue)}
                      </span>
                      <span className="flex items-center gap-1">
                        <ShoppingBag className="w-3 h-3" />
                        {card.items} itens
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Bar Chart - Daily Orders */}
            <Card className="border-border">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-card-foreground mb-4">Pedidos por Dia (Últimos 7 dias)</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(270, 9%, 46%)' }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: 'hsl(270, 9%, 46%)' }} />
                    <Tooltip
                      contentStyle={{
                        background: 'hsl(0, 0%, 100%)',
                        border: '1px solid hsl(220, 13%, 91%)',
                        borderRadius: '8px',
                        fontSize: 12,
                      }}
                      formatter={(value: number, name: string) => [
                        name === 'receita' ? formatCurrency(value) : value,
                        name === 'receita' ? 'Receita' : 'Pedidos',
                      ]}
                    />
                    <Bar dataKey="pedidos" fill="hsl(280, 60%, 45%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue Bar Chart */}
            <Card className="border-border">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-card-foreground mb-4">Faturamento por Dia (Últimos 7 dias)</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(270, 9%, 46%)' }} />
                    <YAxis tick={{ fontSize: 11, fill: 'hsl(270, 9%, 46%)' }} />
                    <Tooltip
                      contentStyle={{
                        background: 'hsl(0, 0%, 100%)',
                        border: '1px solid hsl(220, 13%, 91%)',
                        borderRadius: '8px',
                        fontSize: 12,
                      }}
                      formatter={(value: number) => [formatCurrency(value), 'Receita']}
                    />
                    <Bar dataKey="receita" fill="hsl(280, 60%, 60%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pie Charts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paymentData.length > 0 && (
                <Card className="border-border">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold text-card-foreground mb-2">Forma de Pagamento</h3>
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie data={paymentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={65} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                          {paymentData.map((_, i) => (
                            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
              {deliveryData.length > 0 && (
                <Card className="border-border">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold text-card-foreground mb-2">Tipo de Entrega</h3>
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie data={deliveryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={65} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                          {deliveryData.map((_, i) => (
                            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
            </div>

            {stats.month === 0 && (
              <p className="text-center text-muted-foreground text-sm py-4">
                Nenhum pedido registrado ainda neste mês.
              </p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderStatsModal;
