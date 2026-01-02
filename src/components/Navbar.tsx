import React, { useState, useEffect } from "react";
import { Menu, X, Calculator } from "lucide-react"; // Añadimos icono Calculator
import { useNavigate, useLocation } from "react-router-dom";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-metallic-900/90 backdrop-blur-md py-4 border-white/10"
          : "bg-transparent py-8 border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        <button
          onClick={() => navigate("/")}
          className="flex items-center z-50 transition-transform hover:scale-105"
        >
          <img 
            src="/logoPGC.svg" 
            alt="Logo Premium German Cars" 
            width="180"
            height="48"
            className="h-8 md:h-12 w-auto brightness-0 invert" 
          />
        </button>

        {/* DESKTOP */}
        <div className="hidden lg:flex items-center space-x-10">
          <button onClick={() => goToSection("#home")} className="nav-link">
            Inicio
          </button>

          <button
            onClick={() => navigate("/importacion-coches-alemania")}
            className={`nav-link ${location.pathname === '/importacion-coches-alemania' ? 'text-gold-400' : ''}`}
          >
            Importación
          </button>

          {/* NUEVO ENLACE CALCULADORA */}
          <button
            onClick={() => navigate("/calculadora-impuesto-matriculacion")}
            className={`nav-link flex items-center gap-2 ${location.pathname === '/calculadora-impuesto-matriculacion' ? 'text-gold-400' : ''}`}
          >
            <Calculator size={14} className="text-gold-400" />
            Calculadora
          </button>

          <button onClick={() => goToSection("#stock")} className="nav-link">
            Stock
          </button>

          <button
            onClick={() => navigate("/blog")}
            className={`nav-link ${location.pathname.startsWith('/blog') ? 'text-gold-400' : ''}`}
          >
            Blog
          </button>

          <button onClick={() => goToSection("#contact")} className="nav-link">
            Contacto
          </button>

          <button
            onClick={() => goToSection("#import")}
            className={`px-5 py-2 border text-xs font-bold uppercase tracking-widest transition-all ${
              isScrolled
                ? "border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black"
                : "border-white text-white hover:bg-white hover:text-black"
            }`}
          >
            Pedir Coche
          </button>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white z-50"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 bg-metallic-900 z-40 flex flex-col justify-center items-center transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button onClick={() => { navigate("/"); setIsOpen(false); }} className="mobile-link">
          Inicio
        </button>
        <button onClick={() => { navigate("/importacion-coches-alemania"); setIsOpen(false); }} className="mobile-link">
          Importación Alemania
        </button>
        <button onClick={() => { navigate("/calculadora-impuesto-matriculacion"); setIsOpen(false); }} className="mobile-link">
          Calculadora Impuestos
        </button>
        <button onClick={() => { navigate("/blog"); setIsOpen(false); }} className="mobile-link">
          Blog Premium
        </button>
        <button onClick={() => { goToSection("#stock"); setIsOpen(false); }} className="mobile-link">
          Stock
        </button>
        <button onClick={() => { goToSection("#contact"); setIsOpen(false); }} className="mobile-link">
          Contacto
        </button>
      </div>
    </nav>
  );
};
