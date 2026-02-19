import React from "react";
import { ArrowRight } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f0f0f]"
      style={{ backgroundColor: "#0f0f0f" }}
    >
      <div className="absolute inset-0 z-0">
        <picture>
          <source
            media="(min-width: 1024px)"
            srcSet="/amggtr-mobile.webp"
            sizes="100vw"
            type="image/webp"
          />
          <img
            src="/amggtr-mobile.webp"
            alt="Importación de coches premium desde Alemania - Premium German Cars"
            width="800"
            height="1200"
            sizes="100vw"
            className="w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </picture>

        {/* Una sola capa para reducir trabajo de composición/pintado */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #0f0f0f 0%, rgba(15,15,15,0.65) 52%, rgba(0,0,0,0.32) 100%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center md:text-left h-full flex flex-col justify-center">
        <div className="max-w-4xl mt-16 sm:mt-20">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-5 sm:mb-6">
            <div className="h-[1px] w-12 bg-gold-400" />
            <span className="text-gold-400 text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.28em] uppercase">
              Excelencia Alemana
            </span>
          </div>

          <h1 className="text-[30px] sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-5 sm:mb-6 leading-[1.08] tracking-[-0.01em]">
            Importación de Coches Premium desde Alemania
          </h1>

          {/* font-semibold para usar Playfair 600 y evitar depender de 400 en el above-the-fold */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-semibold mb-7 sm:mb-8 leading-[1.12] text-white">
            Tú lo sueñas.
            <br />
            <span className="text-gray-300">Nosotros lo traemos.</span>
          </h2>

          {/* font-normal para no forzar Montserrat 300 en el primer render */}
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-10 sm:mb-12 max-w-2xl font-normal leading-relaxed tracking-normal mx-auto md:mx-0">
            Acceso directo al mercado alemán. Vehículos certificados, gestión integral y entrega llave en mano en España.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
            <a
              href="#import"
              className="px-8 py-4 sm:py-5 bg-gold-400 hover:bg-gold-500 text-black font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center justify-center gap-3 min-h-[48px] touch-manipulation"
            >
              Comenzar Pedido
              <ArrowRight size={18} />
            </a>

            <a
              href="#stock"
              className="px-8 py-4 sm:py-5 border border-white/20 hover:border-white text-white font-semibold text-sm uppercase tracking-widest hover:bg-white/5 transition-all duration-300 flex items-center justify-center min-h-[48px] touch-manipulation"
            >
              Explorar Stock
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
