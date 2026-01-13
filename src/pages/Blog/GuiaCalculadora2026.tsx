import React from 'react';
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
// AÑADIDO: AlertTriangle en los imports
import { CheckCircle, Calculator, Cpu, BadgeEuro, Mail, ArrowRight, AlertTriangle } from 'lucide-react';

const GuiaCalculadora2026 = () => {
  return (
    <>
      <SEO 
        title="Guía: Cómo calcular el impuesto de matriculación BOE 2025 | Premium German Cars" 
        description="Aprende a usar nuestra calculadora con IA para obtener valores BOE exactos y calcular la depreciación real mes a mes de tu coche de importación."
      />
      <Navbar />
      
      <main className="bg-black text-white pt-32 md:pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* CABECERA */}
          <header className="mb-12">
            <span className="text-gold-400 font-bold tracking-widest text-xs uppercase italic">Herramientas Profesionales</span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold mt-4 mb-6 leading-tight">
              Guía definitiva: cómo calcular el impuesto de matriculación según el BOE 2025 (paso a paso)
            </h1>
            <div className="flex items-center gap-4 text-gray-500 text-sm italic">
              <span>Premium German Cars</span>
              <span className="w-1 h-1 bg-gold-400 rounded-full"></span>
              <span>13 Ene, 2026</span>
            </div>
          </header>

          {/* Hero Visual PGC */}
          <div className="h-64 md:h-80 w-full bg-gradient-to-br from-gray-900 to-black border border-white/5 flex items-center justify-center mb-16 relative overflow-hidden">
             <img src="/logoPGC.svg" className="w-48 opacity-10 brightness-0 invert" alt="PGC Logo" />
             <div className="absolute bottom-4 right-6 text-gold-400/30 font-serif italic text-4xl md:text-6xl select-none">AI Powered</div>
          </div>

          {/* INTRODUCCIÓN */}
          <div className="prose prose-invert prose-gold max-w-none text-gray-300 leading-relaxed">
            <p className="text-lg md:text-xl text-gray-200 mb-8 font-light italic border-l-4 border-gold-400 pl-6 text-justify">
              Importar un coche de Alemania es una decisión inteligente, pero el impuesto de matriculación suele ser el principal foco de dudas —y de miedo— para muchos compradores. Tablas del BOE, coeficientes de depreciación, emisiones de CO₂… un pequeño error puede traducirse en cientos de euros de diferencia.
            </p>
            
            <p className="mb-8 text-base md:text-lg text-justify font-light">
              En <strong>Premium German Cars</strong> hemos diseñado una herramienta avanzada, apoyada por un asistente de IA especializado en el BOE, que te permite obtener un cálculo realista y actualizado en pocos minutos. Todos los cálculos se basan en las tablas oficiales del BOE 2025, vigentes durante todo 2026.
            </p>

            {/* SECCIÓN 1: PASO 1 */}
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gold-400 mt-12 mb-6 uppercase tracking-wider">
              Paso 1: obtén el valor BOE y las emisiones CO₂ con la IA
            </h2>
            <p className="mb-6 text-justify font-light">
              El primer paso no es la calculadora, sino averiguar los datos exactos del vehículo. En la parte superior de la herramienta verás el botón <strong>“Conocer valor BOE”</strong>, que te conecta con nuestro asistente de IA especializado.
            </p>

            <div className="mb-12 border border-white/10 bg-gray-900/30 p-4 rounded-sm">
              <img 
                src="/calculadora-impuesto-matriculacion-2026.webp" 
                alt="Interfaz calculadora Premium German Cars paso 1" 
                className="w-full h-auto mb-4 border border-white/5 shadow-2xl"
              />
              <p className="text-center text-xs text-gray-500 italic uppercase tracking-widest">Interfaz principal: accede al asistente de IA gratuito</p>
            </div>

            <div className="bg-gray-900/50 p-8 border border-white/10 rounded-sm mb-12">
              <h3 className="text-xl font-bold mb-4 flex items-center text-white italic">
                <Cpu className="text-gold-400 mr-3" size={20} /> ¿Cómo interactuar con la IA?
              </h3>
              <p className="text-sm md:text-base text-gray-400 mb-4 italic">Simplemente introduce la marca, modelo y año. Por ejemplo: "BMW 320d Touring, año 2022".</p>
              <ul className="space-y-4 text-base">
                <li className="flex items-start"><span className="text-gold-400 mr-3">✅</span> <strong>Valor inicial:</strong> Obtendrás el valor venal según BOE.</li>
                <li className="flex items-start"><span className="text-gold-400 mr-3">✅</span> <strong>Emisiones CO₂:</strong> Conocerás los gramos reales para asignar el tramo impositivo.</li>
              </ul>
            </div>

            {/* SECCIÓN 2: PASO 2 */}
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gold-400 mt-16 mb-6 uppercase tracking-wider">
              Paso 2: introduce los datos obtenidos
            </h2>
            <p className="mb-8 text-justify font-light italic">
              Una vez tienes los datos facilitados por nuestro asistente, es hora de volcar la información en la calculadora para aplicar la depreciación real.
            </p>

            <div className="mb-12 border border-white/10 bg-gray-900/30 p-4 rounded-sm">
              <img 
                src="/valor-boe-coche-alemania-ia.webp" 
                alt="Consulta valor venal BOE IA paso 2" 
                className="w-full h-auto mb-4 border border-white/5"
              />
              <p className="text-center text-xs text-gray-500 italic uppercase tracking-widest">Paso 2: La IA identifica el valor de 46.900€ y el tramo de CO2</p>
            </div>

            {/* SECCIÓN 3: DEMOSTRACIÓN PRÁCTICA */}
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gold-400 mt-16 mb-8 uppercase tracking-wider text-center">
              Demostración Práctica: BMW 320d
            </h2>

            <div className="mb-10 p-6 md:p-8 border border-white/10 bg-gray-900/30 rounded-sm">
              <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                <div className="flex-1 text-justify">
                  <h3 className="text-xl font-bold text-white mb-4 italic">Precisión por meses: el factor clave</h3>
                  <p className="text-sm md:text-base text-gray-400 mb-4">
                    Para este ejemplo, hemos ajustado un <strong>BMW 320d Touring de Junio 2022</strong>. No calculamos por años completos, sino por antigüedad real.
                  </p>
                  <p className="text-gold-400 font-medium text-sm md:text-base flex items-center gap-2">
                    <BadgeEuro size={16} /> Depreciación aplicada: 44% (Junio 2022).
                  </p>
                </div>
                <div className="flex-1 bg-white/5 p-6 border-l-2 border-gold-400">
                   <div className="text-3xl font-bold text-white mb-1">1.248€</div>
                   <div className="text-xs uppercase tracking-widest text-gray-500">Impuesto estimado final</div>
                </div>
              </div>

              <img 
                src="/depreciacion-boe-bmw-320d-touring.webp" 
                alt="Resultado final calculadora Premium German Cars" 
                className="w-full h-auto border border-white/5 shadow-2xl mb-4"
              />
              <p className="text-center text-xs text-gray-500 italic uppercase tracking-widest">Paso 3: Resultado final con todos los sliders ajustados al detalle</p>
            </div>

            {/* EXCEPCIÓN 16% */}
            <div className="bg-red-900/10 p-8 border border-red-900/20 rounded-sm mb-12">
              <h3 className="text-xl font-bold mb-4 flex items-center text-white">
                <AlertTriangle className="text-red-500 mr-3" size={20} /> ¿Coche antiguo o sin emisiones acreditadas?
              </h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed text-justify">
                Si tu vehículo no declara emisiones o resides en una CCAA con tipo incrementado (como Cataluña), marca la casilla correspondiente. Nuestra calculadora ajustará el cálculo al <strong>16%</strong> de forma automática para evitar sorpresas en Hacienda.
              </p>
            </div>

            {/* METODOLOGÍA */}
            <section className="mt-20">
              <h2 className="text-2xl font-serif font-bold text-gold-400 mb-8 uppercase tracking-wider text-center">Nuestra Garantía de Cálculo</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 border border-white/10 bg-white/5 rounded-sm">
                  <h4 className="font-bold text-white text-base mb-2 uppercase tracking-tight text-gold-400 flex items-center gap-2">
                    <Calculator size={16}/> Riguroso
                  </h4>
                  <p className="text-xs md:text-sm text-gray-400">Basado estrictamente en la Orden HAC/1501/2025 del BOE.</p>
                </div>
                <div className="p-6 border border-white/10 bg-white/5 rounded-sm">
                  <h4 className="font-bold text-white text-base mb-2 uppercase tracking-tight text-gold-400 flex items-center gap-2">
                    <Cpu size={16}/> Inteligente
                  </h4>
                  <p className="text-xs md:text-sm text-gray-400">IA entrenada para identificar modelos y emisiones al instante.</p>
                </div>
                <div className="p-6 border border-white/10 bg-white/5 rounded-sm">
                  <h4 className="font-bold text-white text-base mb-2 uppercase tracking-tight text-gold-400 flex items-center gap-2">
                    <ArrowRight size={16}/> Transparente
                  </h4>
                  <p className="text-xs md:text-sm text-gray-400">Muestra el tramo y la depreciación exacta aplicada en tu presupuesto.</p>
                </div>
              </div>
            </section>

            {/* CONCLUSIÓN Y CTA */}
            <div className="mt-20 p-1 bg-gradient-to-r from-gold-600 to-gold-400">
              <div className="bg-black p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-white uppercase tracking-tighter italic">Toma decisiones basadas en datos, no en suposiciones</h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm md:text-base font-light italic">
                  Prueba nuestra calculadora hoy mismo y planifica tu importación desde Alemania con total tranquilidad.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <a 
                    href="/calculadora-impuesto-matriculacion" 
                    className="inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 font-bold uppercase tracking-tighter hover:bg-gold-400 transition-all duration-300"
                  >
                    Ir a la calculadora <Calculator size={18} />
                  </a>
                  <a 
                    href="https://wa.me/34603743608?text=Hola,%20he%20visto%20la%20guía%20de%20la%20calculadora%20y%20me%20gustaría%20que%20me%20ayudarais%20con%20la%20importación%20de%20un%20vehículo." 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-gold-400 text-black px-8 py-4 font-bold uppercase tracking-tighter hover:bg-white transition-all duration-300"
                  >
                    Consultar por WhatsApp <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default GuiaCalculadora2026;
