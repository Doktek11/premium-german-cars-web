import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-metallic-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
           <div className="lg:w-1/2">
              <span className="text-gold-400 text-sm tracking-widest uppercase font-bold">Nuestra Esencia</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2 mb-8">Experiencias únicas sobre ruedas</h2>
              <div className="space-y-6 text-gray-300 leading-relaxed text-justify font-light">
                <p>
                  En <strong className="text-white">PremiumGermanCars</strong> ofrecemos algo más que coches alemanes: ofrecemos experiencias únicas sobre ruedas. Cada vehículo que seleccionamos es cuidadosamente inspeccionado para garantizar que cumple con los más altos estándares de rendimiento, confort y fiabilidad. Nuestro compromiso es que cada cliente disfrute de un coche que refleja su estilo de vida y exigencias.
                </p>
                <p>
                  Sabemos que el tiempo es valioso, por eso nuestro servicio está diseñado para ser ágil y sin complicaciones. Siempre que sea posible, desde el momento en que das tu visto bueno, nos aseguramos de que tu coche llegue a España y puedas empezar a disfrutarlo en tan solo una semana.
                </p>
                <p>
                  En PremiumGermanCars cuidamos cada detalle: desde la selección del vehículo hasta que se encuentre listo para ti, todo pensado para ofrecer transparencia, confianza y una experiencia personalizada. Creemos que comprar un coche premium no debe ser complicado: debe ser un proceso emocionante y satisfactorio.
                </p>
                <p className="font-medium text-gold-400 italic border-l-2 border-gold-400 pl-4 mt-8">
                  "Porque para nosotros, cada coche es más que un vehículo: es una inversión en calidad, confort y estilo, y cada cliente merece recibir lo mejor."
                </p>
              </div>
           </div>
           <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-gold-500/10 blur-2xl rounded-full"></div>
              <img
                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop"
                alt="Premium German Car Detail"
                className="relative rounded w-full h-auto shadow-2xl border border-white/5 grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
              />
           </div>
        </div>
      </div>
    </section>
  );
};
