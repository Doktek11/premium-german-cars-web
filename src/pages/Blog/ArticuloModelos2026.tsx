import React from 'react';
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import { CheckCircle, AlertTriangle, Info, Mail, ArrowRight, Star } from 'lucide-react';

const ArticuloModelos2026 = () => {
  return (
    <>
      <SEO 
        title="Los 5 modelos más inteligentes para importar de Alemania en 2026 | Premium German Cars"
        description="Calidad real, historial transparente y valor de reventa. Descubre los modelos clave para importar este año."
      />
      <Navbar />
      
      <main className="bg-black text-white pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* CABECERA: H1 */}
          <header className="mb-12">
            <span className="text-gold-400 font-bold tracking-widest text-xs uppercase italic">Estrategia de Mercado 2026</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6 leading-tight">
              Los 5 modelos más inteligentes para importar de Alemania en 2026
            </h1>
            <div className="flex items-center gap-4 text-gray-500 text-sm italic">
              <span>Premium German Cars</span>
              <span className="w-1 h-1 bg-gold-400 rounded-full"></span>
              <span>2 Ene, 2026</span>
            </div>
          </header>

          {/* Hero Visual PGC */}
          <div className="h-80 w-full bg-gradient-to-br from-metallic-800 to-black border border-white/5 flex items-center justify-center mb-16 relative overflow-hidden">
             <img src="/logoPGC.svg" className="w-48 opacity-10 brightness-0 invert" alt="PGC Logo" />
             <div className="absolute bottom-4 right-6 text-gold-400/30 font-serif italic text-6xl select-none">Smart Choice</div>
          </div>

          {/* INTRODUCCIÓN */}
          <div className="prose prose-invert prose-gold max-w-none text-gray-300 leading-relaxed text-justify">
            <p className="text-xl text-gray-200 mb-8 font-light italic">
              Importar un coche de Alemania en 2026 puede ser una de las decisiones más inteligentes si lo haces con criterio —o un error costoso si no lo haces con rigor. El mercado alemán ofrece una ventaja clara sobre el mercado nacional: <strong>mejor mantenimiento, equipamiento superior y un historial de conservación más estricto.</strong>
            </p>
            <p className="mb-8">
              Pero no todos los coches alemanes son iguales. Lo que marca la diferencia es saber qué buscar, qué evitar y cómo valorar cada detalle del vehículo, desde su origen hasta su <strong>historial de mantenimiento certificado.</strong>
            </p>
            
            <blockquote className="border-l-2 border-gold-400 bg-white/5 p-6 my-10 italic font-medium text-gray-200">
              "Importar no es solo traer un coche: es seleccionar un activo que conserve su valor en el tiempo."
            </blockquote>

            {/* SECCIÓN 1: H2 */}
            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-12 mb-6 uppercase tracking-wider">
              Por qué importar desde Alemania sigue teniendo sentido en 2026
            </h2>
            <p className="mb-8">
              Alemania es un mercado con una cultura de mantenimiento superior, registros más completos y vehículos que han pasado por estrictos programas de revisión en entornos de marca o flotas corporativas con servicios de mantenimiento rigurosos.
            </p>
            
            <div className="bg-metallic-900/50 p-8 border border-white/10 rounded-sm mb-8">
              <h3 className="text-xl font-bold mb-6 flex items-center text-white">
                <CheckCircle className="text-gold-400 mr-3" size={20} /> Beneficios concretos para ti:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start text-sm">
                  <span className="text-gold-400 mr-3">•</span> Historial de mantenimiento más completo que la mayoría del mercado español.
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-gold-400 mr-3">•</span> Posibilidad de encontrar unidades con equipamiento premium de fábrica.
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-gold-400 mr-3">•</span> Mayor probabilidad de que el coche mantenga un alto valor de reventa.
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-gold-400 mr-3">•</span> Riesgo mínimo de sorpresas mecánicas o estructurales gracias a la trazabilidad.
                </li>
              </ul>
            </div>

            <div className="flex items-center bg-gold-400/5 border border-gold-400/20 p-6 rounded-lg text-gray-400 mb-12">
              <AlertTriangle className="mr-4 text-gold-400 shrink-0" />
              <p className="text-sm">
                <strong>Nota:</strong> La transparencia del historial y el mantenimiento certificado no es algo que se encuentre en todas las ofertas de importación. El filtro previo es la clave.
              </p>
            </div>

            {/* SECCIÓN 2: H2 */}
            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-12 mb-6 uppercase tracking-wider">
              Transparencia absoluta: el verdadero lujo
            </h2>
            <p className="mb-6">
              En <strong>Premium German Cars</strong> no importamos cualquier coche: solo seleccionamos unidades con trazabilidad 100% documentada.
            </p>
            
            <h3 className="text-xl font-bold mb-6 text-white">¿Qué entendemos por trazabilidad?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              <div className="bg-white/5 border border-white/10 p-5 rounded-sm italic text-sm">"Procedencia clara (Matriz de marca, flotas premium, puntos certificados)."</div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-sm italic text-sm">"Historial completo de propietarios anteriores."</div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-sm italic text-sm">"Mantenimientos sellados según los estándares del fabricante."</div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-sm italic text-sm">"Kilometraje coherente y totalmente verificable."</div>
            </div>

            {/* SECCIÓN 3: LOS MODELOS */}
            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-16 mb-8 uppercase tracking-wider">
              Nuestra selección inteligente para 2026
            </h2>

            {/* Modelo 1 */}
            <div className="mb-10 p-8 border border-white/10 bg-metallic-900/30 rounded-sm">
              <h3 className="text-2xl font-bold text-white mb-4">1. BMW Serie 1 (F40) — El compacto premium</h3>
              <p className="mb-2"><strong>Por qué es una oportunidad:</strong> La puerta de entrada más racional al ecosistema BMW: consumo contenido y tecnología actual.</p>
              <p className="mb-4"><strong>Qué buscar:</strong> Versiones 116i o 118i con mantenimiento certificado y un solo propietario.</p>
              <p className="text-gold-400 italic font-medium text-sm">Valor para ti: Equilibrio entre coste operativo y excelente salida en el mercado de usados.</p>
            </div>

            {/* Modelo 2 */}
            <div className="mb-10 p-8 border border-white/10 bg-metallic-900/30 rounded-sm">
              <h3 className="text-2xl font-bold text-white mb-4">2. Volkswagen Golf — La referencia constante</h3>
              <p className="mb-2"><strong>Por qué destaca:</strong> Unidades alemanas con asistentes (IQ.Drive, ACC) que en España eran extras costosos.</p>
              <p className="mb-4"><strong>Qué buscar:</strong> Historial de servicio impecable y estado estructural verificado.</p>
              <p className="text-gold-400 italic font-medium text-sm">Valor para ti: Un coche versátil que retiene su valor mejor que cualquier competidor.</p>
            </div>

            {/* FAQ: H2 */}
            <section className="mt-20 mb-12 bg-white/5 border border-white/10 p-10 rounded-sm">
              <h2 className="text-2xl font-serif font-bold mb-8 text-white">FAQ — Lo que necesitas saber</h2>
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-gold-400 mb-2 uppercase text-xs tracking-widest">¿Por qué no basta con comprar el más barato de Alemania?</h4>
                  <p className="text-gray-400 text-sm">Porque sin historial completo, el riesgo de averías ocultas y depreciación es masivo.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gold-400 mb-2 uppercase text-xs tracking-widest">¿Cuánto ahorro respecto a España?</h4>
                  <p className="text-gray-400 text-sm">El ahorro real está en obtener mucho más equipamiento y mejor vida por el mismo dinero.</p>
                </div>
              </div>
            </section>

            {/* CONCLUSIÓN Y CTA */}
            <div className="mt-20 p-1 bg-gradient-to-r from-gold-600 to-gold-400">
              <div className="bg-black p-12 text-center">
                <h2 className="text-3xl font-serif font-bold mb-4 text-white uppercase tracking-tighter">No se trata solo de importar... sino de elegir bien</h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">En Premium German Cars analizamos cada vehículo como una inversión personal.</p>
                <a href="/#import" className="inline-flex items-center gap-3 bg-gold-400 text-black px-10 py-4 font-bold uppercase tracking-tighter hover:bg-white transition-all duration-300">
                  Contáctanos hoy mismo <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ArticuloModelos2026;
