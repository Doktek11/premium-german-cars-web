import React from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import { ShieldCheck, Zap, Search, ArrowRight } from "lucide-react";

const BmwReestreno2026 = () => {
  return (
    <>
      <SEO 
        title="BMW de Reestreno en Alemania 2026: Guía de Compra | Premium German Cars"
        description="Descubre cómo conseguir un BMW de reestreno directamente de concesionarios oficiales en Alemania con garantía europea."
      />
      <Navbar />
      
      <main className="bg-black text-white pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Cabecera del Artículo */}
          <div className="mb-12">
            <span className="text-gold-400 font-bold tracking-widest text-xs uppercase italic">Guía de Importación 2026</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6 leading-tight">
              BMW de Reestreno en Alemania: ¿Por qué 2026 es el mejor año para importar?
            </h1>
            <div className="flex items-center gap-4 text-gray-500 text-sm italic">
              <span>Premium German Cars</span>
              <span className="w-1 h-1 bg-gold-400 rounded-full"></span>
              <span>15 Dic, 2025</span>
            </div>
          </div>

          {/* Imagen de Marca de Agua */}
          <div className="h-80 w-full bg-gradient-to-br from-metallic-800 to-black border border-white/5 flex items-center justify-center mb-16 relative overflow-hidden">
             <img src="/logoPGC.svg" className="w-48 opacity-10 brightness-0 invert" alt="BMW Premium" />
             <div className="absolute bottom-4 right-6 text-gold-400/30 font-serif italic text-6xl select-none">M Power</div>
          </div>

          {/* Contenido Principal */}
          <div className="prose prose-invert prose-gold max-w-none">
            <p className="text-xl text-gray-300 leading-relaxed mb-8 font-light">
              El concepto de <strong>"Jahreswagen"</strong> (coche de un año) en Alemania es la joya de la corona para los entusiastas de BMW. En 2026, el mercado alemán ofrece una oportunidad única para adquirir modelos de última generación con ahorros que pueden superar el 30% respecto al precio de configurador en España.
            </p>

            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-12 mb-6 uppercase tracking-wider">Los pilares del Reestreno BMW</h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex gap-6 p-6 bg-metallic-900 border-l-2 border-gold-400">
                <ShieldCheck className="text-gold-400 shrink-0" size={32} />
                <div>
                  <h4 className="font-bold text-white text-lg mb-1">Garantía BMW Premium Selection</h4>
                  <p className="text-gray-400 text-sm">Casi todas nuestras unidades de reestreno cuentan con certificación oficial, garantizando 24 meses de cobertura europea y revisión de 360°.</p>
                </div>
              </div>

              <div className="flex gap-6 p-6 bg-metallic-900 border-l-2 border-gold-400">
                <Zap className="text-gold-400 shrink-0" size={32} />
                <div>
                  <h4 className="font-bold text-white text-lg mb-1">Equipamiento "Full Extras"</h4>
                  <p className="text-gray-400 text-sm">A diferencia del mercado nacional, los BMW alemanes suelen incluir paquetes M-Sport completos, Head-Up Display y suspensiones adaptativas de serie.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-12 mb-6 italic">Modelos más demandados en 2026</h2>
            <p className="mb-6">
              Basándonos en las solicitudes gestionadas en nuestra sede de Cambrils, estos son los modelos con mejor relación calidad-precio este año:
            </p>
            <ul className="list-none space-y-3 mb-10">
              <li className="flex items-center gap-2">
                <span className="text-gold-400">▸</span> <strong>BMW Serie 3 (G20 LCI II):</strong> Un equilibrio perfecto entre tecnología y dinamismo.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold-400">▸</span> <strong>BMW X5 (G05):</strong> El rey de los SUV premium con motores microhíbridos que obtienen etiqueta ECO.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold-400">▸</span> <strong>BMW i4:</strong> La transición eléctrica con la conducción más purista del mercado.
              </li>
            </ul>

            <div className="bg-gold-400/5 p-8 border border-gold-400/20 my-12">
              <h3 className="text-xl font-bold text-gold-400 mb-4 flex items-center gap-2">
                <Search size={20} /> El consejo de Premium German Cars
              </h3>
              <p className="text-gray-300 italic">
                "No te limites a mirar el precio final. En un BMW de reestreno, lo más importante es verificar el historial digital de mantenimiento grabado en la llave. Nosotros realizamos esa lectura antes de recomendarte cualquier unidad."
              </p>
            </div>

            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-12 mb-6 uppercase tracking-wider">Gestión integral llave en mano</h2>
            <p className="mb-8">
              Importar un BMW no es solo comprarlo; es transportarlo con seguridad y cumplir con toda la burocracia en España. En <strong>Premium German Cars</strong>, nos encargamos de que tu única preocupación sea elegir el color de la tapicería.
            </p>
          </div>

          {/* Banner de Contacto */}
          <div className="mt-20 p-1 bg-gradient-to-r from-gold-600 to-gold-400">
            <div className="bg-black p-10 text-center">
              <h3 className="text-3xl font-serif font-bold mb-4 text-white">¿Buscamos tu BMW?</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">Configura tu búsqueda y recibe en menos de 24h las mejores unidades disponibles en la red oficial alemana.</p>
              <a href="/#import" className="inline-flex items-center gap-3 bg-gold-400 text-black px-10 py-4 font-bold uppercase tracking-tighter hover:bg-white transition-all duration-300">
                Solicitar presupuesto sin compromiso <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BmwReestreno2026;
