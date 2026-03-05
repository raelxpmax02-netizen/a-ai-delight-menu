import { WHATSAPP_NUMBER, STORE_NAME } from '@/data/products';
import heroImage from '@/assets/foto_03.jpg';

interface HeroProps {
  onNavigate: (section: string) => void;
}

const Hero = ({ onNavigate }: HeroProps) => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          alt="Açaí Capixaba"
          className="w-full h-full object-cover object-center"
          src={heroImage}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white w-full">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {STORE_NAME}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
          Açaí cremoso, fresquinho e montado do jeitinho que você gosta
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => onNavigate('cardapio')}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-all transform hover:scale-105 whitespace-nowrap shadow-xl"
          >
            Ver Cardápio
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
