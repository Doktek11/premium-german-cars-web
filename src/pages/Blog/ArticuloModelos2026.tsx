import React from 'react';
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import { CheckCircle, AlertTriangle, Mail, ShieldCheck, Zap, Globe, Car } from 'lucide-react';

const ArticuloModelos2026 = () => {
  return (
    <>
      <SEO 
        title="Los 5 mejores coches para importar de Alemania en 2026 | Premium German Cars"
        description="Guía de compra inteligente: historial real, criterio profesional y valor de reventa en España. Descubre los modelos clave para importar este año."
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
            <p className="text-lg md:text-xl text-gray-200 mb-8 font-light italic border-l-4 border-gold-400 pl-6">
              Importar un coche de Alemania en 2026 sigue siendo una de las decisiones más inteligentes para quienes buscan calidad, pero solo si se hace con criterio profesional. La importación ofrece una ventaja competitiva: mantenimiento riguroso, configuraciones más completas y un historial de conservación transparente.
            </p>
            
            <p className="mb-8 text-base md:text-lg">
              Sin embargo, en un entorno donde las normativas de emisiones son cada vez más estrictas, ya no basta con “traer un coche”. La diferencia real no está en el país de origen, sino en qué unidad eliges, cómo se verifica y con qué garantías llega a España. En <strong>Premium German Cars</strong> entendemos esta compra como la selección de un activo que conserve su valor en el tiempo.
            </p>

            {/* SECCIÓN 1: POR QUÉ ALEMANIA */}
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gold-400 mt-12 mb-6 uppercase tracking-wider">
              ¿Por qué importar de Alemania sigue teniendo sentido en 2026?
            </h2>
            <p className="mb-8 text-base md:text-lg">
              Alemania mantiene su histórica disciplina de mantenimiento, reforzada ahora por dos factores clave para el comprador español:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white/5 p-6 border-t-2 border-gold-400">
                <Zap className="text-gold-400 mb-4" />
                <h3 className="text-white font-bold mb-2">Equipamiento superior</h3>
                <p className="text-sm text-gray-400">Acabados M Sport, S-Line o AMG Line combinados con motores eficientes, difíciles de encontrar en España.</p>
              </div>
              <div className="bg-white/5 p-6 border-t-2 border-gold-400">
                <Globe className="text-gold-400 mb-4" />
                <h3 className="text-white font-bold mb-2">Movilidad garantizada</h3>
                <p className="text-sm text-gray-400">Unidades que aseguran etiquetas C o ECO, imprescindibles para circular por las ZBE en España sin restricciones.</p>
              </div>
            </div>

            {/* BENEFICIOS LIST */}
            <div className="bg-metallic-900/50 p-8 border border-white/10 rounded-sm mb-12">
              <h3 className="text-xl font-bold mb-6 flex items-center text-white">
                <CheckCircle className="text-gold-400 mr-3" size={20} /> Beneficios reales para ti:
              </h3>
              <ul className="space-y-4 text-base">
                <li className="flex items-start"><span className="text-gold-400 mr-3">•</span> Historial de mantenimiento mucho más completo y documentado.</li>
                <li className="flex items-start"><span className="text-gold-400 mr-3">•</span> Unidades “Full Equip” con asistentes poco habituales en el mercado nacional.</li>
                <li className="flex items-start"><span className="text-gold-400 mr-3">•</span> Mayor valor de reventa gracias a la trazabilidad alemana oficial.</li>
                <li className="flex items-start"><span className="text-gold-400 mr-3">•</span> Transparencia absoluta: menor riesgo de sorpresas mecánicas.</li>
              </ul>
            </div>

            {/* TRAZABILIDAD */}
            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-12 mb-6 uppercase tracking-wider">
              Trazabilidad real: el verdadero lujo
            </h2>
            <p className="mb-8 text-base md:text-lg">
              Filtramos más del 90% de la oferta disponible. Solo trabajamos con vehículos que cumplen criterios estrictos:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {['Procedencia clara (Matriz de marca)', 'Mantenimientos sellados en servicio oficial', 'Kilometraje verificado y documentado', 'Historial limpio de siniestros'].map((text, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-sm border border-white/5">
                  <ShieldCheck size={18} className="text-gold-400" />
                  <span className="text-sm italic text-gray-300">{text}</span>
                </div>
              ))}
            </div>

            {/* MODELOS */}
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gold-400 mt-16 mb-8 uppercase tracking-wider text-center">
              Nuestra selección inteligente para 2026
            </h2>

            {[
              {
                num: "1",
                title: "BMW Serie 1 (F40) — El compacto premium racional",
                oportunidad: "Puerta de entrada equilibrada al ecosistema BMW. En Alemania abundan unidades con acabado M Sport y Live Cockpit Professional.",
                buscar: "Versiones 118i o 120d, un solo propietario y mantenimiento en BMW.",
                valor: "Excelente equilibrio entre consumo, fiabilidad y alta demanda en España."
              },
              {
                num: "2",
                title: "Volkswagen Golf — La referencia constante",
                oportunidad: "Las unidades alemanas incluyen el paquete IQ.Drive y faros Matrix LED, combinaciones poco frecuentes en España.",
                buscar: "Historial de servicio digital completo y certificación de estado mecánico.",
                valor: "El coche “líquido” por excelencia: salida rápida en reventa y gran retención de valor."
              },
              {
                num: "3",
                title: "Audi A3 Sportback — Tecnología y movilidad ZBE",
                oportunidad: "Destaca por calidad de rodadura. En 2026 priorizamos versiones con microhibridación para obtener la etiqueta ECO.",
                buscar: "Equipamiento S-Line y trazabilidad 100% oficial.",
                valor: "Para el comprador exigente que busca diseño moderno sin restricciones de movilidad."
              },
              {
                num: "4",
                title: "Mercedes-Benz Clase A — Confort y estatus",
                oportunidad: "Interfaz MBUX líder. El mercado alemán de flotas premium permite acceder a unidades muy bien configuradas y con poco uso.",
                buscar: "Kilometraje real verificable y ausencia total de daños estructurales.",
                valor: "Diseño atractivo y demanda constante que protege tu inversión a futuro."
              },
              {
                num: "5",
                title: "BMW X1 — El SUV versátil",
                oportunidad: "Combina espacio y dinamismo. Ideal para familias que buscan un SUV premium polivalente con reputación sólida.",
                buscar: "Trazabilidad clara desde origen y estado estético impecable.",
                valor: "Los SUV compactos son el segmento que mejor mantiene el precio en España."
              }
            ].map((modelo) => (
              <div key={modelo.num} className="mb-10 p-6 md:p-8 border border-white/10 bg-metallic-900/30 rounded-sm hover:border-gold-400/50 transition-colors">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{modelo.num}. {modelo.title}</h3>
                <p className="mb-3 text-sm md:text-base text-gray-300"><strong>¿Por qué es una oportunidad?</strong> {modelo.oportunidad}</p>
                <p className="mb-3 text-sm md:text-base text-gray-300"><strong>Qué buscamos para ti:</strong> {modelo.buscar}</p>
                <p className="text-gold-400 italic font-medium text-sm md:text-base flex items-center gap-2">
                  <Star size={14} /> Valor para ti: {modelo.valor}
                </p>
              </div>
            ))}

            {/* METODOLOGÍA */}
            <section className="mt-20">
              <h2 className="text-2xl font-serif font-bold text-gold-400 mb-8 uppercase tracking-wider">Metodología Premium German Cars</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-gold-400 text-black h-8 w-8 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-white">Inspección técnica rigurosa</h4>
                    <p className="text-sm text-gray-400 italic">Revisamos mecánica, electrónica y estructura. Datos contrastados, nunca suposiciones.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-gold-400 text-black h-8 w-8 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-white">Gestión integral</h4>
                    <p className="text-sm text-gray-400 italic">Negociación, importación, ITV, matriculación y gestión de impuestos.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-gold-400 text-black h-8 w-8 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-white">Entrega en mano</h4>
                    <p className="text-sm text-gray-400 italic">Tú solo disfrutas del coche con la tranquilidad de una decisión correcta.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="mt-20 mb-12 bg-white/5 border border-white/10 p-6 md:p-10 rounded-sm">
              <h2 className="text-2xl font-serif font-bold mb-8 text-white">FAQ — Lo que debes saber</h2>
              <div className="space-y-8 text-base">
                <div>
                  <h4 className="font-bold text-gold-400 mb-2 uppercase text-xs tracking-widest">¿Por qué no el más barato de internet?</h4>
                  <p className="text-gray-400 text-sm md:text-base">Porque suele esconder falta de mantenimiento oficial. A medio plazo, la depreciación y averías superan el ahorro inicial.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gold-400 mb-2 uppercase text-xs tracking-widest">¿Compensa frente a España?</h4>
                  <p className="text-gray-400 text-sm md:text-base">Sí, especialmente en el binomio estado + equipamiento. Obtienes un coche superior por el mismo presupuesto.</p>
                </div>
              </div>
            </section>

            {/* CONCLUSIÓN Y CTA */}
            <div className="mt-20 p-1 bg-gradient-to-r from-gold-600 to-gold-400">
              <div className="bg-black p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-white uppercase tracking-tighter">No se trata solo de importar... sino de elegir bien</h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm md:text-base">
                  En Premium German Cars priorizamos transparencia y valor futuro. Si buscas asesoramiento profesional, estamos aquí.
                </p>
                <a href="/#import" className="inline-flex items-center gap-3 bg-gold-400 text-black px-8 md:px-10 py-4 font-bold uppercase tracking-tighter hover:bg-white transition-all duration-300 text-sm md:text-base">
                  Recibir evaluación profesional <Mail size={18} />
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
