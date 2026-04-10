import { motion } from 'framer-motion';
import { Clock, MapPin, Phone } from 'lucide-react';
import { STORE_HOURS, STORE_ADDRESS, STORE_PHONE } from '@/data/products';

const OperatingHours = () => {
  const now = new Date();
  const dayIndex = now.getDay();
  const dayMap = [6, 0, 1, 2, 3, 4, 5]; // Sun=6, Mon=0...
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
    <section className="py-8 sm:py-12 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Funcionamento</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground">
            Horários & Localização 📍
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-muted/50 rounded-xl p-5 border border-border/60"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-2.5 h-2.5 rounded-full ${open ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className={`text-sm font-semibold ${open ? 'text-green-600' : 'text-red-500'}`}>
                {open ? 'Aberto agora' : 'Fechado agora'}
              </span>
            </div>
            <div className="space-y-2">
              {STORE_HOURS.map((item, i) => (
                <div
                  key={item.day}
                  className={`flex justify-between items-center py-2 px-3 rounded-lg text-sm ${
                    i === todayIndex
                      ? 'bg-primary/10 border border-primary/20 font-semibold text-card-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  <span>{item.day}</span>
                  <span className="font-mono text-xs">{item.hours}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Location & Contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="bg-muted/50 rounded-xl p-5 border border-border/60">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-card-foreground">Endereço</span>
              </div>
              <p className="text-sm text-muted-foreground">{STORE_ADDRESS.street}</p>
              <p className="text-sm text-muted-foreground">{STORE_ADDRESS.neighborhood}</p>
              <p className="text-sm text-muted-foreground">{STORE_ADDRESS.city}</p>
              <p className="text-xs text-muted-foreground mt-1">{STORE_ADDRESS.cep}</p>
            </div>

            <div className="bg-muted/50 rounded-xl p-5 border border-border/60">
              <div className="flex items-center gap-2 mb-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-card-foreground">Contato</span>
              </div>
              <p className="text-sm text-muted-foreground">{STORE_PHONE}</p>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-5 border border-primary/20">
              <p className="text-sm font-semibold text-card-foreground mb-1">🛵 Taxa de entrega</p>
              <p className="text-xs text-muted-foreground">Consulte no momento do pedido. Entrega para toda a região!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OperatingHours;
