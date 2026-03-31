import { STORE_NAME } from '@/data/products';
import heroImage from '@/assets/foto_03.jpg';
import { Sparkles, Rocket } from 'lucide-react';

interface HeroBannerProps {
  onNavigate: (section: string) => void;
}

const HeroBanner = ({ onNavigate }: HeroBannerProps) => {
  return (
    <section className="relative pt-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          alt="Açaí"
          className="w-full h-full object-cover object-center"
          src={heroImage}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-10 sm:py-14">
        <div className="flex flex-col items-center sm:items-start gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary-foreground px-3 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-white/90">Cardápio Digital Profissional</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Personalize seu Cardápio
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-md">
            Sistema completo de pedidos via WhatsApp, personalização de produtos e relatórios de vendas ✨
          </p>
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => onNavigate('cardapio')}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <Rocket className="w-4 h-4" />
              Ver demonstração
            </button>
            <button
              onClick={() => onNavigate('sobre')}
              className="text-white/70 text-sm hover:text-white transition-colors underline underline-offset-2"
            >
              Saiba mais
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
