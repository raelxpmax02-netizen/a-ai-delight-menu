import heroImage from '@/assets/pizza_hero_v2.jpg';

interface HeroBannerProps {
  onNavigate: (section: string) => void;
}

const HeroBanner = ({ onNavigate }: HeroBannerProps) => {
  return (
    <section className="relative pt-14 overflow-hidden">
      <div className="absolute inset-0">
        <img
          alt="Pizza artesanal"
          className="w-full h-full object-cover object-center"
          src={heroImage}
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-20">
        <div className="max-w-lg">
          <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-3">
            Cardápio Digital Profissional
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Sabor artesanal direto do forno
          </h1>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 max-w-md">
            Pizzas preparadas com ingredientes selecionados. Escolha seu sabor, personalize e peça agora.
          </p>
          <button
            onClick={() => onNavigate('cardapio')}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Ver cardápio
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
