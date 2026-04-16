import { STORE_NAME } from '@/data/products';

const heroImage = '/images/pizza_hero_v2.jpg';

interface HeroBannerProps {
  onNavigate: (section: string) => void;
}

const HeroBanner = ({ onNavigate }: HeroBannerProps) => {
  return (
    <section className="relative pt-14 overflow-hidden">
      <div className="absolute inset-0">
        <img
          alt="Delivery premium"
          className="w-full h-full object-cover object-center"
          src={heroImage}
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-lg">
          <p className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">
            {STORE_NAME}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.1] mb-4">
            Peça rápido,
            <br />receba em casa.
          </h1>
          <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
            Escolha seus favoritos, personalize e finalize pelo WhatsApp. Simples e rápido.
          </p>
          <button
            onClick={() => onNavigate('cardapio')}
            className="bg-primary text-primary-foreground px-7 py-3 rounded-lg text-sm font-semibold hover:brightness-110 transition-all"
          >
            Ver cardápio
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
