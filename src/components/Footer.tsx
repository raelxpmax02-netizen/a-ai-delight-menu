const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary to-purple-700 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <span className="text-xl font-bold">Cardápio Digital</span>
            <p className="text-purple-50 text-sm mt-3 max-w-md">
              Solução completa para açaíterias e deliveries. Cardápio personalizado, pedidos via WhatsApp, relatórios de vendas e muito mais.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Funcionalidades</h3>
            <ul className="space-y-2 text-purple-50 text-sm">
              <li>✅ Cardápio digital responsivo</li>
              <li>✅ Personalização de produtos</li>
              <li>✅ Pedidos via WhatsApp</li>
              <li>✅ Relatório de vendas</li>
              <li>✅ Promoções do dia</li>
              <li>✅ 100% personalizável</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-500 mt-8 pt-6 text-center text-purple-50 text-sm">
          <p>© 2025 Cardápio Digital — Portfólio de demonstração</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
