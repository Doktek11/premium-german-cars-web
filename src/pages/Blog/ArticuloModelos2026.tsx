import React from 'react';
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import { CheckCircle, AlertTriangle, Mail, Star, ShieldCheck, Zap } from 'lucide-react';

const ArticuloModelos2026 = () => {
  return (
    <>
      <SEO 
        title="Los 5 mejores coches para importar de Alemania en 2026 | Premium German Cars"
        description="Guía de compra inteligente: historial real, criterio profesional y valor de reventa en España."
      />
      <Navbar />
      
      <main className="bg-black text-white pt-32 md:pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* CABECERA */}
          <header className="mb-12">
            <span className="text-gold-400 font-bold tracking-widest text-xs uppercase italic">Estrategia de Mercado 2026</span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold mt-4 mb-6 leading-tight">
              Los 5 mejores coches para importar de Alemania en 2026: guía de compra inteligente
            </h1>
            <div className="flex items-center gap-4 text-gray-500 text-sm italic">
              <span>Premium German Cars</span>
              <span className="w-1 h-1 bg-gold-400 rounded-full"></span>
              <span>2 Ene, 2026</span>
            </div>
          </header>

          {/* Hero Visual PGC */}
          <div className="h-64 md:h-80 w-full bg-gradient-to-br from-metallic-800 to-black border border-white/5 flex items-center justify-center mb-16 relative overflow-hidden">
             <img src="/logoPGC.svg" className="w-48 opacity-10 brightness-0 invert" alt="PGC Logo" />
             <div className="absolute bottom-4 right-6 text-gold-400/30 font-serif italic text-4xl md:text-6xl select-none">Smart Choice</div>
          </div>

          {/* INTRODUCCIÓN */}
          <div className="prose prose-invert prose-gold max-w-none text-gray-300 leading-relaxed">
            <p className="text-lg md:text-xl text-gray-200 mb-8 font-light italic border-l-4 border-gold-400 pl-6 text-justify">
              Importar un coche de Alemania en 2026 sigue siendo una de las decisiones más inteligentes para quienes buscan calidad, pero solo si se hace con criterio profesional. La importación de coches desde Alemania continúa ofreciendo una ventaja competitiva frente al mercado nacional: mantenimiento riguroso, configuraciones más completas y un historial de conservación mucho más transparente.
            </p>
            
            <p className="mb-8 text-base md:text-lg text-justify">
              Sin embargo, en un entorno donde las normativas de emisiones son cada vez más estrictas, ya no basta con “traer un coche”. La diferencia real no está en el país de origen, sino en qué unidad eliges, cómo se verifica y con qué garantías llega a España. En <strong>Premium German Cars</strong> entendemos la compra de coches importados de Alemania no solo como una transacción, sino como la selección de un activo que conserve su valor en el tiempo.
            </p>

            {/* SECCIÓN 1: POR QUÉ ALEMANIA */}
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gold-400 mt-12 mb-6 uppercase tracking-wider">
              ¿Por qué importar de Alemania sigue teniendo sentido en 2026?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white/5 p-8 border-t-2 border-gold-400">
                <h3 className="text-white font-bold mb-3 uppercase text-lg tracking-widest text-gold-400">Equipamiento superior</h3>
                <p className="text-base md:text-lg text-gray-300">Es mucho más sencillo encontrar unidades con acabados deportivos (M Sport, S-Line, AMG Line) combinados con motorizaciones eficientes.</p>
              </div>
              <div className="bg-white/5 p-8 border-t-2 border-gold-400">
                <h3 className="text-white font-bold mb-3 uppercase text-lg tracking-widest text-gold-400">Movilidad garantizada</h3>
                <p className="text-base md:text-lg text-gray-300">Seleccionamos unidades que aseguran etiquetas ambientales C o ECO, imprescindibles para las Zonas de Bajas Emisiones (ZBE) en España.</p>
              </div>
            </div>

            <div className="bg-metallic-900/50 p-8 border border-white/10 rounded-sm mb-12">
              <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center text-white">
                <CheckCircle className="text-gold-400 mr-3" size={24} /> Beneficios reales para ti:
              </h3>
              <ul className="space-y-4 text-lg md:text-xl">
                <li className="flex items-start"><span className="text-gold-400 mr-3">•</span> Historial de mantenimiento mucho más completo y documentado.</li>
                <li className="flex items-start"><span className="text-gold-400 mr-3">•</span> Unidades “Full Equip” con asistentes y acabados poco habituales en España.</li>
                <li className="flex items-start"><span className="text-gold-400 mr-3">•</span> Mayor valor de reventa gracias a la trazabilidad alemana oficial.</li>
                <li className="flex items-start"><span className="text-gold-400 mr-3">•</span> Transparencia absoluta: menor riesgo de sorpresas mecánicas.</li>
              </ul>
            </div>

            {/* SECCIÓN 2: TRAZABILIDAD */}
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gold-400 mt-12 mb-6 uppercase tracking-wider">
              Trazabilidad real: el verdadero lujo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              <div className="bg-white/5 border border-white/10 p-6 rounded-sm italic text-base md:text-lg text-gray-200 leading-snug">"Procedencia clara (matriz de marca o concesionarios oficiales)."</div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-sm italic text-base md:text-lg text-gray-200 leading-snug">"Mantenimientos sellados siempre en servicio oficial."</div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-sm italic text-base md:text-lg text-gray-200 leading-snug">"Kilometraje verificado y documentado mediante registros."</div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-sm italic text-base md:text-lg text-gray-200 leading-snug">"La transparencia no es un extra: es la base de la seguridad."</div>
            </div>

            {/* SECCIÓN 3: LOS MODELOS */}
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-gold-400 mt-16 mb-12 uppercase tracking-wider text-center">
              Selección inteligente 2026
            </h2>

            {/* MODELO 1 */}
            <div className="mb-10 p-8 border border-white/10 bg-metallic-900/30 rounded-sm">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">🏁 1. BMW Serie 1 (F40)</h3>
              <p className="mb-2 text-base md:text-lg"><strong>¿Por qué es una oportunidad?</strong> Puerta de entrada equilibrada al ecosistema BMW con tecnología como Live Cockpit Professional.</p>
              <p className="mb-4 text-base md:text-lg text-gray-300"><strong>Qué buscamos para ti:</strong> Versiones 118i o 120d, un solo propietario y mantenimiento completo en BMW.</p>
              <p className="text-gold-400 italic font-medium text-lg flex items-center gap-2">
                <Star size={18} /> Valor para ti: Excelente equilibrio entre consumo, fiabilidad y alta demanda en España.
              </p>
            </div>

            {/* MODELO 2 */}
            <div className="mb-10 p-8 border border-white/10 bg-metallic-900/30 rounded-sm">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">🚗 2. Volkswagen Golf</h3>
              <p className="mb-2 text-base md:text-lg"><strong>¿Por qué destaca?</strong> Unidades con IQ.Drive y faros Matrix LED, combinaciones poco frecuentes en el mercado nacional.</p>
              <p className="mb-4 text-base md:text-lg text-gray-300"><strong>Qué buscamos para ti:</strong> Historial de servicio digital completo y certificación de estado mecánico.</p>
              <p className="text-gold-400 italic font-medium text-lg flex items-center gap-2">
                <Star size={18} /> Valor para ti: El coche “líquido” por excelencia: salida rápida en reventa y gran retención de valor.
              </p>
            </div>

            {/* MODELO 3 */}
            <div className="mb-10 p-8 border border-white/10 bg-metallic-900/30 rounded-sm">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">📱 3. Audi A3 Sportback</h3>
              <p className="mb-2 text-base md:text-lg"><strong>¿Por qué es interesante?</strong> Calidad de rodadura superior. Priorizamos versiones con microhibridación para obtener la etiqueta ECO.</p>
              <p className="mb-4 text-base md:text-lg text-gray-300"><strong>Qué buscamos para ti:</strong> Equipamiento S-Line y trazabilidad 100 % oficial.</p>
              <p className="text-gold-400 italic font-medium text-lg flex items-center gap-2">
                <Star size={18} /> Valor para ti: Diseño moderno y movilidad sin restricciones en grandes ciudades.
              </p>
            </div>

            {/* MODELO 4 */}
            <div className="mb-10 p-8 border border-white/10 bg-metallic-900/30 rounded-sm">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">✨ 4. Mercedes-Benz Clase A</h3>
              <p className="mb-2 text-base md:text-lg"><strong>¿Por qué es una oportunidad?</strong> Cuenta con la interfaz MBUX. En Alemania accedemos a unidades de flotas premium con muy poco uso.</p>
              <p className="mb-4 text-base md:text-lg text-gray-300"><strong>Qué buscamos para ti:</strong> Kilometraje real verificable y ausencia total de daños estructurales.</p>
              <p className="text-gold-400 italic font-medium text-lg flex items-center gap-2">
                <Star size={18} /> Valor para ti: Diseño atractivo y demanda constante que protege tu inversión a futuro.
              </p>
            </div>

            {/* MODELO 5 */}
            <div className="mb-10 p-8 border border-white/10 bg-metallic-900/30 rounded-sm">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">🛻 5. BMW X1</h3>
              <p className="mb-2 text-base md:text-lg"><strong>¿Por qué merece atención?</strong> Combina espacio y dinamismo. Ideal para familias que buscan un SUV premium polivalente.</p>
              <p className="mb-4 text-base md:text-lg text-gray-300"><strong>Qué buscamos para ti:</strong> Trazabilidad clara desde origen y estado estético impecable.</p>
              <p className="text-gold-400 italic font-medium text-lg flex items-center gap-2">
                <Star size={18} /> Valor para ti: Los SUV compactos son el segmento que mejor mantiene el precio en España.
              </p>
            </div>

            {/* METODOLOGÍA - CORREGIDA CON TEXTO GRANDE */}
            <section className="mt-24">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gold-400 mb-10 uppercase tracking-wider text-center">Metodología Premium German Cars</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 border border-white/10 bg-white/5 rounded-sm flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-gold-400 text-black rounded-full flex items-center justify-center font-bold text-xl mb-6">1</div>
                  <h4 className="font-bold text-white text-xl md:text-2xl mb-4 uppercase tracking-tight">Inspección</h4>
                  <p className="text-lg text-gray-300 leading-relaxed">Revisión mecánica y estructural basada en datos contrastados.</p>
                </div>
                <div className="p-8 border border-white/10 bg-white/5 rounded-sm flex flex-col items-center text-center text-justify">
                  <div className="h-12 w-12 bg-gold-400 text-black rounded-full flex items-center justify-center font-bold text-xl mb-6">2</div>
                  <h4 className="font-bold text-white text-xl md:text-2xl mb-4 uppercase tracking-tight">Gestión</h4>
                  <p className="text-lg text-gray-300 leading-relaxed">Importación, ITV, matriculación y gestión integral de impuestos.</p>
                </div>
                <div className="p-8 border border-white/10 bg-white/5 rounded-sm flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-gold-400 text-black rounded-full flex items-center justify-center font-bold text-xl mb-6">3</div>
                  <h4 className="font-bold text-white text-xl md:text-2xl mb-4 uppercase tracking-tight">Entrega</h4>
                  <p className="text-lg text-gray-300 leading-relaxed">Tú solo disfrutas del coche con la tranquilidad de una decisión correcta.</p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="mt-24 mb-12 bg-white/5 border border-white/10 p-8 md:p-12 rounded-sm">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8 text-white">FAQ — Preguntas Frecuentes</h2>
              <div className="space-y-8 text-lg">
                <div>
                  <h4 className="font-bold text-gold-400 mb-2 uppercase text-base tracking-widest">¿Por qué no el más barato de internet?</h4>
                  <p className="text-gray-300 leading-relaxed">Porque suele esconder falta de historial oficial o siniestros ocultos. A largo plazo, las averías superan con creces el ahorro inicial.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gold-400 mb-2 uppercase text-base tracking-widest">¿Compensa frente a España?</h4>
                  <p className="text-gray-300 leading-relaxed">Sí, por el binomio estado + equipamiento. Obtienes un coche superior y mejor cuidado por el mismo presupuesto.</p>
                </div>
              </div>
            </section>

            {/* CONCLUSIÓN Y CTA */}
            <div className="mt-24 p-1 bg-gradient-to-r from-gold-600 to-gold-400">
              <div className="bg-black p-10 md:p-16 text-center">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white uppercase tracking-tighter italic leading-tight">No se trata solo de importar... sino de elegir bien</h2>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">En Premium German Cars analizamos cada vehículo como si fuera para nosotros mismos.</p>
                <a href="/#import" className="inline-flex items-center gap-3 bg-gold-400 text-black px-12 py-5 font-bold uppercase tracking-tighter hover:bg-white transition-all duration-300 text-lg">
                  Contáctanos hoy mismo <Mail size={22} />
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
