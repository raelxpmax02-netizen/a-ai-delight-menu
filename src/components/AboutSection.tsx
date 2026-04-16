const AboutSection = () => {
  const features = [
    { title: 'Responsivo', desc: 'Funciona em qualquer dispositivo sem perder qualidade.' },
    { title: 'WhatsApp Integrado', desc: 'Pedidos enviados direto para o WhatsApp do negócio.' },
    { title: 'Relatórios de Vendas', desc: 'Acompanhe pedidos e receita em tempo real.' },
    { title: 'Personalizável', desc: 'Cores, logo, produtos e preços — tudo do seu jeito.' },
    { title: 'Carregamento Rápido', desc: 'Otimizado para velocidade, mesmo em conexões lentas.' },
    { title: 'Painel Seguro', desc: 'Relatórios protegidos por senha de acesso.' },
  ];

  return (
    <section id="sobre" className="py-10 sm:py-14 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.15em] mb-1">Solução</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground">Por que escolher este cardápio?</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-lg">
            Uma solução profissional para transformar o atendimento do seu delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl">
          {features.map((feature) => (
            <div key={feature.title} className="bg-background rounded-lg border border-border/40 p-5">
              <h3 className="text-sm font-semibold text-card-foreground mb-1">{feature.title}</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-primary/5 border border-primary/10 rounded-lg px-6 py-5 max-w-lg">
          <p className="text-sm font-semibold text-card-foreground mb-1">Quer um cardápio como este?</p>
          <p className="text-[11px] text-muted-foreground">Entre em contato e tenha o seu cardápio digital personalizado.</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
