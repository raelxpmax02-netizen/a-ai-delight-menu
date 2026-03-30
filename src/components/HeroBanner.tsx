import { STORE_NAME } from '@/data/products';
import logoImage from '@/assets/logo.jpg';
import heroImage from '@/assets/foto_03.jpg';

interface HeroBannerProps {
  onNavigate: (section: string) => void;
}

const HeroBanner = ({ onNavigate }: HeroBannerProps) => {
  return (
    <section className="relative pt-20 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          alt="Açaí"
          className="w-full h-full object-cover object-center"
          src={heroImage}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <img
            alt={STORE_NAME}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/30 shadow-lg object-cover"
            src={logoImage}
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              {STORE_NAME}
            </h1>
            <p className="text-white/80 text-sm sm:text-base mt-1">
              Açaí cremoso, fresquinho e feito do seu jeito ✨
            </p>
            <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
              <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 text-xs font-medium px-2.5 py-1 rounded-full border border-green-500/30">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Aberto agora
              </span>
              <span className="text-white/60 text-xs">•</span>
              <button
                onClick={() => onNavigate('sobre')}
                className="text-white/60 text-xs hover:text-white transition-colors underline underline-offset-2"
              >
                Ver horários
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
