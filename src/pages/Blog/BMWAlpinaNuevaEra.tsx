import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { SEO } from "../../components/SEO";
import { 
  ChevronLeft, 
  CheckCircle2, 
  Mail, 
  ArrowRight, 
  Gem,
  Trophy,
  ShieldCheck,
  Star
} from 'lucide-react';
import { SeoIntentLinks, seoIntentLinks } from "../../components/SeoIntentLinks";

const BMWAlpinaNuevaEra = () => {
  return (
    <>
      <SEO 
        title="BMW y Alpina: El futuro del Lujo Automotriz en 2026 | PGC"
        description="Análisis de la integración de Alpina en BMW Group. Qué significa para el mercado de importación y por qué las unidades pre-2026 son una inversión clave."
        article={true}
        image="/logoPGC.svg"
        canonical="https://www.premiumgermancars.com/blog/bmw-alpina-nueva-era-lujo-aleman"
      />
      
      <Navbar />
      
      <main className="bg-black text-white pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 font-sans">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          
          {/* CABECERA */}
          <header className="mb-16">
            <Link to="/blog" className="text-gray-500 hover:text-gold-400 mb-10 inline-flex items-center gap-2 transition-all group tracking-[0.2em] text-[10px] uppercase font-bold">
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Volver al Blog
            </Link>
            <div className="space-y-4">
              <span className="inline-block bg-gold-950/30 text-gold-400 px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-black border border-gold-400/20">
                Análisis de Mercado & Exclusividad
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">
                BMW y Alpina: el nacimiento de una <span className="text-gold-400 block md:inline italic">nueva era en el lujo alemán</span>
              </h1>
            </div>
            <div className="flex items-center gap-6 mt-10 text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold">
              <span>Premium German Cars</span>
              <span className="w-8 h-[1px] bg-gold-400/30"></span>
              <span>9 Enero, 2026</span>
            </div>
          </header>

          {/* HERO VISUAL */}
          <div className="aspect-[21/9] w-full bg-[#0a0a0a] border border-white/5 flex flex-col items-center justify-center mb-20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-600/5 via-transparent to-transparent opacity-50"></div>
              <img src="/logoPGC.svg" className="w-64 opacity-20 brightness-0 invert transition-transform duration-700 group-hover:scale-110" alt="PGC Logo" />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold-400/40 font-serif italic text-xs tracking-[0.5em] uppercase">
                Edición de Coleccionista e Importación
              </div>
          </div>

          <div className="prose prose-invert prose-gold max-w-none text-gray-300 leading-relaxed">
            
            {/* INTRODUCCIÓN */}
            <section className="mb-20">
              <p className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
                La industria del automóvil alemán atraviesa uno de los momentos de transformación más profundos de su historia reciente. La integración oficial de Alpina dentro de BMW Group marca un hito en la jerarquía del lujo.
              </p>
              <p className="mb-6 text-justify text-lg text-gray-400">
                En un escenario marcado por la electrificación y la estandarización tecnológica, esta operación va mucho más allá de una decisión corporativa. Para los entusiastas de la marca —y para muchos de nuestros clientes en <strong>Premium German Cars</strong>— marca el inicio de una nueva etapa en el alto rendimiento refinado.
              </p>
            </section>

            {/* SECCIÓN 1 */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <Gem size={14} /> ¿Qué significa realmente la integración?
              </h2>
              <p className="text-lg mb-8 text-justify">
                Hasta ahora, Alpina operaba como fabricante independiente reconocido oficialmente, utilizando bases mecánicas BMW para desarrollar vehículos con un enfoque muy definido: <strong>más refinado, más exclusivo y profundamente orientado al confort de altas prestaciones</strong>, frente a la deportividad radical de BMW M.
              </p>
              <div className="bg-[#0a0a0a] p-8 border border-white/5">
                <p className="text-white font-medium mb-0 italic">
                  "A partir de 2026, Alpina se convierte en una división de lujo extremo, situada estratégicamente por encima de BMW M y complementando el posicionamiento de Rolls-Royce."
                </p>
              </div>
            </section>

            {/* SECCIÓN 2 - ENUMERACIÓN AGIL */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-10 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <Star size={14} /> Claves de esta nueva etapa
              </h2>

              <div className="space-y-16">
                {/* CLAVE 1 */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-gold-400 text-sm">01.</span> Garantía de continuidad y futuro
                  </h3>
                  <p className="text-gray-400 mb-6">Como fabricante independiente, adaptarse a la normativa futura suponía un reto complejo. Bajo el paraguas de BMW Group, Alpina contará con respaldo tecnológico, capacidad industrial y estabilidad financiera sin renunciar a su filosofía de lujo discreto.</p>
                </div>

                {/* CLAVE 2 */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-gold-400 text-sm">02.</span> Soporte técnico y mantenimiento reforzado
                  </h3>
                  <p className="text-gray-400 mb-6 text-justify">Para propietarios actuales y futuros, la red oficial de BMW asumirá un papel más relevante en mantenimiento especializado y disponibilidad de recambios. Esto facilitará la gestión de servicios oficiales también en España.</p>
                </div>

                {/* CLAVE 3 */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-gold-400 text-sm">03.</span> Valor de reventa y carácter coleccionable
                  </h3>
                  <p className="text-gray-400 mb-6">Las unidades producidas en Buchloe bajo el modelo artesanal son ahora piezas "pre-integración". Todo apunta a que estos vehículos conservarán y reforzarán su valor a largo plazo entre coleccionistas informados.</p>
                </div>
              </div>
            </section>

            {/* SECCIÓN COMPETICIÓN */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <Trophy size={14} /> El ADN Alpina y la Competición
              </h2>
              <div className="bg-gradient-to-r from-gold-400/5 to-transparent p-8 border-l-2 border-gold-400">
                <p className="text-base text-gray-400 italic leading-relaxed">
                  Alpina construyó parte de su leyenda en circuitos como Spa-Francorchamps. En el nuevo contexto, no resulta descabellado pensar en programas de alto rendimiento enfocados en categorías GT o "gentleman racing", diferenciándose de la visión puramente cronométrica de BMW M.
                </p>
              </div>
            </section>

            {/* IMPORTACIÓN */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <ShieldCheck size={14} /> Importar un Alpina desde Alemania
              </h2>
              <p className="text-lg mb-10">
                En <strong>Premium German Cars</strong> detectamos un creciente interés por modelos como el Alpina B3, B4 o D5 S. Nuestro enfoque para estos vehículos es deliberadamente conservador:
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#050505] p-8 border border-white/5">
                  <h4 className="text-gold-400 font-bold uppercase text-[10px] tracking-widest mb-4">Trazabilidad Garantizada</h4>
                  <ul className="space-y-3 text-sm text-gray-400">
                    <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-gold-400 mt-1 shrink-0" /> Verificación de número de bastidor.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-gold-400 mt-1 shrink-0" /> Historial completo en Alemania.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-gold-400 mt-1 shrink-0" /> Mantenimiento coherente oficial.</li>
                  </ul>
                </div>
                <div className="bg-[#050505] p-8 border border-white/5">
                  <h4 className="text-gold-400 font-bold uppercase text-[10px] tracking-widest mb-4">Gestión Llave en Mano</h4>
                  <ul className="space-y-3 text-sm text-gray-400">
                    <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-gold-400 mt-1 shrink-0" /> Cálculo preciso de impuestos BOE 2026.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-gold-400 mt-1 shrink-0" /> Logística de transporte especializado.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-gold-400 mt-1 shrink-0" /> Matriculación definitiva en España.</li>
                  </ul>
                </div>
              </div>
            </section>

            <SeoIntentLinks
              title="Importar un Alpina exige más verificación"
              intro="En unidades exclusivas, el coste fiscal, la trazabilidad y el vendedor pesan tanto como la configuración del coche."
              links={seoIntentLinks.alpina}
            />

            {/* CONCLUSIÓN Y CTA */}
            <div className="bg-[#0a0a0a] border border-gold-400/20 p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"></div>
                <h2 className="text-3xl font-bold mb-6 text-white leading-tight">
                  El Momento de los <span className="text-gold-400 italic">Coleccionistas Informados</span>
                </h2>
                <p className="text-gray-300 mb-10 text-base max-w-2xl mx-auto font-bold">
                  La clave no está en el precio, sino en saber elegir el momento, la unidad y el origen correcto. En Premium German Cars asesoramos con visión de futuro y transparencia.
                </p>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                  <a 
                    href="https://wa.me/34603743608?text=Hola,%20he%20leído%20el%20artículo%20sobre%20Alpina%20y%20me%20gustaría%20información%20sobre%20importación." 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-gold-400 text-black px-12 py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all duration-500"
                  >
                    Consultar Disponibilidad Alpina <Mail size={16} />
                  </a>
                  <Link to="/calculadora-impuesto-matriculacion" className="inline-flex items-center justify-center gap-3 border border-white/10 text-white px-12 py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500">
                    Calculadora de Impuestos <ArrowRight size={16} />
                  </Link>
                </div>
                <p className="text-[9px] text-gray-600 mt-12 font-black tracking-[0.4em] uppercase">
                  👉 Especialistas en Importación Premium — Cambrils | Tarragona
                </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BMWAlpinaNuevaEra;
