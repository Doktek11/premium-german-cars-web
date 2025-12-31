import React from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import { CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";

const CochesReusTarragona = () => {
  return (
    <>
      <SEO 
        title="Coches de segunda mano en Reus y Tarragona | Premium German Cars"
        description="¿Comprar en concesionarios de Tarragona o importar de Alemania? Analizamos la mejor opción para tu próximo coche premium."
      />
      <Navbar />
      
      <main className="bg-black text-white pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Cabecera */}
          <div className="mb-12">
            <span className="text-gold-400 font-bold tracking-widest text-xs uppercase">Mercado Local vs Importación</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6 leading-tight">
              Coches de segunda mano en Reus y Tarragona: ¿Vale la pena la importación?
            </h1>
            <div className="flex items-center gap-4 text-gray-500 text-sm italic">
              <span>Por Premium German Cars</span>
              <span className="w-1 h-1 bg-gold-400 rounded-full"></span>
              <span>10 Dic, 2025</span>
            </div>
          </div>

          {/* Imagen Destacada (Placeholder Premium) */}
          <div className="h-96 w-full bg-gradient-to-br from-metallic-800 to-black border border-white/10 flex items-center justify-center mb-16 overflow-hidden">
             <img src="/logoPGC.svg" className="w-40 opacity-10 brightness-0 invert" alt="Logo PGC" />
          </div>

          {/* Cuerpo del Artículo */}
          <div className="prose prose-invert prose-gold max-w-none">
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Si resides en la provincia de Tarragona y buscas un vehículo de gama alta, es probable que hayas recorrido los concesionarios de <strong>Reus, Tarragona o las naves de Les Gavarres</strong>. Sin embargo, el mercado local a menudo presenta limitaciones en stock y precios inflados.
            </p>

            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-12 mb-6">El dilema del comprador local</h2>
            <p className="mb-6">
              Encontrar un BMW M, un Audi RS o un Porsche con una configuración específica en nuestra zona puede ser una tarea de meses. Los vehículos disponibles suelen ser:
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex gap-3 items-start text-gray-300">
                <AlertTriangle className="text-gold-400 shrink-0 mt-1" size={18} />
                <span>Modelos con equipamiento básico o estándar.</span>
              </li>
              <li className="flex gap-3 items-start text-gray-300">
                <AlertTriangle className="text-gold-400 shrink-0 mt-1" size={18} />
                <span>Precios condicionados por la alta demanda local.</span>
              </li>
              <li className="flex gap-3 items-start text-gray-300">
                <AlertTriangle className="text-gold-400 shrink-0 mt-1" size={18} />
                <span>Historiales de mantenimiento no siempre transparentes.</span>
              </li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-12 mb-6">Por qué Alemania sigue siendo la mejor opción</h2>
            <p className="mb-8">
              Desde nuestras oficinas en Cambrils, gestionamos cada semana solicitudes de clientes que han decidido dar el salto al mercado alemán. Las ventajas son indiscutibles:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-metallic-900 p-6 border border-white/5">
                <CheckCircle className="text-gold-400 mb-4" />
                <h4 className="font-bold mb-2">Variedad Infinita</h4>
                <p className="text-sm text-gray-400 font-light">Acceso a más de 1.5 millones de vehículos con configuraciones exclusivas.</p>
              </div>
              <div className="bg-metallic-900 p-6 border border-white/5">
                <CheckCircle className="text-gold-400 mb-4" />
                <h4 className="font-bold mb-2">Estado Impecable</h4>
                <p className="text-sm text-gray-400 font-light">Los coches alemanes suelen estar mejor mantenidos gracias a su cultura automovilística.</p>
              </div>
            </div>

            <blockquote className="border-l-4 border-gold-400 pl-6 py-4 italic text-gray-300 bg-white/5 mb-10">
              "En Premium German Cars no solo importamos coches, importamos tranquilidad. Revisamos cada unidad en origen antes de que cruce la frontera hacia Tarragona."
            </blockquote>

            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-12 mb-6">Nuestro proceso en Cambrils</h2>
            <p className="mb-6">
              Si buscas un coche de segunda mano en Reus o alrededores, te invitamos a que nos visites. Nos encargamos de todo: desde la negociación en alemán hasta la matriculación final.
            </p>
          </div>

          {/* CTA Final */}
          <div className="mt-20 p-10 bg-gradient-to-r from-metallic-900 to-black border border-gold-400/20 text-center">
            <h3 className="text-2xl font-serif font-bold mb-4 italic">¿Tienes un modelo en mente?</h3>
            <p className="text-gray-400 mb-8">Déjanos encontrar la unidad perfecta para ti en el mercado oficial alemán.</p>
            <a href="/#import" className="inline-flex items-center gap-3 bg-gold-400 text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-gold-500 transition-all">
              Consultar ahora <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CochesReusTarragona;
