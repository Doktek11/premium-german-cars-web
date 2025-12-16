import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-metallic-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text */}
          <div className="lg:w-1/2">
            <span className="text-gold-400 text-sm tracking-widest uppercase font-bold">
              Nuestra Esencia
            </span>

            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2 mb-8">
              Experiencias únicas sobre ruedas
            </h2>

            <div className="space-y-6 text-gray-300 leading-relaxed text-justify font-light">
              <p>
                En <strong className="text-white">PremiumGermanCars</strong> ofrecemos algo más que coches alemanes:
                ofrecemos experiencias únicas sobre ruedas. Cada vehículo que seleccionamos es cuidadosamente
                inspeccionado para garantizar los más altos estándares de rendimiento, confort y fiabilidad.
              </p>

              <p>
                Sabemos que el tiempo es valioso, por eso nuestro servicio está diseñado para ser ágil y sin
                complicaciones. Siempre que sea posible, desde el momento en que das tu visto bueno,
                tu coche llega a España en tan solo una semana.
              </p>

              <p>
                Cuidamos cada detalle: desde la selección del vehículo hasta que se encuentra listo para ti,
                todo pensado para ofrecer transparencia, confianza y una experiencia personalizada.
              </p>

              <p className="font-medium text-gold-400 italic border-l-2 border-gold-400 pl-4 mt-8">
                "Porque cada coche es más que un vehículo: es una inversión en calidad, confort y estilo."
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 relative">
            <div className="absolute -inset-4 bg-gold-500/10 blur-2xl rounded-full"></div>

            <picture>
              {/* Mobile */}
              <source
                srcSet="/amggtr-mobile.webp"
                media="(max-width: 768px)"
                type="image/webp"
              />

              {/* Desktop */}
              <img
                src="/amggtr.webp"
                alt="Detalle de coche premium alemán"
                className="
                  relative rounded w-full h-auto
                  shadow-2xl border border-white/5
                  grayscale hover:grayscale-0
                  transition-all duration-700
                "
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
              />
            </picture>
          </div>

        </div>
      </div>
    </section>
  );
};
