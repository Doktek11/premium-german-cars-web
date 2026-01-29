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
  FileCheck,
  FileText,
  ShieldCheck,
  Search,
  HelpCircle
} from 'lucide-react';

const CertificadoConformidadCOC = () => {
  return (
    <>
      <SEO 
        title="Certificado de Conformidad (COC): Qué es y cómo conseguirlo | PGC"
        description="Evita la homologación individual. Guía completa sobre el Certificado de Conformidad (COC) para matricular coches de Alemania en España sin errores."
        article={true}
        image="/logoPGC.svg"
        canonical="https://premiumgermancars.com/blog/certificado-conformidad-coc-itv-matriculacion"
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
              <span className="inline-block bg-gold-950/20 text-gold-400 px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-black border border-gold-400/20">
                Documentación & Normativa Técnica
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">
                Certificado de Conformidad (COC): <span className="text-gold-400 block md:inline italic">Evita problemas en la ITV</span>
              </h1>
            </div>
            <div className="flex items-center gap-6 mt-10 text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold">
              <span>Premium German Cars</span>
              <span className="w-8 h-[1px] bg-gold-400/30"></span>
              <span>29 Enero, 2026</span>
            </div>
          </header>

          {/* HERO VISUAL */}
          <div className="aspect-[21/9] w-full bg-[#0a0a0a] border border-white/5 flex flex-col items-center justify-center mb-20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-600/5 via-transparent to-transparent opacity-50"></div>
              <FileCheck className="w-32 h-32 text-gold-400 opacity-20 transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold-400/40 font-serif italic text-xs tracking-[0.5em] uppercase text-center w-full px-4">
                Validación de Homologación Europea (CE)
              </div>
          </div>

          <div className="prose prose-invert prose-gold max-w-none text-gray-300 leading-relaxed">
            
            {/* INTRODUCCIÓN */}
            <section className="mb-20">
              <p className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
                Si estás importando un coche desde Europa o vas a matricularlo en España, el Certificado de Conformidad (COC) marca la diferencia entre un trámite rápido o un proceso largo y costoso.
              </p>
              <p className="mb-6 text-justify text-lg text-gray-400">
                En <strong>Premium German Cars</strong> vemos este escenario a diario: coches impecables que se bloquean semanas en la ITV por falta de este documento. El COC no es solo un papel; es la llave que acredita que tu vehículo cumple con la normativa europea de homologación y permite su libre circulación y matriculación sin necesidad de una homologación individual.
              </p>
            </section>

            {/* SECCIÓN 1: ¿QUÉ ES EL COC? */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <FileText size={14} /> 01. ¿Qué es el Certificado de Conformidad (COC)?
              </h2>
              <p className="text-lg mb-8">
                Es un documento oficial emitido por el fabricante que certifica que el coche cumple con los estándares técnicos exigidos en la Unión Europea. Es imprescindible para matricular un coche importado de Alemania u otros países de la UE en España.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-10">
                <div className="bg-[#0a0a0a] p-6 border border-white/5">
                  <CheckCircle2 className="text-gold-400 mb-4" size={20} />
                  <h4 className="text-white font-bold text-xs uppercase mb-2 tracking-widest">Con COC</h4>
                  <p className="text-xs text-gray-500">ITV más rápida, directa y sin complicaciones técnicas adicionales.</p>
                </div>
                <div className="bg-[#0a0a0a] p-6 border border-red-900/30">
                  <AlertTriangle className="text-red-500 mb-4" size={20} />
                  <h4 className="text-white font-bold text-xs uppercase mb-2 tracking-widest">Sin COC</h4>
                  <p className="text-xs text-gray-500">Obligatoriedad de Homologación Individual (más cara y lenta).</p>
                </div>
              </div>
            </section>

            {/* SECCIÓN 2: IMPORTANCIA EN IMPORTACIÓN */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <ShieldCheck size={14} /> 02. El punto crítico en la importación
              </h2>
              <p className="text-lg mb-6 text-gray-400">
                El Certificado de Conformidad del coche desbloquea todos los hitos del proceso: matriculación, ITV y obtención de la <strong>pegatina DGT</strong>. Sin él, el activo queda bloqueado administrativa y técnicamente.
              </p>
              
              <div className="bg-gold-400/5 border border-gold-400/20 p-8 my-10 relative">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2 italic">
                  Atención en Marcas Premium
                </h4>
                <p className="text-sm text-gray-400">
                  En modelos de <strong>BMW, Audi, Mercedes-Benz o Porsche</strong>, el COC es vital para reflejar los datos exactos de emisiones de CO2, dato fundamental para nuestra calculadora de impuestos.
                </p>
              </div>
            </section>

            {/* SECCIÓN 3: LA CALCULADORA */}
            <section className="mb-24">
              <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-lg flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-4">¿Ya tienes los datos del COC?</h3>
                  <p className="text-gray-400 text-sm mb-0">
                    Si conoces las emisiones de CO2 que figuran en el Certificado de Conformidad, puedes calcular el coste real de matriculación ahora mismo.
                  </p>
                </div>
                <Link 
                  to="/calculadora" 
                  className="bg-white text-black px-8 py-4 font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-3 hover:bg-gold-400 transition-colors shrink-0"
                >
                  Ir a la Calculadora <Calculator size={16} />
                </Link>
              </div>
            </section>

            {/* SECCIÓN 4: CÓMO CONSEGUIRLO */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <Search size={14} /> 03. ¿Cómo conseguir el Certificado de Conformidad?
              </h2>
              <p className="mb-8">
                Existen dos vías principales para obtener el documento válido para la ITV española:
              </p>
              <ul className="space-y-6 text-sm text-gray-400">
                <li className="flex gap-4">
                  <CheckCircle2 size={18} className="text-gold-400 shrink-0" /> 
                  <span><strong>Fabricante:</strong> Solicitud directa a la marca. Es seguro pero suele ser el proceso más lento.</span>
                </li>
                <li className="flex gap-4">
                  <CheckCircle2 size={18} className="text-gold-400 shrink-0" /> 
                  <span><strong>Gestores Especializados:</strong> En PGC gestionamos el COC de forma ágil para que los datos coincidan al 100% con los requisitos de la ITV.</span>
                </li>
              </ul>
            </section>

            {/* SECCIÓN 5: FAQ */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <HelpCircle size={14} /> 04. Preguntas Frecuentes
              </h2>
              <div className="space-y-8">
                <div>
                  <h4 className="text-white font-bold text-sm mb-2 italic">¿Es obligatorio para matricular?</h4>
                  <p className="text-xs text-gray-500">En la mayoría de casos sí. Sin él, es necesaria una homologación individual, mucho más costosa.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-2 italic">¿Sirve para cualquier país de la UE?</h4>
                  <p className="text-xs text-gray-500">Sí. El COC europeo permite que un vehículo homologado en Alemania pueda matricularse en España sin problemas.</p>
                </div>
              </div>
            </section>

            {/* CONCLUSIÓN Y CTA */}
            <div className="bg-[#0a0a0a] border border-gold-400/20 p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"></div>
                <h2 className="text-3xl font-bold mb-6 text-white leading-tight">
                  No dejes tu importación <span className="text-gold-400 italic">al azar</span>
                </h2>
                <p className="text-gray-300 mb-10 text-base max-w-2xl mx-auto font-bold">
                  Anticiparte y asegurar el Certificado de Conformidad es una decisión estratégica que evita retrasos y sobrecostes innecesarios.
                </p>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                  <a 
                    href="https://wa.me/34603743608?text=Hola,%20tengo%20dudas%20con%20el%20COC%20y%20la%20matriculación." 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-gold-400 text-black px-12 py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-xl shadow-gold-400/5"
                  >
                    Consultar mi caso <ArrowRight size={16} />
                  </a>
                </div>
                <p className="text-[9px] text-gray-600 mt-12 font-black tracking-[0.4em] uppercase">
                  👉 Premium German Cars — Especialistas en Activos Mecánicos
                </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CertificadoConformidadCOC;
