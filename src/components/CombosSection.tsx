import { motion } from 'framer-motion';
import { combos } from '@/data/combos';
import { Card, CardContent } from '@/components/ui/card';
import { Gift, Percent } from 'lucide-react';

const CombosSection = () => {
  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-2 mb-1">
            <Gift className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Economize mais</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground">
            Combos Promocionais 🎉
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Monte seu combo e economize até 25%</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {combos.map((combo, index) => {
            const discount = Math.round(((combo.originalPrice - combo.price) / combo.originalPrice) * 100);
            return (
              <motion.div
                key={combo.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <Card className="overflow-hidden border-border/60 hover:border-primary/40 transition-all hover:shadow-lg h-full">
                  <div className="relative">
                    <img
                      alt={combo.name}
                      className="w-full h-40 sm:h-48 object-cover"
                      src={combo.image}
                      loading="lazy"
                      width={800}
                      height={800}
                    />
                    <div className="absolute top-2 left-2 flex gap-1.5">
                      {combo.badge && (
                        <span className="text-[10px] font-bold bg-card/90 backdrop-blur-sm text-card-foreground px-2 py-1 rounded-full">
                          {combo.badge}
                        </span>
                      )}
                      <span className="text-[10px] font-bold bg-green-500 text-white px-2 py-1 rounded-full flex items-center gap-0.5">
                        <Percent className="w-3 h-3" />
                        -{discount}%
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-card-foreground mb-1">{combo.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{combo.description}</p>
                    <ul className="space-y-1 mb-4">
                      {combo.items.map((item, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-xs text-muted-foreground line-through block">
                          R${combo.originalPrice.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-xl font-bold text-primary">
                          R${combo.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        Economize R${(combo.originalPrice - combo.price).toFixed(2).replace('.', ',')}
                      </span>
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
