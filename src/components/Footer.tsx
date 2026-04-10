const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/40 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-sm font-semibold text-card-foreground">Cardápio Digital</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Sistema completo de pedidos para pizzarias e deliveries.
            </p>
          </div>
          <p className="text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} — Demonstração de portfólio
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
