import { motion } from 'framer-motion';
import { STORE_HOURS, STORE_ADDRESS, STORE_PHONE } from '@/data/products';

const OperatingHours = () => {
  const now = new Date();
  const dayIndex = now.getDay();
  const dayMap = [6, 0, 1, 2, 3, 4, 5];
  const todayIndex = dayMap[dayIndex];

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;

  const isOpen = () => {
    const today = STORE_HOURS[todayIndex];
    if (!today) return false;
    const [open, close] = today.hours.split(' - ');
    const [oh, om] = open.split(':').map(Number);
    const [ch, cm] = close.split(':').map(Number);
    const openMin = oh * 60 + om;
    let closeMin = ch * 60 + cm;
    if (closeMin === 0) closeMin = 24 * 60;
    return currentTime >= openMin && currentTime < closeMin;
  };

  const open = isOpen();

  return (
    <section className="py-10 sm:py-14 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.15em] mb-1">Informações</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground">Horários & Contato</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-muted/40 rounded-lg p-5 border border-border/40"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-2 h-2 rounded-full ${open ? 'bg-[hsl(152,55%,42%)]' : 'bg-destructive'}`} />
              <span className={`text-xs font-medium ${open ? 'text-[hsl(152,55%,42%)]' : 'text-destructive'}`}>
                {open ? 'Aberto agora' : 'Fechado'}
              </span>
            </div>
            <div className="space-y-1">
              {STORE_HOURS.map((item, i) => (
                <div
                  key={item.day}
                  className={`flex justify-between py-2 px-3 rounded text-sm ${
                    i === todayIndex
                      ? 'bg-primary/5 font-medium text-card-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  <span className="text-xs">{item.day}</span>
                  <span className="text-xs font-mono">{item.hours}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-3"
          >
            <div className="bg-muted/40 rounded-lg p-5 border border-border/40">
              <p className="text-xs font-medium text-card-foreground mb-2">Endereço</p>
              <p className="text-sm text-muted-foreground">{STORE_ADDRESS.street}</p>
              <p className="text-sm text-muted-foreground">{STORE_ADDRESS.neighborhood} — {STORE_ADDRESS.city}</p>
              <p className="text-xs text-muted-foreground mt-1">{STORE_ADDRESS.cep}</p>
            </div>

            <div className="bg-muted/40 rounded-lg p-5 border border-border/40">
              <p className="text-xs font-medium text-card-foreground mb-2">Telefone</p>
              <p className="text-sm text-muted-foreground">{STORE_PHONE}</p>
            </div>

            <div className="bg-primary/5 rounded-lg p-5 border border-primary/10">
              <p className="text-xs font-medium text-card-foreground mb-1">Entrega</p>
              <p className="text-[11px] text-muted-foreground">Taxa consultada no momento do pedido. Atendemos toda a região.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OperatingHours;
