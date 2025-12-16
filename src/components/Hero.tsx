import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  const goToImportForm = () => {
    navigate("/", { state: { scrollTo: "#import" } });
  };

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#000" }}
    >
      {/* Background image */}
      <img
        src="/amggtr-mobile.webp"
        alt="Importación de coches premium desde Alemania"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        decoding="async"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 px-6 text-center text-white max-w-xl">
        <span className="block text-gold-400 text-xs font-bold uppercase mb-4">
          Excelencia Alemana
        </span>

        <h1 className="text-4xl font-serif font-bold mb-6">
          Importación de Coches Premium desde Alemania
        </h1>

        <p className="text-lg text-gray-200 mb-8">
          Tú lo sueñas. Nosotros lo traemos.
        </p>

        <button
          onClick={goToImportForm}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gold-400 text-black font-bold uppercase text-sm"
        >
          Comenzar pedido
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};

