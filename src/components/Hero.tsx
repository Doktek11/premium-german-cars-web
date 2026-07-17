import React from "react";
import { ArrowRight } from "lucide-react";
import { getResponsiveImageProps } from "../lib/responsiveImages";

export const Hero: React.FC = () => {
  const reviewMessage =
    "Hola! He visto una unidad en Alemania y me gustaría que la revisarais antes de comprar.";
  const reviewUrl = `https://wa.me/34603743608?text=${encodeURIComponent(reviewMessage)}`;
  const heroImage = getResponsiveImageProps("/amggtr-mobile.webp", "100vw");

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
            srcSet={heroImage.srcSet}
            sizes="100vw"
            type="image/webp"
          />
          <img
            {...heroImage}
            alt="Importación de coches premium desde Alemania a España - Premium German Cars"
            sizes="100vw"
            className="w-full h-full object-cover"
            {...({ fetchpriority: "high" } as Record<string, string>)}
            loading="eager"
            decoding="async"
          />
        </picture>

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #0f0f0f 0%, rgba(15,15,15,0.72) 52%, rgba(0,0,0,0.34) 100%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center md:text-left h-full flex flex-col justify-center">
        <div className="max-w-5xl mt-16 sm:mt-20">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-5 sm:mb-6">
            <div className="h-[1px] w-12 bg-gold-400" />
            <span className="text-gold-400 text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.28em] uppercase">
              Excelencia alemana
            </span>
          </div>

          <h1 className="text-[30px] sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-5 sm:mb-6 leading-[1.08]">
            Importación de coches premium desde Alemania a España
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 max-w-2xl font-normal leading-relaxed mx-auto md:mx-0">
            Importamos coches premium desde Alemania con búsqueda personalizada,
            verificación documental, transporte profesional, ITV, matriculación
            y entrega llave en mano en España.
          </p>

          <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-3xl leading-relaxed mx-auto md:mx-0">
            Ayudamos a particulares y empresas a encontrar, verificar e importar
            BMW, Audi, Mercedes-Benz, Porsche y Volkswagen con historial claro,
            documentación correcta y configuración interesante para el mercado español.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center md:justify-start">
            <a
              href="#import"
              className="px-8 py-4 sm:py-5 bg-gold-400 hover:bg-gold-500 text-black font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center justify-center gap-3 min-h-[48px] touch-manipulation"
            >
              Solicitar búsqueda personalizada
              <ArrowRight size={18} />
            </a>

            <a
              href="/calculadora-impuesto-matriculacion"
              className="px-8 py-4 sm:py-5 border border-white/20 hover:border-white text-white font-semibold text-sm uppercase tracking-widest hover:bg-white/5 transition-all duration-300 flex items-center justify-center min-h-[48px] touch-manipulation"
            >
              Calcular impuesto de matriculación
            </a>

            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 sm:py-5 border border-gold-400/40 text-gold-400 font-semibold text-sm uppercase tracking-widest hover:bg-gold-400 hover:text-black transition-all duration-300 flex items-center justify-center min-h-[48px] touch-manipulation"
            >
              Enviar una unidad para revisar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
