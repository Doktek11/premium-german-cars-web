import React, { useState, useEffect } from "react";
import { Menu, X, Car } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate(`/${id}`);
      return;
    }

    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-metallic-950/80 backdrop-blur-md py-4 border-white/10"
          : "bg-transparent py-8 border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 group relative z-50"
        >
          <Car className="w-6 h-6 text-gold-400 transition-transform group-hover:scale-110" />
          <span className="text-xl font-serif font-bold tracking-widest text-white">
            PREMIUM<span className="text-gold-400">GC</span>
          </span>
        </button>

        {/* DESKTOP */}
        <div className="hidden lg:flex items-center space-x-10">
          <button
            onClick={() => navigate("/importacion-coches-alemania")}
            className="text-xs uppercase tracking-[0.2em] text-gray-300 hover:text-gold-400 transition-colors duration-300 font-medium"
          >
            Importación Alemania
          </button>

          <button
            onClick={() => scrollToSection("#stock")}
            className="text-xs uppercase tracking-[0.2em] text-gray-300 hover:text-gold-400"
          >
            Stock
          </button>

          <button
            onClick={() => scrollToSection("#contact")}
            className="text-xs uppercase tracking-[0.2em] text-gray-300 hover:text-gold-400"
          >
            Contacto
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
        className={`fixed inset-0 bg-metallic-950 z-40 flex flex-col justify-center items-center transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => {
            navigate("/importacion-coches-alemania");
            setIsOpen(false);
          }}
          className="text-2xl font-serif text-white hover:text-gold-400"
        >
          Importación Alemania
        </button>
      </div>
    </nav>
  );
};
