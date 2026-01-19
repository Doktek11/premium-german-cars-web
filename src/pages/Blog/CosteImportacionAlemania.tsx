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
        description="Guía completa sobre impuestos, ITP del 16% en Cataluña y costes reales de importación. Aprende a evitar errores fiscales en tu coche alemán."
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
                Transparencia Fiscal en Cataluña y España
              </div>
          </div>

          <div className="prose prose-invert prose-gold max-w-none text-gray-300 leading-relaxed">
            
            {/* INTRODUCCIÓN */}
            <section className="mb-20">
              <p className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
                Cada mes vemos clientes de Reus, Tarragona y otras zonas de Cataluña que llegan convencidos de haber ahorrado tras encontrar un precio en Mobile.de… y descubren demasiado tarde que la realidad fiscal es otra.
              </p>
              <p className="mb-6 text-justify text-lg text-gray-400">
                El error más común es pensar que el precio en Alemania es el precio final. Dependiendo de tu comunidad autónoma —especialmente en <strong>Cataluña</strong>— el “ahorro” puede diluirse por completo debido a normativas que muchos compradores desconocen. Importar bien no consiste solo en traer el coche, sino en entender cómo la administración interpreta ese vehículo.
              </p>
            </section>

            {/* SECCIÓN 1: COSTES CUANTIFICABLES */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <Scale size={14} /> 01. Costes Cuantificables e Impuestos
              </h2>
              <p className="text-lg mb-8">
                Existen gastos puramente matemáticos. Aunque nuestra base operativa está en <strong>Cambrils</strong>, asesoramos siempre en función del domicilio fiscal del comprador.
              </p>

              <h3 className="text-white font-bold text-xl mb-4">Impuesto de Matriculación (Estatal)</h3>
              <p className="mb-6">
                Basado en las emisiones oficiales de CO₂. Un error frecuente es interpretar incorrectamente la ficha técnica alemana (COC). Ese fallo puede hacer que un coche salte de un tramo del <strong>4,75% al 9,75%</strong> o superior.
              </p>

              {/* EJEMPLO REALISTA BOX */}
              <div className="bg-[#0a0a0a] p-8 border border-gold-400/20 my-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 bg-gold-400/10 text-gold-400 text-[9px] font-black uppercase tracking-widest">Caso Real 2026</div>
                <h4 className="text-white font-bold mb-4 flex items-center gap-2 italic">
                  <Euro size={16} className="text-gold-400" /> Ejemplo: BMW 530d (2021)
                </h4>
                <p className="text-sm text-gray-400 mb-0">
                  Un vehículo anunciado en Alemania por 38.900 € puede encarecerse en <strong>más de 6.000 €</strong> si se declara incorrectamente frente a una gestión técnica y fiscal optimizada por profesionales.
                </p>
              </div>
            </section>

            {/* SECCIÓN 2: FACTOR AUTONÓMICO */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <AlertTriangle size={14} /> 02. El Factor Autonómico: ITP y Emisiones
              </h2>
              <p className="text-lg mb-8">
                Este es el punto más crítico e ignorado. Además del impuesto estatal, comunidades como Cataluña aplican recargos específicos.
              </p>

              <div className="bg-red-950/10 border-l-4 border-red-600 p-8 mb-10 font-bold">
                <p className="text-white mb-4">Aviso para Residentes en Cataluña:</p>
                <p className="text-gray-400 text-sm italic leading-relaxed">
                  "Una mala declaración de emisiones o la falta de información técnica correcta puede llevar a aplicar tipos que alcanzan <strong>hasta el 16%</strong> en determinados supuestos."
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="space-y-4">
                  <h4 className="text-white font-bold flex items-center gap-2">
                    <FileText size={16} className="text-gold-400" /> Trámites Obligatorios
                  </h4>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li className="flex gap-2"><CheckCircle2 size={12} className="text-gold-400 mt-1" /> Obtención ficha técnica española.</li>
                    <li className="flex gap-2"><CheckCircle2 size={12} className="text-gold-400 mt-1" /> ITV específica de importación.</li>
                    <li className="flex gap-2"><CheckCircle2 size={12} className="text-gold-400 mt-1" /> Revisión documental completa.</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-bold flex items-center gap-2">
                    <Truck size={16} className="text-gold-400" /> Logística Profesional
                  </h4>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li className="flex gap-2"><CheckCircle2 size={12} className="text-gold-400 mt-1" /> Transporte asegurado a todo riesgo.</li>
                    <li className="flex gap-2"><CheckCircle2 size={12} className="text-gold-400 mt-1" /> Trazabilidad del vehículo 24/7.</li>
                    <li className="flex gap-2"><CheckCircle2 size={12} className="text-gold-400 mt-1" /> Entrega en domicilio o Cambrils.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECCIÓN 3: GESTIÓN PGC */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <ShieldCheck size={14} /> El Valor de Premium German Cars
              </h2>
              <div className="space-y-12 mt-10">
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400">
                    <Search size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase text-[10px] tracking-widest mb-2">Auditoría Técnica</h4>
                    <p className="text-sm text-gray-400">Inspección mecánica, diagnóstico electrónico y revisión estructural. No compramos por fotos; verificamos activos mecánicos.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400">
                    <Calculator size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase text-[10px] tracking-widest mb-2">Optimización Fiscal</h4>
                    <p className="text-sm text-gray-400">Aseguramos que pagas lo justo, evitando tipos máximos por errores en la declaración de emisiones ante la Generalitat.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* CONCLUSIÓN Y CTA */}
            <div className="bg-[#0a0a0a] border border-gold-400/20 p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"></div>
                <h2 className="text-3xl font-bold mb-6 text-white leading-tight">
                  Calcula el <span className="text-gold-400 italic">Coste Real</span> y evita sorpresas
                </h2>
                <p className="text-gray-300 mb-10 text-base max-w-2xl mx-auto font-bold">
                  El ahorro no está en el anuncio, sino en la interpretación normativa. Usa nuestra herramienta para obtener una estimación realista en función de tu comunidad.
                </p>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                  <Link 
                    to="/calculadora" 
                    className="inline-flex items-center justify-center gap-3 bg-gold-400 text-black px-12 py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-xl shadow-gold-400/5"
                  >
                    Probar Calculadora de Importación <Calculator size={16} />
                  </Link>
                  <a 
                    href="https://wa.me/34603743608?text=Hola,%20necesito%20asesoramiento%20para%20importar%20un%20coche%20evitando%20errores%20fiscales." 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 border border-white/10 text-white px-12 py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500"
                  >
                    Asesoramiento Directo <ArrowRight size={16} />
                  </a>
                </div>
                <p className="text-[9px] text-gray-600 mt-12 font-black tracking-[0.4em] uppercase">
                  👉 Premium German Cars — Tu criterio experto en Cambrils
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
