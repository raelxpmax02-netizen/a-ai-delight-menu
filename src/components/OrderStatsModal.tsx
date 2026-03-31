import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Lock, TrendingUp, ShoppingBag, DollarSign, CalendarDays, CalendarRange, Calendar, Check, Trash2, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface OrderStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Order {
  id: string;
  customer_name: string;
  total_price: number;
  items_count: number;
  payment_method: string;
  delivery_type: string;
  status: string;
  created_at: string;
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
  const [orders, setOrders] = useState<Order[]>([]);

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
    if (password === 'teste0101') {
      setAuthenticated(true);
      setError('');
      fetchStats();
    } else {
      setError('Senha incorreta');
    }
  };

  const processStats = (allOrders: Order[]) => {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()).toISOString();

    // Only confirmed orders count for stats
    const confirmed = allOrders.filter(o => o.status === 'confirmado');
    const todayOrders = confirmed.filter(o => o.created_at >= startOfDay);
    const weekOrders = confirmed.filter(o => o.created_at >= startOfWeek);

    setStats({
      today: todayOrders.length,
      week: weekOrders.length,
      month: confirmed.length,
      todayRevenue: todayOrders.reduce((s, o) => s + Number(o.total_price), 0),
      weekRevenue: weekOrders.reduce((s, o) => s + Number(o.total_price), 0),
      monthRevenue: confirmed.reduce((s, o) => s + Number(o.total_price), 0),
      todayItems: todayOrders.reduce((s, o) => s + o.items_count, 0),
      weekItems: weekOrders.reduce((s, o) => s + o.items_count, 0),
      monthItems: confirmed.reduce((s, o) => s + o.items_count, 0),
    });

    // Daily chart (last 7 days) - only confirmed
    const last7 = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - (6 - i));
      return d;
    });

    setDailyData(last7.map(date => {
      const dayStr = date.toISOString().split('T')[0];
      const dayOrders = confirmed.filter(o => o.created_at.startsWith(dayStr));
      return {
        day: date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit' }),
        pedidos: dayOrders.length,
        receita: dayOrders.reduce((s, o) => s + Number(o.total_price), 0),
      };
    }));

    // Payment & delivery distribution - only confirmed
    const paymentMap: Record<string, number> = {};
    confirmed.forEach(o => { paymentMap[o.payment_method] = (paymentMap[o.payment_method] || 0) + 1; });
    setPaymentData(Object.entries(paymentMap).map(([name, value]) => ({ name, value })));

    const deliveryMap: Record<string, number> = {};
    confirmed.forEach(o => {
      const label = o.delivery_type === 'entrega' ? 'Entrega' : 'Retirada';
      deliveryMap[label] = (deliveryMap[label] || 0) + 1;
    });
    setDeliveryData(Object.entries(deliveryMap).map(([name, value]) => ({ name, value })));
  };

  const fetchStats = async () => {
    setLoading(true);
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const { data: allOrders } = await supabase
      .from('orders')
      .select('*')
      .gte('created_at', startOfMonth)
      .order('created_at', { ascending: false });

    if (allOrders) {
      setOrders(allOrders as Order[]);
      processStats(allOrders as Order[]);
    }
    setLoading(false);
  };

  const handleConfirmOrder = async (id: string) => {
    const { error } = await supabase.from('orders').update({ status: 'confirmado' }).eq('id', id);
    if (error) {
      toast.error('Erro ao confirmar pedido');
      return;
    }
    toast.success('Pedido confirmado!');
    const updated = orders.map(o => o.id === id ? { ...o, status: 'confirmado' } : o);
    setOrders(updated);
    processStats(updated);
  };

  const handleCancelOrder = async (id: string) => {
    const { error } = await supabase.from('orders').update({ status: 'cancelado' }).eq('id', id);
    if (error) {
      toast.error('Erro ao cancelar pedido');
      return;
    }
    toast.success('Pedido cancelado');
    const updated = orders.map(o => o.id === id ? { ...o, status: 'cancelado' } : o);
    setOrders(updated);
    processStats(updated);
  };

  const handleDeleteOrder = async (id: string) => {
    // Use update to mark as deleted since we don't have DELETE RLS - we'll set status to 'excluido'
    const { error } = await supabase.from('orders').update({ status: 'excluido' }).eq('id', id);
    if (error) {
      toast.error('Erro ao excluir pedido');
      return;
    }
    toast.success('Pedido excluído');
    const updated = orders.filter(o => o.id !== id);
    setOrders(updated);
    processStats(updated);
  };

  const handleClose = () => {
    setAuthenticated(false);
    setPassword('');
    setError('');
    onClose();
  };

  const formatCurrency = (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`;

  const statusBadge = (status: string) => {
    switch (status) {
      case 'confirmado':
        return <Badge className="bg-green-500/15 text-green-600 border-green-500/30 text-[10px]"><CheckCircle2 className="w-3 h-3 mr-1" />Confirmado</Badge>;
      case 'cancelado':
        return <Badge className="bg-red-500/15 text-red-600 border-red-500/30 text-[10px]"><XCircle className="w-3 h-3 mr-1" />Cancelado</Badge>;
      default:
        return <Badge className="bg-yellow-500/15 text-yellow-600 border-yellow-500/30 text-[10px]"><Clock className="w-3 h-3 mr-1" />Pendente</Badge>;
    }
  };

  const statCards = [
    { label: 'Hoje', orders: stats.today, revenue: stats.todayRevenue, items: stats.todayItems, icon: CalendarDays },
    { label: 'Semana', orders: stats.week, revenue: stats.weekRevenue, items: stats.weekItems, icon: CalendarRange },
    { label: 'Mês', orders: stats.month, revenue: stats.monthRevenue, items: stats.monthItems, icon: Calendar },
  ];

  const pendingOrders = orders.filter(o => o.status === 'pendente');
  const confirmedOrders = orders.filter(o => o.status === 'confirmado');
  const cancelledOrders = orders.filter(o => o.status === 'cancelado');

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
              <Button type="submit" className="w-full">Acessar</Button>
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
              <p className="text-xs text-muted-foreground mt-1">
                📊 Apenas pedidos <strong>confirmados</strong> são contabilizados nas estatísticas
              </p>
            </DialogHeader>

            <Tabs defaultValue="pedidos" className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="pedidos" className="gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Pedidos {pendingOrders.length > 0 && <Badge variant="destructive" className="text-[10px] px-1.5 py-0 ml-1">{pendingOrders.length}</Badge>}
                </TabsTrigger>
                <TabsTrigger value="estatisticas" className="gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Estatísticas
                </TabsTrigger>
              </TabsList>

              {/* Orders Tab */}
              <TabsContent value="pedidos" className="space-y-4 mt-4">
                {/* Pending Orders */}
                {pendingOrders.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-500" />
                      Pendentes ({pendingOrders.length})
                    </h3>
                    {pendingOrders.map(order => (
                      <Card key={order.id} className="border-yellow-500/30 bg-yellow-500/5">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm font-semibold text-card-foreground">{order.customer_name}</p>
                                {statusBadge(order.status)}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {order.items_count} {order.items_count === 1 ? 'item' : 'itens'} • {formatCurrency(Number(order.total_price))} • {order.payment_method} • {order.delivery_type === 'entrega' ? 'Entrega' : 'Retirada'}
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">
                                {new Date(order.created_at).toLocaleString('pt-BR')}
                              </p>
                            </div>
                            <div className="flex gap-1.5 shrink-0">
                              <Button size="sm" variant="outline" className="h-8 px-2 text-green-600 border-green-500/40 hover:bg-green-500/10" onClick={() => handleConfirmOrder(order.id)}>
                                <Check className="w-3.5 h-3.5 mr-1" />
                                <span className="text-xs">Confirmar</span>
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 px-2 text-red-600 border-red-500/40 hover:bg-red-500/10" onClick={() => handleDeleteOrder(order.id)}>
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Confirmed Orders */}
                {confirmedOrders.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Confirmados ({confirmedOrders.length})
                    </h3>
                    {confirmedOrders.map(order => (
                      <Card key={order.id} className="border-green-500/20 bg-green-500/5">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm font-semibold text-card-foreground">{order.customer_name}</p>
                                {statusBadge(order.status)}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {order.items_count} {order.items_count === 1 ? 'item' : 'itens'} • {formatCurrency(Number(order.total_price))} • {order.payment_method}
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">
                                {new Date(order.created_at).toLocaleString('pt-BR')}
                              </p>
                            </div>
                            <div className="flex gap-1.5 shrink-0">
                              <Button size="sm" variant="outline" className="h-8 px-2 text-yellow-600 border-yellow-500/40 hover:bg-yellow-500/10" onClick={() => handleCancelOrder(order.id)}>
                                <XCircle className="w-3.5 h-3.5 mr-1" />
                                <span className="text-xs">Cancelar</span>
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 px-2 text-red-600 border-red-500/40 hover:bg-red-500/10" onClick={() => handleDeleteOrder(order.id)}>
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Cancelled Orders */}
                {cancelledOrders.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      Cancelados ({cancelledOrders.length})
                    </h3>
                    {cancelledOrders.map(order => (
                      <Card key={order.id} className="border-red-500/20 bg-red-500/5 opacity-70">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm font-semibold text-card-foreground">{order.customer_name}</p>
                                {statusBadge(order.status)}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {order.items_count} {order.items_count === 1 ? 'item' : 'itens'} • {formatCurrency(Number(order.total_price))}
                              </p>
                            </div>
                            <Button size="sm" variant="outline" className="h-8 px-2 text-red-600 border-red-500/40 hover:bg-red-500/10 shrink-0" onClick={() => handleDeleteOrder(order.id)}>
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {orders.length === 0 && (
                  <p className="text-center text-muted-foreground text-sm py-8">Nenhum pedido registrado neste mês.</p>
                )}
              </TabsContent>

              {/* Stats Tab */}
              <TabsContent value="estatisticas" className="space-y-4 mt-4">
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

                {/* Bar Chart */}
                <Card className="border-border">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold text-card-foreground mb-4">Pedidos Confirmados por Dia</h3>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={dailyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                        <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(270, 9%, 46%)' }} />
                        <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: 'hsl(270, 9%, 46%)' }} />
                        <Tooltip contentStyle={{ background: 'hsl(0, 0%, 100%)', border: '1px solid hsl(220, 13%, 91%)', borderRadius: '8px', fontSize: 12 }} formatter={(value: number, name: string) => [name === 'receita' ? formatCurrency(value) : value, name === 'receita' ? 'Receita' : 'Pedidos']} />
                        <Bar dataKey="pedidos" fill="hsl(280, 60%, 45%)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Revenue Chart */}
                <Card className="border-border">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold text-card-foreground mb-4">Faturamento Confirmado por Dia</h3>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={dailyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                        <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(270, 9%, 46%)' }} />
                        <YAxis tick={{ fontSize: 11, fill: 'hsl(270, 9%, 46%)' }} />
                        <Tooltip contentStyle={{ background: 'hsl(0, 0%, 100%)', border: '1px solid hsl(220, 13%, 91%)', borderRadius: '8px', fontSize: 12 }} formatter={(value: number) => [formatCurrency(value), 'Receita']} />
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
                              {paymentData.map((_, i) => (<Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />))}
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
                              {deliveryData.map((_, i) => (<Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {stats.month === 0 && (
                  <p className="text-center text-muted-foreground text-sm py-4">Nenhum pedido confirmado neste mês.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderStatsModal;
