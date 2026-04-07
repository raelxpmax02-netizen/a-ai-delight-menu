import { Smartphone, MessageSquare, BarChart3, Palette, Zap, Shield } from 'lucide-react';

const features = [
  { icon: Smartphone, title: 'Responsivo', desc: 'Funciona perfeitamente em celular, tablet e desktop.' },
  { icon: MessageSquare, title: 'WhatsApp Integrado', desc: 'Pedidos enviados direto para o WhatsApp da pizzaria.' },
  { icon: BarChart3, title: 'Relatórios', desc: 'Acompanhe vendas, pedidos confirmados e receita em tempo real.' },
  { icon: Palette, title: 'Personalizável', desc: 'Cores, logo, produtos e preços — tudo do seu jeito.' },
  { icon: Zap, title: 'Rápido', desc: 'Cardápio carrega instantaneamente, sem travamentos.' },
  { icon: Shield, title: 'Seguro', desc: 'Painel de relatórios protegido por senha.' },
];

const AboutSection = () => {
  return (
    <section id="sobre" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-4">
            Por que escolher este cardápio?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Uma solução profissional e completa para transformar o atendimento da sua pizzaria ou delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature) => (
            <div key={feature.title} className="bg-background rounded-2xl shadow-sm border border-border/50 p-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-block bg-primary/10 border border-primary/20 rounded-2xl px-8 py-6">
            <p className="text-lg font-bold text-card-foreground mb-1">Quer um cardápio como este para sua pizzaria? 🍕</p>
            <p className="text-sm text-muted-foreground">Entre em contato e tenha o seu cardápio digital personalizado!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
