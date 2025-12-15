import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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
      className={`fixed w-full z-50 transition-all duration-500 border-b
        ${isScrolled
          ? "bg-metallic-950/85 backdrop-blur-md py-4 border-white/10"
          : "bg-gradient-to-b from-black/60 to-black/20 py-8 border-transparent"}
      `}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">

        {/* LOGO */}
        <button
          onClick={() => {
            navigate("/");
            setIsOpen(false);
          }}
          className="flex items-center z-50"
          aria-label="Premium German Cars - Inicio"
        >
          <img
            src="/logoPGC.svg"
            alt="Premium German Cars - Importación de coches desde Alemania"
            className={`transition-all duration-300
              ${isScrolled ? "h-12" : "h-16"}
              w-auto
              drop-shadow-[0_0_12px_rgba(212,175,55,0.25)]
            `}
          />
        </button>

        {/* DESKTOP */}
        <div className="hidden lg:flex items-center space-x-10">
          <button
            onClick={() => navigate("/importacion-coches-alemania")}
            className="nav-link"
          >
            Importación Alemania
          </button>

          <button onClick={() => goToSection("#home")} className="nav-link">
            Inicio
          </button>

          <button onClick={() => goToSection("#stock")} className="nav-link">
            Stock
          </button>

          <button onClick={() => goToSection("#process")} className="nav-link">
            Proceso
          </button>

          <button onClick={() => goToSection("#guarantee")} className="nav-link">
            Garantías
          </button>

          <button onClick={() => goToSection("#contact")} className="nav-link">
            Contacto
          </button>

          <button
            onClick={() => goToSection("#import")}
            className="px-6 py-3 border border-gold-400 text-gold-400 text-xs font-bold uppercase tracking-widest hover:bg-gold-400 hover:text-black transition-all"
          >
            Pedir Coche
          </button>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white z-50"
          aria-label="Menú"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 bg-metallic-950 z-40 flex flex-col justify-center items-center transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => {
            navigate("/importacion-coches-alemania");
            setIsOpen(false);
          }}
          className="mobile-link"
        >
          Importación Alemania
        </button>

        <button onClick={() => goToSection("#stock")} className="mobile-link">
          Stock
        </button>

        <button onClick={() => goToSection("#process")} className="mobile-link">
          Proceso
        </button>

        <button onClick={() => goToSection("#contact")} className="mobile-link">
          Contacto
        </button>
      </div>
    </nav>
  );
};
