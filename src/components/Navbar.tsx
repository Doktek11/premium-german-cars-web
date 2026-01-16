import React, { useState, useEffect } from "react";
import { Menu, X, Calculator } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true }); // Añadido passive para mejor rendimiento de scroll
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const goToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const el = document.querySelector(id);
      if (el) {
        const offset = 80; // Compensación por la altura del navbar
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth"
        });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-metallic-900/90 backdrop-blur-md py-4 border-white/10 shadow-xl"
          : "bg-transparent py-8 border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        <button
          onClick={() => navigate("/")}
          className="flex items-center z-50 transition-transform hover:scale-105 active:scale-95"
          aria-label="Ir al inicio"
        >
          <img 
            src="/logoPGC.svg" 
            alt="Logo Premium German Cars" 
            width="180"
            height="48"
            // Optimizaciones de carga
            fetchPriority="high"
            loading="eager"
            decoding="sync"
            className="h-8 md:h-12 w-auto brightness-0 invert" 
          />
        </button>

        {/* DESKTOP */}
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

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white z-50 p-2 hover:bg-white/5 rounded-full transition-colors"
          aria-expanded={isOpen}
          aria-label="Abrir menú"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 bg-metallic-950 z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          isOpen 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-8 items-center">
            <button onClick={() => { navigate("/"); setIsOpen(false); }} className="text-2xl font-serif text-white hover:text-gold-400 transition-colors">
              Inicio
            </button>
            <button onClick={() => { navigate("/importacion-coches-alemania"); setIsOpen(false); }} className="text-2xl font-serif text-white hover:text-gold-400 transition-colors">
              Importación Alemania
            </button>
            <button onClick={() => { navigate("/calculadora-impuesto-matriculacion"); setIsOpen(false); }} className="text-2xl font-serif text-gold-400 flex items-center gap-3">
              <Calculator size={24} /> Calculadora
            </button>
            <button onClick={() => { navigate("/blog"); setIsOpen(false); }} className="text-2xl font-serif text-white hover:text-gold-400 transition-colors">
              Blog Premium
            </button>
            <button onClick={() => { goToSection("#stock"); setIsOpen(false); }} className="text-2xl font-serif text-white hover:text-gold-400 transition-colors">
              Stock
            </button>
            <button onClick={() => { goToSection("#contact"); setIsOpen(false); }} className="text-2xl font-serif text-white hover:text-gold-400 transition-colors">
              Contacto
            </button>
            
            <button
              onClick={() => { goToSection("#import"); setIsOpen(false); }}
              className="mt-4 px-10 py-4 bg-gold-500 text-black font-bold uppercase tracking-widest text-sm rounded-sm active:scale-95 transition-transform"
            >
              Pedir Coche
            </button>
        </div>
      </div>
    </nav>
  );
};
