import { motion } from 'framer-motion';
import { combos } from '@/data/combos';
import { Card, CardContent } from '@/components/ui/card';

const CombosSection = () => {
  return (
    <section className="py-10 sm:py-14 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-1">Economize</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground">Combos</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {combos.map((combo, index) => {
            const discount = Math.round(((combo.originalPrice - combo.price) / combo.originalPrice) * 100);
            return (
              <motion.div
                key={combo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
              >
                <Card className="overflow-hidden border-border/50 hover:shadow-md transition-shadow h-full">
                  <div className="relative">
                    <img
                      alt={combo.name}
                      className="w-full h-40 object-cover"
                      src={combo.image}
                      loading="lazy"
                      width={800}
                      height={800}
                    />
                    <span className="absolute top-2 right-2 text-[10px] font-semibold bg-primary text-primary-foreground px-2 py-0.5 rounded">
                      -{discount}%
                    </span>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-base font-semibold text-card-foreground mb-1">{combo.name}</h3>
                    <p className="text-[11px] text-muted-foreground mb-3">{combo.description}</p>
                    <ul className="space-y-1 mb-4">
                      {combo.items.map((item, i) => (
                        <li key={i} className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-end justify-between pt-3 border-t border-border/40">
                      <div>
                        <span className="text-xs text-muted-foreground line-through block">
                          R${combo.originalPrice.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-lg font-bold text-primary">
                          R${combo.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CombosSection;
