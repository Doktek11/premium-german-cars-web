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
  HelpCircle,
  Clock,
  Car
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
                Certificado de Conformidad (COC): <span className="text-gold-400 block md:inline italic">qué es, por qué lo necesitas y cómo evitar problemas en la ITV</span>
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
            
            {/* INTRODUCCIÓN COMPLETA */}
            <section className="mb-20">
              <p className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
                Si estás importando un coche desde Europa o estás a punto de matricularlo en España, hay un documento que marca la diferencia entre un trámite rápido o un proceso largo y costoso: el Certificado de Conformidad, también conocido como COC (Certificate of Conformity).
              </p>
              <p className="mb-6 text-justify text-lg text-gray-400">
                En <strong>Premium German Cars</strong> vemos este escenario a diario: coches perfectamente válidos que se retrasan semanas —o incluso meses— por no contar con el Certificado de Conformidad europeo en el momento adecuado. En este artículo te explicamos qué es el Certificado de Conformidad, por qué es tan importante y cómo conseguirlo sin errores al importar un coche desde Alemania u otro país de la Unión Europea.
              </p>
            </section>

            {/* SECCIÓN 1: ¿QUÉ ES EL COC? (TEXTO EXTENDIDO) */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <FileText size={14} /> 01. ¿Qué es el Certificado de Conformidad (COC)?
              </h2>
              <p className="text-lg mb-6">
                El <strong>Certificado de Conformidad (COC)</strong> es un documento oficial emitido por el fabricante del vehículo que certifica que el coche cumple con la normativa europea de homologación (CE).
              </p>
              <p className="text-lg mb-8">
                En otras palabras, el Certificado de Conformidad confirma que el vehículo fue fabricado conforme a los estándares técnicos exigidos en la Unión Europea y que, por tanto, puede matricularse en España sin necesidad de una homologación individual. Este documento es válido en todos los países miembros de la UE y resulta imprescindible para matricular un coche importado en España, especialmente cuando procede de Alemania u otro país europeo.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-10">
                <div className="bg-[#0a0a0a] p-6 border border-white/5">
                  <CheckCircle2 className="text-gold-400 mb-4" size={20} />
                  <h4 className="text-white font-bold text-xs uppercase mb-2 tracking-widest">Con COC</h4>
                  <p className="text-xs text-gray-500 italic">ITV más rápida y sin complicaciones técnicas adicionales.</p>
                </div>
                <div className="bg-[#0a0a0a] p-6 border border-red-900/30">
                  <AlertTriangle className="text-red-500 mb-4" size={20} />
                  <h4 className="text-white font-bold text-xs uppercase mb-2 tracking-widest">Sin COC</h4>
                  <p className="text-xs text-gray-500 italic">Homologación individual obligatoria (más cara y lenta).</p>
                </div>
              </div>
            </section>

            {/* SECCIÓN 2: OBLIGATORIEDAD */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <ShieldCheck size={14} /> 02. Certificado de Conformidad europeo: ¿por qué es obligatorio?
              </h2>
              <p className="text-lg mb-6 text-gray-400">
                Cuando llevas un coche importado a la ITV española, el primer filtro es muy claro: sin Certificado de Conformidad europeo, el proceso de matriculación se encarece, los plazos se alargan semanas o incluso meses y pueden aparecer incompatibilidades técnicas.
              </p>
              <div className="bg-red-950/10 border border-red-900/20 p-8 my-10">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">Riesgos de no contar con el COC:</h4>
                <ul className="grid md:grid-cols-2 gap-4">
                  <li className="flex items-center gap-2 text-sm text-gray-400"><AlertTriangle size={14} className="text-red-500" /> El proceso de matriculación se encarece</li>
                  <li className="flex items-center gap-2 text-sm text-gray-400"><AlertTriangle size={14} className="text-red-500" /> Los plazos se alargan semanas o meses</li>
                  <li className="flex items-center gap-2 text-sm text-gray-400"><AlertTriangle size={14} className="text-red-500" /> Incompatibilidades técnicas</li>
                  <li className="flex items-center gap-2 text-sm text-gray-400"><AlertTriangle size={14} className="text-red-500" /> Pérdida de tiempo y dinero</li>
                </ul>
              </div>
            </section>

            {/* SECCIÓN 3: PUNTO CRÍTICO */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <ShieldCheck size={14} /> 03. Certificado de Conformidad coche: el punto crítico en la importación
              </h2>
              <p className="text-lg mb-8 text-gray-400">
                En cualquier proceso de importación, el <strong>Certificado de Conformidad del coche</strong> es el documento que desbloquea todo el proceso: matriculación en España, ITV tras la importación, trámites ante la DGT y alta definitiva del vehículo. Sin él, el coche queda bloqueado a nivel administrativo y técnico.
              </p>
              
              <div className="bg-[#0a0a0a] border border-white/5 p-8 mb-10">
                <h3 className="text-white font-bold mb-6 italic">Resumen rápido:</h3>
                <div className="space-y-4">
                  <p className="text-sm border-l-2 border-gold-400 pl-4"><strong className="text-white">Qué es:</strong> documento del fabricante que acredita la homologación europea del vehículo.</p>
                  <p className="text-sm border-l-2 border-gold-400 pl-4"><strong className="text-white">Cuándo se necesita:</strong> al importar y matricular un coche desde otro país de la UE.</p>
                  <p className="text-sm border-l-2 border-gold-400 pl-4"><strong className="text-white">Qué pasa sin él:</strong> homologación individual, más coste y más tiempo.</p>
                  <p className="text-sm border-l-2 border-gold-400 pl-4"><strong className="text-white">Por qué es clave:</strong> permite pasar la ITV y matricular el coche sin retrasos.</p>
                </div>
              </div>

              <p className="text-gray-400 italic text-sm">
                En <strong>Premium German Cars</strong>, especialistas en importación de vehículos premium desde Alemania, gestionamos el Certificado de Conformidad (COC) a diario. Aunque este documento es habitual en coches europeos, no siempre se entrega automáticamente, especialmente en vehículos de segunda mano o procedentes de renting y leasing.
              </p>
            </section>

            {/* SECCIÓN 4: ¿QUÉ COCHES LO NECESITAN? */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <Car size={14} /> 04. ¿Qué coches necesitan Certificado de Conformidad (COC)?
              </h2>
              <p className="mb-6">Necesitan Certificado de Conformidad la mayoría de los vehículos que han sido fabricados para el mercado europeo, se importan desde otro país de la UE (como Alemania) y no han sido matriculados previamente en España.</p>
              
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Especial atención en:</h4>
                  <ul className="space-y-2 text-sm text-gray-500 font-bold">
                    <li>• BMW</li>
                    <li>• Audi</li>
                    <li>• Mercedes-Benz</li>
                    <li>• Porsche</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Frecuente falta en:</h4>
                  <ul className="space-y-2 text-sm text-gray-500 font-bold">
                    <li>• Coches de renting o leasing alemán</li>
                    <li>• Vehículos con primera matriculación extranjera</li>
                    <li>• Compras a compraventas con documentación incompleta</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECCIÓN 5: ITV TIEMPOS */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <Clock size={14} /> 05. ¿Cuánto tarda la ITV con y sin Certificado de Conformidad?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border border-white/5 p-6">
                  <h4 className="text-gold-400 font-bold mb-4 uppercase text-[10px]">Con Certificado de Conformidad</h4>
                  <ul className="text-xs space-y-3 text-gray-400">
                    <li>✓ Inspección más directa</li>
                    <li>✓ Datos técnicos ya reconocidos</li>
                    <li>✓ Menos comprobaciones adicionales</li>
                    <li>✓ Proceso de matriculación ágil</li>
                  </ul>
                </div>
                <div className="border border-red-900/20 p-6">
                  <h4 className="text-red-500 font-bold mb-4 uppercase text-[10px]">Sin Certificado de Conformidad</h4>
                  <ul className="text-xs space-y-3 text-gray-400">
                    <li>✗ Necesidad de homologación individual</li>
                    <li>✗ Informes técnicos adicionales</li>
                    <li>✗ Posibles reformas a legalizar</li>
                    <li>✗ Retrasos importantes (semanas o meses)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECCIÓN 6: CÓMO CONSEGUIRLO */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <Search size={14} /> 06. ¿Cómo conseguir el Certificado de Conformidad?
              </h2>
              <p className="mb-8 text-lg">
                Existen varias vías para obtener el COC, pero no todas son igual de eficaces. En <strong>Premium German Cars</strong> trabajamos únicamente con Certificados de Conformidad válidos para ITV, evitando rechazos.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-[#0a0a0a]">
                  <HelpCircle className="text-gold-400 shrink-0" />
                  <div>
                    <h5 className="text-white font-bold mb-1">Solicitarlo directamente al fabricante</h5>
                    <p className="text-xs text-gray-500">Documento válido pero proceso que puede ser lento y con coste variable según la marca.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-[#0a0a0a] border-l-2 border-gold-400">
                  <ShieldCheck className="text-gold-400 shrink-0" />
                  <div>
                    <h5 className="text-white font-bold mb-1">A través de gestores especializados (PGC)</h5>
                    <p className="text-xs text-gray-500">Tramitación más rápida, revisión de datos técnicos y certificados adaptados a los requisitos de la ITV española.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECCIÓN FAQ COMPLETA */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <HelpCircle size={14} /> 07. Preguntas Frecuentes sobre el COC
              </h2>
              <div className="space-y-8">
                {[
                  { q: "¿Es obligatorio el Certificado de Conformidad para matricular un coche importado?", a: "En la mayoría de los vehículos importados desde la Unión Europea, sí. Sin COC, normalmente será necesaria una homologación individual para poder matricular el coche en España." },
                  { q: "¿Cuánto cuesta un Certificado de Conformidad?", a: "Depende de la marca y del modelo. El precio varía si se solicita directamente al fabricante o mediante un gestor especializado." },
                  { q: "¿Qué pasa si mi coche no tiene COC?", a: "El vehículo deberá pasar por un proceso de homologación individual, con mayor coste, más documentación técnica y plazos más largos en la ITV." },
                  { q: "¿Un coche antiguo puede tener Certificado de Conformidad?", a: "No siempre. Los vehículos muy antiguos o fabricados antes de determinadas normativas europeas pueden no disponer de COC, lo que obliga a recurrir a homologaciones alternativas." },
                  { q: "¿El COC sirve para cualquier país de la Unión Europea?", a: "Sí. El Certificado de Conformidad europeo permite que un vehículo homologado en un país de la UE pueda matricularse en otro, como ocurre al importar un coche desde Alemania a España." }
                ].map((faq, i) => (
                  <div key={i} className="border-b border-white/5 pb-6">
                    <h4 className="text-white font-bold text-sm mb-2 italic">{faq.q}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CONCLUSIÓN Y CTA */}
            <div className="bg-[#0a0a0a] border border-gold-400/20 p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"></div>
                <h2 className="text-3xl font-bold mb-6 text-white leading-tight">
                  Certificado de Conformidad (COC): <span className="text-gold-400 italic text-2xl block mt-2">la clave para una importación sin errores</span>
                </h2>
                <p className="text-gray-300 mb-10 text-base max-w-2xl mx-auto font-bold">
                  El COC no es un simple papel: es el documento que decide si tu coche entra en España por la vía rápida o por la más cara y lenta. Consúltanos tu caso antes de iniciar la matriculación.
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
