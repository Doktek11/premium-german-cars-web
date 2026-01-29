import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { SEO } from "../../components/SEO";
import { 
  ChevronLeft, 
  CheckCircle2, 
  ArrowRight, 
  Calculator,
  AlertTriangle,
  Scale,
  FileText,
  Truck,
  ShieldCheck,
  Search,
  Euro
} from 'lucide-react';

const CosteImportacionAlemania2026 = () => {
  return (
    <>
      <SEO 
        title="¿Cuánto cuesta importar un coche de Alemania en 2026? | PGC"
        description="Domina la logística y fiscalidad para importar tu coche de Alemania. Expertos en transporte de coches, ITP en Cataluña y etiquetas DGT."
        article={true}
        image="/logoPGC.svg"
        canonical="https://premiumgermancars.com/blog/cuanto-costa-importar-coche-alemania-2026"
      />
      
      <Navbar />
      
      <main className="bg-black text-white pt-40 pb-20 font-sans">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* CABECERA */}
          <header className="mb-16">
            <Link to="/blog" className="text-gray-500 hover:text-gold-400 mb-10 inline-flex items-center gap-2 transition-all group tracking-[0.2em] text-[10px] uppercase font-bold">
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Volver al Blog
            </Link>
            <div className="space-y-4">
              <span className="inline-block bg-red-950/20 text-red-500 px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-black border border-red-500/20">
                Guía Fiscal & Gestión de Activos
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">
                ¿Cuánto cuesta realmente <span className="text-gold-400 block md:inline italic">importar un coche de Alemania en 2026?</span>
              </h1>
            </div>
            <div className="flex items-center gap-6 mt-10 text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold">
              <span>Premium German Cars</span>
              <span className="w-8 h-[1px] bg-gold-400/30"></span>
              <span>19 Enero, 2026</span>
            </div>
          </header>

          {/* HERO VISUAL */}
          <div className="aspect-[21/9] w-full bg-[#0a0a0a] border border-white/5 flex flex-col items-center justify-center mb-20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-600/5 via-transparent to-transparent opacity-50"></div>
              <img src="/logoPGC.svg" className="w-64 opacity-20 brightness-0 invert transition-transform duration-700 group-hover:scale-110" alt="PGC Logo" />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold-400/40 font-serif italic text-xs tracking-[0.5em] uppercase text-center w-full px-4">
                Estrategia en Logística y Fiscalidad Premium
              </div>
          </div>

          <div className="prose prose-invert prose-gold max-w-none text-gray-300 leading-relaxed">
            
            {/* INTRODUCCIÓN */}
            <section className="mb-20">
              <p className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
                Cada mes recibimos clientes en nuestra base de Cambrils que llegan convencidos de haber encontrado una gran oportunidad en Mobile.de. Sin embargo, cuando hablamos de coches importados de Alemania, el ahorro real rara vez está en el precio del anuncio.
              </p>
              <p className="mb-6 text-justify text-lg text-gray-400">
                Importar un coche de Alemania a España en 2026 exige dominar logística, fiscalidad y normativa técnica. Y esto es especialmente relevante si resides en <strong>Cataluña</strong>, donde una mala interpretación administrativa puede transformar una compra inteligente en un error costoso. Por eso, antes de preguntarte cuánto cuesta importar un coche de Alemania, conviene entender dónde se gana —y dónde se pierde— el dinero de verdad.
              </p>
            </section>

            {/* SECCIÓN 1: LOGÍSTICA */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <Truck size={14} /> 01. Transporte de coches de Alemania a España
              </h2>
              <p className="text-lg mb-8">
                El transporte de coches de Alemania a España se ha convertido en uno de los factores más determinantes en el coste final de una importación. No se trata únicamente de mover un vehículo, sino de coordinar una logística profesional que evite retrasos y sobrecostes.
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-10">
                <div className="bg-[#0a0a0a] p-6 border border-white/5">
                  <ShieldCheck className="text-gold-400 mb-4" size={20} />
                  <h4 className="text-white font-bold text-xs uppercase mb-2 tracking-widest">Seguro Total</h4>
                  <p className="text-xs text-gray-500">Transporte profesional asegurado sin intermediarios informales.</p>
                </div>
                <div className="bg-[#0a0a0a] p-6 border border-white/5">
                  <Search className="text-gold-400 mb-4" size={20} />
                  <h4 className="text-white font-bold text-xs uppercase mb-2 tracking-widest">Trazabilidad</h4>
                  <p className="text-xs text-gray-500">Seguimiento 24/7 desde la carga en origen hasta España.</p>
                </div>
                <div className="bg-[#0a0a0a] p-6 border border-white/5">
                  <Scale className="text-gold-400 mb-4" size={20} />
                  <h4 className="text-white font-bold text-xs uppercase mb-2 tracking-widest">Optimización</h4>
                  <p className="text-xs text-gray-500">Rutas clave para mantener un precio de transporte competitivo.</p>
                </div>
              </div>
            </section>

            {/* SECCIÓN 2: FAMILIAR PREMIUM */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <Euro size={14} /> 02. La tendencia del Familiar Premium
              </h2>
              <p className="text-lg mb-6">
                Observamos un cambio claro: el interés por el <strong>familiar premium</strong> crece por encima del SUV tradicional debido a su equilibrio entre espacio, dinamismo y eficiencia fiscal.
              </p>
              
              <div className="bg-gold-400/5 border border-gold-400/20 p-8 my-10 relative">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2 italic">
                  Caso de Éxito: BMW 318i Touring
                </h4>
                <p className="text-sm text-gray-400">
                  Mientras muchos SUV son penalizados por emisiones de CO₂, un Touring permite optimizar el gasto total de importar un coche de Alemania, manteniendo el nivel de lujo y prestaciones de una marca premium.
                </p>
              </div>
            </section>

            {/* SECCIÓN 3: FACTOR CATALUÑA */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <AlertTriangle size={14} /> 03. El Factor Cataluña: ITP y Gestión Fiscal
              </h2>
              <p className="mb-6">
                Para quienes buscan importar a Cataluña (Reus, Tarragona o Barcelona), la fiscalidad es crítica. El impuesto de matriculación basado en el CoC puede duplicarse ante una interpretación técnica incorrecta.
              </p>
              <div className="bg-red-950/10 border-l-4 border-red-600 p-8 font-bold">
                <p className="text-white text-sm italic leading-relaxed">
                  "En Cataluña, el ITP para determinados vehículos de alta gama puede alcanzar el <strong>16%</strong> si existe una declaración incorrecta."
                </p>
              </div>
            </section>

            {/* SECCIÓN 4: DGT */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <FileText size={14} /> 04. Pegatina DGT y Distintivo Ambiental
              </h2>
              <p className="mb-6">
                La <strong>pegatina DGT</strong> es ya un factor decisivo. En PGC seleccionamos unidades Euro 6, garantizando la obtención de la etiqueta C o ECO necesaria para circular por ZBE y proteger el valor futuro del coche.
              </p>
            </section>

            {/* SECCIÓN 5: AUDITORÍA */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <ShieldCheck size={14} /> 05. Auditoría Técnica: Más allá de lo visual
              </h2>
              <ul className="space-y-6 text-sm text-gray-400">
                <li className="flex gap-4"><CheckCircle2 size={18} className="text-gold-400 shrink-0" /> <strong>Diagnosis avanzada:</strong> Descarte de errores ocultos en sensores y sistemas de asistencia.</li>
                <li className="flex gap-4"><CheckCircle2 size={18} className="text-gold-400 shrink-0" /> <strong>Historial oficial:</strong> Contraste del libro digital en concesionarios de la marca.</li>
                <li className="flex gap-4"><CheckCircle2 size={18} className="text-gold-400 shrink-0" /> <strong>Certificación:</strong> Verificación mecánica y estructural completa.</li>
              </ul>
            </section>

            {/* CONCLUSIÓN Y CTA */}
            <div className="bg-[#0a0a0a] border border-gold-400/20 p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"></div>
                <h2 className="text-3xl font-bold mb-6 text-white leading-tight">
                  Importar con criterio <span className="text-gold-400 italic">marca la diferencia</span>
                </h2>
                <p className="text-gray-300 mb-10 text-base max-w-2xl mx-auto font-bold">
                  La optimización fiscal y el control del transporte de vehículos separan una buena compra de una mala experiencia.
                </p>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                  <Link 
                    to="/calculadora" 
                    className="inline-flex items-center justify-center gap-3 bg-gold-400 text-black px-12 py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-xl shadow-gold-400/5"
                  >
                    Probar Calculadora de Importación <Calculator size={16} />
                  </Link>
                  <a 
                    href="https://wa.me/34603743608?text=Hola,%20necesito%20asesoramiento%20técnico%20y%20fiscal%20para%20importar." 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 border border-white/10 text-white px-12 py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500"
                  >
                    Asesoramiento Directo <ArrowRight size={16} />
                  </a>
                </div>
                <p className="text-[9px] text-gray-600 mt-12 font-black tracking-[0.4em] uppercase">
                  👉 Premium German Cars — Cambrils | Gestión de Activos Premium
                </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CosteImportacionAlemania2026;
