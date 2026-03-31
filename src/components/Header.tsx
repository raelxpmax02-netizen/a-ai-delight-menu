import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Utensils } from 'lucide-react';
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'cardapio', label: 'Cardápio' },
    { id: 'carrinho', label: 'Carrinho' },
    { id: 'finalizar', label: 'Finalizar' },
    { id: 'sobre', label: 'Sobre' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50' : 'bg-black/20 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => onNavigate('cardapio')}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isScrolled ? 'bg-primary/10' : 'bg-white/10'}`}>
              <Utensils className={`w-4 h-4 ${isScrolled ? 'text-primary' : 'text-white'}`} />
            </div>
            <span
              className={`text-lg font-bold transition-colors ${
                isScrolled ? 'text-card-foreground' : 'text-white'
              }`}
            >
              Cardápio Digital
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-primary/10 text-primary'
                    : isScrolled
                      ? 'text-muted-foreground hover:text-card-foreground hover:bg-muted'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
                {item.id === 'carrinho' && totalItems > 0 && (
                  <span className="ml-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full px-1.5 py-0.5">
                    {totalItems}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Mobile: Cart + Menu */}
          <div className="flex items-center gap-2 md:hidden">
            {totalItems > 0 && (
              <button
                onClick={() => onNavigate('carrinho')}
                className={`relative p-2 rounded-lg ${isScrolled ? 'text-card-foreground' : 'text-white'}`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center min-w-[18px] min-h-[18px]">
                  {totalItems}
                </span>
              </button>
            )}
            <button
              className="p-2 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={isScrolled ? 'text-card-foreground' : 'text-white'} />
              ) : (
                <Menu className={isScrolled ? 'text-card-foreground' : 'text-white'} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background rounded-xl shadow-lg p-2 mb-3 border border-border/50">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-card-foreground hover:bg-muted'
                }`}
              >
                {item.label}
                {item.id === 'carrinho' && totalItems > 0 && (
                  <span className="ml-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full px-1.5 py-0.5">
                    {totalItems}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
