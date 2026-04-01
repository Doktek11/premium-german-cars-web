import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { SEO } from "../../components/SEO";
import {
  ChevronLeft,
  CheckCircle2,
  ArrowRight,
  Star,
  ShieldCheck,
  TrendingUp,
  FileSearch,
  Euro
} from 'lucide-react';

const ImportacionAlemaniaMejorOpcion = () => {
  return (
    <>
      <SEO
        title="¿Por qué Importar de Alemania es la Mejor Opción en 2026? | PGC"
        description="Descubre por qué la importación de coches desde Alemania es la decisión más inteligente en 2026. Calidad, ahorro real y garantía oficial con el método PGC."
        article={true}
        image="/logoPGC.svg"
        canonical="https://www.premiumgermancars.com/blog/importar-coche-aleman-guia-importacion-alemania"
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
                Guía de Mercado 2026
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">
                Importación de Alemania: <span className="text-gold-400 block md:inline italic">¿La mejor forma de comprar tu premium?</span>
              </h1>
            </div>
            <div className="flex items-center gap-6 mt-10 text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold">
              <span>Premium German Cars</span>
              <span className="w-8 h-[1px] bg-gold-400/30"></span>
              <span>27 Enero, 2026</span>
            </div>
          </header>

          {/* HERO VISUAL */}
          <div className="aspect-[21/9] w-full bg-[#0a0a0a] border border-white/5 flex flex-col items-center justify-center mb-20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-400/5 via-transparent to-transparent opacity-50"></div>
            <img src="/logoPGC.svg" className="w-64 opacity-20 brightness-0 invert transition-transform duration-700 group-hover:scale-110" alt="PGC Logo" />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold-400/40 font-serif italic text-xs tracking-[0.5em] uppercase">
              Estándar de Calidad Superior
            </div>
          </div>

          <div className="prose prose-invert prose-gold max-w-none text-gray-300 leading-relaxed">

            {/* INTRODUCCIÓN */}
            <section className="mb-20">
              <p className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
                El mercado del automóvil en España vive un momento de confusión sin precedentes. Precios inflados, ofertas condicionadas y una depreciación agresiva han hecho que <strong>importar un coche alemán</strong> sea la alternativa más inteligente.
              </p>
              <p className="mb-6 text-justify text-lg text-gray-400">
                No es casualidad que términos como <strong>importación Alemania</strong> o <strong>comprar coche importado</strong> hayan crecido exponencialmente. En <strong>Premium German Cars</strong> sabemos que el cliente busca rigor y valor real, huyendo del marketing vacío y los precios irreales del mercado nacional.
              </p>
            </section>

            {/* SECCIÓN 1 */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <TrendingUp size={14} /> Importación Alemania: El mercado más exigente
              </h2>
              <p className="text-lg mb-8">
                La importación se ha convertido en tendencia porque en Alemania existe un mercado mucho más <strong>amplio, transparente y exigente</strong> que el español.
              </p>
              <div className="grid md:grid-cols-2 gap-8 bg-[#0a0a0a] p-8 border border-white/5">
                <div>
                  <h4 className="text-gold-400 font-bold uppercase text-xs tracking-widest mb-4">Ventajas de Origen</h4>
                  <ul className="space-y-3 text-sm italic">
                    <li>• Oferta masiva de vehículos premium y configuraciones exclusivas.</li>
                    <li>• Mantenimiento riguroso en concesionario oficial como norma.</li>
                  </ul>
                </div>
                <div className="border-l border-gold-400/30 pl-8">
                  <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-4">La Realidad PGC</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Importar no es solo ahorrar, es <strong>comprar mejor</strong>. Filtramos el mercado alemán para traer solo unidades que superan nuestro estándar de calidad.
                  </p>
                </div>
              </div>
            </section>

            {/* SECCIÓN 2 */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <Euro size={14} /> ¿Cuánto cuesta importar en 2026?
              </h2>
              <p className="text-lg mb-8 text-justify font-medium text-white">
                La respuesta honesta es: depende de la fiscalidad y de la gestión. Un coche bien importado tiene un <strong>precio final claro desde el inicio</strong>; uno mal gestionado, sorpresas de miles de euros.
              </p>
              <div className="bg-gradient-to-r from-gold-400/5 to-transparent p-8 border-l-2 border-gold-400">
                <h4 className="text-white font-black text-sm uppercase mb-4 tracking-tighter">Costes que auditamos por usted:</h4>
                <p className="text-base text-gray-400 italic">
                  Calculamos el <strong>impuesto de matriculación</strong> exacto según emisiones y CC.AA., transporte asegurado, ITV, homologaciones y tasas de gestoría. Sin costes ocultos.
                </p>
              </div>
            </section>

            {/* SECCIÓN 3 */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <Star size={14} /> Decisión Inteligente: Más coche por tu dinero
              </h2>
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <p className="text-lg leading-relaxed">
                    Si tu presupuesto ronda los 25.000€ - 30.000€, Alemania ofrece <strong>unidades de reestreno</strong> con niveles de equipamiento inexistentes en España y una menor depreciación a medio plazo.
                  </p>
                </div>
                <div className="w-full md:w-72 bg-white/5 p-6 border border-white/10">
                  <span className="text-[10px] font-black text-gold-400 uppercase tracking-[0.2em] block mb-4">Pilares de Valor</span>
                  <p className="text-xs font-bold leading-loose text-gray-300">
                    • EQUIPAMIENTO PREMIUM <br />
                    • HISTORIAL OFICIAL <br />
                    • VALOR RESIDUAL ALTO
                  </p>
                </div>
              </div>
            </section>

            {/* SECCIÓN 4 - ERRORES */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <FileSearch size={14} /> El error de "Bajarlo por tu cuenta"
              </h2>
              <div className="bg-red-900/10 border border-red-900/20 p-10">
                <p className="text-white font-bold mb-6 text-xl italic">
                  "Un error administrativo o un cálculo fiscal erróneo puede bloquear tu inversión durante meses."
                </p>
                <p className="text-gray-400 text-base mb-6">
                  Muchos particulares subestiman el <strong>papeleo, las homologaciones y los plazos</strong>. En Premium German Cars eliminamos esa incertidumbre.
                </p>
                <div className="flex items-center gap-3 text-gold-400 font-bold text-sm">
                  <ShieldCheck size={18} /> Garantía oficial BMW en España hasta 2026.
                </div>
              </div>
            </section>

            {/* SECCIÓN 5 - EL SELLO PGC */}
            <section className="mb-24">
              <h3 className="text-2xl font-bold text-white mb-8">¿Buscas el mejor importador de coches alemanes?</h3>
              <p className="text-lg mb-10 text-justify">
                En <strong>Premium German Cars</strong> no nos limitamos a importar; seleccionamos. Nuestro sello de calidad garantiza vehículos con menos de 75.000 km, historial verificable y <strong>garantía oficial en España</strong>.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                {["Menos de 75k KM", "Historial Verificado", "Garantía en España"].map((doc, i) => (
                  <div key={i} className="p-4 border border-white/5 bg-[#050505]">
                    <span className="text-gold-400 font-bold text-[10px] uppercase tracking-widest">{doc}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* CONCLUSIÓN Y CTA */}
            <div className="bg-[#0a0a0a] border border-gold-400/20 p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"></div>
              <h2 className="text-3xl font-bold mb-6 text-white leading-tight">
                Invierta en Calidad, <span className="text-gold-400 italic">No en Marketing</span>
              </h2>
              <p className="text-gray-300 mb-10 text-base max-w-2xl mx-auto font-bold">
                ¿Prefieres estrenar pantallas o invertir en ingeniería y durabilidad real? Descubre nuestras unidades seleccionadas con garantía total.
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <Link
                  to="/car/bmw-serie-1-116i"
                  className="inline-flex items-center justify-center gap-3 bg-gold-400 text-black px-12 py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all duration-500"
                >
                  Ver Stock Disponible <CheckCircle2 size={16} />
                </Link>
                <Link to="/calculadora-impuesto-matriculacion" className="inline-flex items-center justify-center gap-3 border border-white/10 text-white px-12 py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500">
                  Calculadora de Ahorro <ArrowRight size={16} />
                </Link>
              </div>
              <p className="text-[9px] text-gray-600 mt-12 font-black tracking-[0.4em] uppercase">
                Calidad Alemana — Gestión Premium German Cars
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ImportacionAlemaniaMejorOpcion;
