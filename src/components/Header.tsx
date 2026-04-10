import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface HeaderProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

const Header = ({ onNavigate, activeSection }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'cardapio', label: 'Cardápio' },
    { id: 'combos', label: 'Combos' },
    { id: 'horarios', label: 'Horários' },
    { id: 'sobre', label: 'Sobre' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border/40'
          : 'bg-black/20 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <button
            onClick={() => onNavigate('inicio')}
            className={`text-base font-bold tracking-tight transition-colors ${
              isScrolled ? 'text-card-foreground' : 'text-white'
            }`}
          >
            Sua Pizzaria
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? isScrolled ? 'text-primary' : 'text-white'
                    : isScrolled
                      ? 'text-muted-foreground hover:text-card-foreground'
                      : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            {totalItems > 0 && (
              <button
                onClick={() => onNavigate('carrinho')}
                className={`relative ml-2 p-2 rounded-md transition-colors ${
                  isScrolled ? 'text-card-foreground hover:bg-muted' : 'text-white hover:bg-white/10'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </button>
            )}
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            {totalItems > 0 && (
              <button
                onClick={() => onNavigate('carrinho')}
                className={`relative p-2 ${isScrolled ? 'text-card-foreground' : 'text-white'}`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </button>
            )}
            <button className="p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen
                ? <X className={`w-5 h-5 ${isScrolled ? 'text-card-foreground' : 'text-white'}`} />
                : <Menu className={`w-5 h-5 ${isScrolled ? 'text-card-foreground' : 'text-white'}`} />
              }
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-background rounded-lg shadow-lg p-1.5 mb-3 border border-border/40">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left py-2.5 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.id ? 'text-primary bg-primary/5' : 'text-card-foreground hover:bg-muted'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
