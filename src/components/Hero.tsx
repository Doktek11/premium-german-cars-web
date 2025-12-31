import React from "react";
import { ArrowRight } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image - Ahora usa tu imagen amggtr-mobile.webp */}
      <div className="absolute inset-0 z-0">
        <img
          src="/amggtr-mobile.webp"
          alt="Importación de coches premium desde Alemania - Premium German Cars"
          className="w-full h-full object-cover scale-105 animate-pulse-slow"
          fetchPriority="high"
        />

        {/* Overlays - Capas de color para el efecto gris y legibilidad */}
        {/* Capa 1: Degradado gris oscuro desde abajo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#2a2a2a]/80 to-[#333333]/40" />
        
        {/* Capa 2: Tinte gris general para suavizar la imagen del AMG GTR */}
        <div className="absolute inset-0 bg-gray-900/40 backdrop-grayscale-[0.2]" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center md:text-left h-full flex flex-col justify-center">
        <div className="max-w-4xl animate-fade-in-up mt-20">

          {/* Eyebrow */}
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
            <div className="h-[1px] w-12 bg-gold-400" />
            <span className="text-gold-400 text-xs md:text-sm font-bold tracking-ultra uppercase">
              Excelencia Alemana
            </span>
          </div>

          {/* H1 SEO - Premium German Cars */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight tracking-tight">
            Importación de Coches Premium desde Alemania
          </h1>

          {/* Claim emocional */}
          <h2 className="text-3xl md:text-5xl font-serif font-medium mb-8 leading-[1.15] text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
            Tú lo sueñas.
            <br />
            Nosotros lo traemos.
          </h2>

          {/* Subtítulo */}
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl font-light leading-relaxed tracking-wide mx-auto md:mx-0">
            Acceso directo al mercado alemán. Vehículos certificados, gestión
            integral y entrega llave en mano en España.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
            <a
              href="#import"
              className="px-8 py-5 bg-gold-400 hover:bg-gold-500 text-black font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] flex items-center justify-center gap-3"
            >
              Comenzar Pedido
              <ArrowRight size={18} />
            </a>

            <a
              href="#stock"
              className="px-8 py-5 border border-white/20 hover:border-white text-white font-semibold text-sm uppercase tracking-widest hover:bg-white/5 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
            >
              Explorar Stock
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
