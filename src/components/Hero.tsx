import React from "react";
import { ArrowRight } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0f0f0f]"
      style={{ backgroundColor: "#0f0f0f", contain: "layout" }}
    >
      {/* Background Image - Optimizada para LCP y CLS */}
      <div className="absolute inset-0 z-0">
        <picture>
          {/* Desktop */}
          <source media="(min-width: 1024px)" srcSet="/amggtr-mobile.webp" type="image/webp" />
          {/* Mobile / fallback */}
          <img
            src="/amggtr-mobile.webp"
            alt="Importación de coches premium desde Alemania - Premium German Cars"
            width="800"
            height="1200"
            sizes="100vw"
            className="w-full h-full object-cover grayscale-[0.2]"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
          />
        </picture>

        {/* Overlays */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, #0f0f0f 0%, rgba(15,15,15,0.7) 50%, rgba(0,0,0,0.4) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center md:text-left h-full flex flex-col justify-center">
        <div className="max-w-4xl mt-20 will-change-transform">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
            <div className="h-[1px] w-12 bg-gold-400" />
            <span className="text-gold-400 text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
              Excelencia Alemana
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight tracking-tight">
            Importación de Coches Premium desde Alemania
          </h1>

          <h2 className="text-3xl md:text-5xl font-serif font-medium mb-8 leading-[1.15] text-white">
            Tú lo sueñas.
            <br />
            <span className="text-gray-400">Nosotros lo traemos.</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl font-light leading-relaxed tracking-wide mx-auto md:mx-0">
            Acceso directo al mercado alemán. Vehículos certificados, gestión integral y entrega llave en mano en España.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
            <a
              href="#import"
              className="px-8 py-5 bg-gold-400 hover:bg-gold-500 text-black font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center justify-center gap-3"
            >
              Comenzar Pedido
              <ArrowRight size={18} />
            </a>

            <a
              href="#stock"
              className="px-8 py-5 border border-white/20 hover:border-white text-white font-semibold text-sm uppercase tracking-widest hover:bg-white/5 transition-all duration-300 flex items-center justify-center"
            >
              Explorar Stock
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
