import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import MenuSection from '@/components/MenuSection';
import CartSection from '@/components/CartSection';
import CheckoutSection from '@/components/CheckoutSection';
import FloatingCart from '@/components/FloatingCart';
import Footer from '@/components/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  
  const sectionRefs = {
    inicio: useRef<HTMLDivElement>(null),
    sobre: useRef<HTMLDivElement>(null),
    cardapio: useRef<HTMLDivElement>(null),
    carrinho: useRef<HTMLDivElement>(null),
    finalizar: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (section: string) => {
    const ref = sectionRefs[section as keyof typeof sectionRefs];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(section);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current) {
          const element = ref.current;
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(key);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Header onNavigate={scrollToSection} activeSection={activeSection} />
      <FloatingCart onNavigate={scrollToSection} />
      <div ref={sectionRefs.inicio}>
        <Hero onNavigate={scrollToSection} />
      </div>

      <div ref={sectionRefs.sobre}>
        <AboutSection />
      </div>
      
      <div ref={sectionRefs.cardapio}>
        <MenuSection onNavigate={scrollToSection} />
      </div>
      
      <div ref={sectionRefs.carrinho}>
        <CartSection onNavigate={scrollToSection} />
      </div>
      
      <div ref={sectionRefs.finalizar}>
        <CheckoutSection onNavigate={scrollToSection} />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
