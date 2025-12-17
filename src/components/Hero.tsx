import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  const goToImportForm = () => {
    navigate("/", { state: { scrollTo: "#import" } });
  };

  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      {/* LCP IMAGE */}
      <img
        src="/amggtr-mobile.webp"
        alt="Importación de coches premium desde Alemania"
        loading="eager"
        decoding="async"
        width="1920"
        height="1080"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-[1]" />

      {/* Content */}
      <div className="relative z-[2] text-white px-6 max-w-[520px] text-center">
        <span className="block text-gold-400 text-xs font-bold tracking-widest uppercase mb-4">
          Excelencia Alemana
        </span>

        <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">
          Importación de Coches Premium desde Alemania
        </h1>

        <p className="text-lg text-gray-200 mb-8">
          Tú lo sueñas. Nosotros lo traemos.
        </p>

        <button
          onClick={goToImportForm}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gold-400 text-black font-bold uppercase text-sm tracking-widest hover:bg-gold-500 transition-colors"
        >
          Comenzar pedido
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};
