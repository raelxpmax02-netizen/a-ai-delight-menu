import { STORE_NAME } from '@/data/products';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/40 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-sm font-semibold text-card-foreground">{STORE_NAME}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Cardápio digital profissional para delivery.
            </p>
          </div>
          <p className="text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} — Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
