import React, { useState, useEffect, useCallback } from "react";
import { Menu, X, Calculator } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Optimización de scroll con passive listener y chequeo de seguridad
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta para ahorrar memoria
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const goToSection = useCallback((id: string) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const el = document.querySelector(id);
      if (el) {
        const offset = 80;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth"
        });
      }
    }
    setIsOpen(false);
  }, [location.pathname, navigate]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md py-4 border-white/10 shadow-xl"
          : "bg-transparent py-8 border-transparent"
      }`}
    >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        
        <button
          onClick={() => navigate("/")}
          className="flex items-center z-50 transition-transform hover:scale-105 active:scale-95"
          aria-label="Ir al inicio de Premium German Cars"
        >
          <img 
            src="/logoPGC.svg" 
            alt="Logo Premium German Cars" 
            width="180"
            height="48"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
            className="h-8 md:h-12 w-auto brightness-0 invert" 
            style={{ minHeight: '32px' }} // Evita CLS en carga inicial
          />
        </button>

        {/* DESKTOP - Mantenemos tu esencia 97/100 */}
        <div className="hidden lg:flex items-center space-x-10">
          <button onClick={() => goToSection("#home")} className="nav-link font-medium tracking-wide">
            Inicio
          </button>

          <button
            onClick={() => navigate("/importacion-coches-alemania")}
            className={`nav-link font-medium tracking-wide ${location.pathname === '/importacion-coches-alemania' ? 'text-gold-400' : ''}`}
          >
            Importación
          </button>

          <button
            onClick={() => navigate("/calculadora-impuesto-matriculacion")}
            className={`nav-link font-medium tracking-wide flex items-center gap-2 ${location.pathname === '/calculadora-impuesto-matriculacion' ? 'text-gold-400' : ''}`}
          >
            <Calculator size={14} className="text-gold-400" />
            Calculadora
          </button>

          <button onClick={() => goToSection("#stock")} className="nav-link font-medium tracking-wide">
            Stock
          </button>

          <button
            onClick={() => navigate("/blog")}
            className={`nav-link font-medium tracking-wide ${location.pathname.startsWith('/blog') ? 'text-gold-400' : ''}`}
          >
            Blog
          </button>

          <button onClick={() => goToSection("#contact")} className="nav-link font-medium tracking-wide">
            Contacto
          </button>

          <button
            onClick={() => goToSection("#import")}
            className={`px-6 py-2.5 border text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-sm ${
              isScrolled
                ? "border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black shadow-lg shadow-gold-400/10"
                : "border-white text-white hover:bg-white hover:text-black"
            }`}
          >
            Pedir Coche
          </button>
        </div>

        {/* MOBILE TOGGLE - Target táctil optimizado */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white z-50 p-3 hover:bg-white/5 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation active:scale-95"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU - Animaciones optimizadas por GPU */}
      <div
        className={`fixed inset-0 bg-[#050505] z-40 flex flex-col justify-center items-center transition-transform duration-500 ease-in-out ${
          isOpen 
            ? "translate-x-0" 
            : "translate-x-full"
        }`}
        style={{ willChange: 'transform' }}
      >
        <div className="flex flex-col space-y-8 items-center">
            <button onClick={() => { navigate("/"); setIsOpen(false); }} className="text-2xl font-serif text-white hover:text-gold-400 transition-colors min-h-[48px] px-4 touch-manipulation active:scale-95">
              Inicio
            </button>
            <button onClick={() => { navigate("/importacion-coches-alemania"); setIsOpen(false); }} className="text-2xl font-serif text-white hover:text-gold-400 transition-colors min-h-[48px] px-4 touch-manipulation active:scale-95">
              Importación Alemania
            </button>
            <button onClick={() => { navigate("/calculadora-impuesto-matriculacion"); setIsOpen(false); }} className="text-2xl font-serif text-gold-400 flex items-center gap-3 min-h-[48px] px-4 touch-manipulation active:scale-95">
              <Calculator size={24} /> Calculadora
            </button>
            <button onClick={() => { navigate("/blog"); setIsOpen(false); }} className="text-2xl font-serif text-white hover:text-gold-400 transition-colors min-h-[48px] px-4 touch-manipulation active:scale-95">
              Blog Premium
            </button>
            <button onClick={() => { goToSection("#stock"); setIsOpen(false); }} className="text-2xl font-serif text-white hover:text-gold-400 transition-colors min-h-[48px] px-4 touch-manipulation active:scale-95">
              Stock
            </button>
            <button onClick={() => { goToSection("#contact"); setIsOpen(false); }} className="text-2xl font-serif text-white hover:text-gold-400 transition-colors min-h-[48px] px-4 touch-manipulation active:scale-95">
              Contacto
            </button>
            
            <button
              onClick={() => { goToSection("#import"); setIsOpen(false); }}
              className="mt-4 px-10 py-4 bg-gold-500 text-black font-bold uppercase tracking-widest text-sm rounded-sm active:scale-95 transition-transform shadow-xl shadow-gold-500/20 min-h-[48px] touch-manipulation"
            >
              Pedir Coche
            </button>
        </div>
      </div>
    </nav>
  );
};
