import { STORE_NAME, STORE_DESCRIPTION, STORE_DESCRIPTION_2, STORE_HOURS, STORE_ADDRESS, STORE_PHONE, WHATSAPP_NUMBER } from '@/data/products';

const AboutSection = () => {
  return (
    <section id="sobre" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-4">
            Sobre a {STORE_NAME}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg text-muted-foreground mb-4 text-center leading-relaxed">
            {STORE_DESCRIPTION}
          </p>
          <p className="text-lg text-muted-foreground text-center leading-relaxed">
            {STORE_DESCRIPTION_2}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Horários */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-card-foreground mb-2">Horário de Funcionamento</h3>
            <p className="text-sm text-muted-foreground mb-6">Estamos prontos para te atender</p>
            <div className="space-y-3">
              {STORE_HOURS.map((schedule) => (
                <div key={schedule.day} className="flex justify-between text-sm">
                  <span className="text-card-foreground font-medium">{schedule.day}</span>
                  <span className={schedule.hours === 'Fechado' ? 'text-destructive font-medium' : 'text-muted-foreground'}>
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contato */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-card-foreground mb-2">Entre em Contato</h3>
            <p className="text-sm text-muted-foreground mb-6">Estamos aqui para te atender</p>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-card-foreground mb-1">WhatsApp</p>
                <p className="text-sm text-muted-foreground mb-1">Faça seu pedido direto pelo WhatsApp</p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline"
                >
                  {STORE_PHONE}
                </a>
              </div>
              <div>
                <p className="text-sm font-medium text-card-foreground mb-1">Telefone</p>
                <p className="text-sm text-muted-foreground mb-1">Ligue para fazer seu pedido</p>
                <p className="text-primary font-semibold">{STORE_PHONE}</p>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-primary text-primary-foreground text-center py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
              >
                Fazer Pedido Agora
              </a>
            </div>
          </div>

          {/* Localização */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-card-foreground mb-2">Nossa Localização</h3>
            <p className="text-sm text-muted-foreground mb-6">Venha nos visitar</p>
            <div>
              <p className="text-sm font-medium text-card-foreground mb-2">Endereço</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {STORE_ADDRESS.street}
                <br />
                {STORE_ADDRESS.neighborhood}
                <br />
                {STORE_ADDRESS.city}
                <br />
                {STORE_ADDRESS.cep}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
