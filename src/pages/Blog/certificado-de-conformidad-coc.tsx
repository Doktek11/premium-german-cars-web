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
        title="Certificado de Conformidad (COC): QuÃ© es y cÃ³mo conseguirlo | PGC"
        description="Evita la homologaciÃ³n individual. GuÃ­a completa sobre el Certificado de Conformidad (COC) para matricular coches de Alemania en EspaÃ±a sin errores."
        article={true}
        image="/logoPGC.svg"
        canonical="https://www.premiumgermancars.com/blog/certificado-conformidad-coc-itv-matriculacion"
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
              <span className="inline-block bg-gold-950/20 text-gold-400 px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-black border border-gold-400/20">
                DocumentaciÃ³n & Normativa TÃ©cnica
              </span>
              {/* AJUSTE 1: TÃ­tulo ligeramente mÃ¡s pequeÃ±o */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
                Certificado de Conformidad (COC): <span className="text-gold-400 block md:inline italic">quÃ© es, por quÃ© lo necesitas y cÃ³mo evitar problemas en la ITV</span>
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
                ValidaciÃ³n de HomologaciÃ³n Europea (CE)
              </div>
          </div>

          <div className="prose prose-invert prose-gold max-w-none text-gray-300 leading-relaxed">
            
            <section className="mb-20">
              <p className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
                Si estÃ¡s importando un coche desde Europa o estÃ¡s a punto de matricularlo en EspaÃ±a, hay un documento que marca la diferencia entre un trÃ¡mite rÃ¡pido o un proceso largo y costoso: el Certificado de Conformidad, tambiÃ©n conocido como COC (Certificate of Conformity).
              </p>
              <p className="mb-6 text-justify text-lg text-gray-400">
                En <strong>Premium German Cars</strong> vemos este escenario a diario: coches perfectamente vÃ¡lidos que se retrasan semanas â€”o incluso mesesâ€” por no contar con el Certificado de Conformidad europeo en el momento adecuado. En este artÃ­culo te explicamos quÃ© es el Certificado de Conformidad, por quÃ© es tan importante y cÃ³mo conseguirlo sin errores al importar un coche desde Alemania u otro paÃ­s de la UniÃ³n Europea.
              </p>
            </section>

            {/* SECCIÃ“N 1: Â¿QUÃ‰ ES EL COC? */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <FileText size={14} /> 01. Â¿QuÃ© es el Certificado de Conformidad (COC)?
              </h2>
              <p className="text-lg mb-6">
                El <strong>Certificado de Conformidad (COC)</strong> es un documento oficial emitido por el fabricante del vehÃ­culo que certifica que el coche cumple con la normativa europea de homologaciÃ³n (CE).
              </p>
              <p className="text-lg mb-8">
                En otras palabras, el Certificado de Conformidad confirma que el vehÃ­culo fue fabricado conforme a los estÃ¡ndares tÃ©cnicos exigidos en la UniÃ³n Europea y que, por tanto, puede matricularse en EspaÃ±a sin necesidad de una homologaciÃ³n individual. Este documento es vÃ¡lido en todos los paÃ­ses miembros de la UE y resulta imprescindible para matricular un coche importado en EspaÃ±a, especialmente cuando procede de Alemania u otro paÃ­s europeo.
              </p>

              {/* AJUSTE 2: Letra mÃ¡s grande y blanca en recuadros */}
              <div className="grid md:grid-cols-2 gap-6 my-10">
                <div className="bg-[#0a0a0a] p-8 border border-white/10">
                  <CheckCircle2 className="text-gold-400 mb-4" size={24} />
                  <h4 className="text-white font-bold text-sm uppercase mb-3 tracking-widest">Con COC</h4>
                  <p className="text-sm text-gray-200 italic leading-relaxed">ITV mÃ¡s rÃ¡pida y sin complicaciones tÃ©cnicas adicionales.</p>
                </div>
                <div className="bg-[#0a0a0a] p-8 border border-red-900/30">
                  <AlertTriangle className="text-red-500 mb-4" size={24} />
                  <h4 className="text-white font-bold text-sm uppercase mb-3 tracking-widest">Sin COC</h4>
                  <p className="text-sm text-gray-200 italic leading-relaxed">HomologaciÃ³n individual obligatoria (mÃ¡s cara y lenta).</p>
                </div>
              </div>
            </section>

            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <ShieldCheck size={14} /> 02. Certificado de Conformidad europeo: Â¿por quÃ© es obligatorio?
              </h2>
              <p className="text-lg mb-6 text-gray-400">
                Cuando llevas un coche importado a la ITV espaÃ±ola, el primer filtro es muy claro: sin Certificado de Conformidad europeo, el proceso de matriculaciÃ³n se encarece, los plazos se alargan semanas o incluso meses y pueden aparecer incompatibilidades tÃ©cnicas.
              </p>
              <div className="bg-red-950/10 border border-red-900/20 p-8 my-10">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">Riesgos de no contar con el COC:</h4>
                <ul className="grid md:grid-cols-2 gap-4">
                  <li className="flex items-center gap-2 text-sm text-gray-400"><AlertTriangle size={14} className="text-red-500" /> El proceso de matriculaciÃ³n se encarece</li>
                  <li className="flex items-center gap-2 text-sm text-gray-400"><AlertTriangle size={14} className="text-red-500" /> Los plazos se alargan semanas o meses</li>
                  <li className="flex items-center gap-2 text-sm text-gray-400"><AlertTriangle size={14} className="text-red-500" /> Incompatibilidades tÃ©cnicas</li>
                  <li className="flex items-center gap-2 text-sm text-gray-400"><AlertTriangle size={14} className="text-red-500" /> PÃ©rdida de tiempo y dinero</li>
                </ul>
              </div>
            </section>

            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <ShieldCheck size={14} /> 03. Certificado de Conformidad coche: el punto crÃ­tico en la importaciÃ³n
              </h2>
              <p className="text-lg mb-8 text-gray-400">
                En cualquier proceso de importaciÃ³n, el <strong>Certificado de Conformidad del coche</strong> es el documento que desbloquea todo el proceso: matriculaciÃ³n en EspaÃ±a, ITV tras la importaciÃ³n, trÃ¡mites ante la DGT y alta definitiva del vehÃ­culo. Sin Ã©l, el coche queda bloqueado a nivel administrativo y tÃ©cnico.
              </p>
              
              <div className="bg-[#0a0a0a] border border-white/5 p-8 mb-10">
                <h3 className="text-white font-bold mb-6 italic">Resumen rÃ¡pido:</h3>
                <div className="space-y-4">
                  <p className="text-sm border-l-2 border-gold-400 pl-4"><strong className="text-white">QuÃ© es:</strong> documento del fabricante que acredita la homologaciÃ³n europea del vehÃ­culo.</p>
                  <p className="text-sm border-l-2 border-gold-400 pl-4"><strong className="text-white">CuÃ¡ndo se necesita:</strong> al importar y matricular un coche desde otro paÃ­s de la UE.</p>
                  <p className="text-sm border-l-2 border-gold-400 pl-4"><strong className="text-white">QuÃ© pasa sin Ã©l:</strong> homologaciÃ³n individual, mÃ¡s coste y mÃ¡s tiempo.</p>
                  <p className="text-sm border-l-2 border-gold-400 pl-4"><strong className="text-white">Por quÃ© es clave:</strong> permite pasar la ITV y matricular el coche sin retrasos.</p>
                </div>
              </div>

              {/* AJUSTE 3: CTA INTERMEDIO HACIA CALCULADORA */}
              <div className="my-16 p-1 bg-gradient-to-r from-gold-400/20 to-transparent">
                <div className="bg-[#050505] p-8 border border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div>
                    <h4 className="text-white font-bold text-xl mb-2">Â¿Quieres saber cuÃ¡nto pagarÃ¡s de impuestos?</h4>
                    <p className="text-gray-400 text-sm">Usa los datos de emisiones de tu COC en nuestra calculadora avanzada.</p>
                  </div>
                  <Link to="/calculadora-impuesto-matriculacion" className="bg-white text-black px-8 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-gold-400 transition-colors flex items-center gap-2 whitespace-nowrap">
                    Calcular Impuestos <Calculator size={14} />
                  </Link>
                </div>
              </div>

              <p className="text-gray-400 italic text-sm">
                En <strong>Premium German Cars</strong>, especialistas en importaciÃ³n de vehÃ­culos premium desde Alemania, gestionamos el Certificado de Conformidad (COC) a diario. Aunque este documento es habitual en coches europeos, no siempre se entrega automÃ¡ticamente, especialmente en vehÃ­culos de segunda mano o procedentes de renting y leasing.
              </p>
            </section>

            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <Car size={14} /> 04. Â¿QuÃ© coches necesitan Certificado de Conformidad (COC)?
              </h2>
              <p className="mb-6">Necesitan Certificado de Conformidad la mayorÃ­a de los vehÃ­culos que han sido fabricados para el mercado europeo, se importan desde otro paÃ­s de la UE (como Alemania) y no han sido matriculados previamente en EspaÃ±a.</p>
              
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Especial atenciÃ³n en:</h4>
                  <ul className="space-y-2 text-sm text-gray-500 font-bold">
                    <li>â€¢ BMW</li>
                    <li>â€¢ Audi</li>
                    <li>â€¢ Mercedes-Benz</li>
                    <li>â€¢ Porsche</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Frecuente falta en:</h4>
                  <ul className="space-y-2 text-sm text-gray-500 font-bold">
                    <li>â€¢ Coches de renting o leasing alemÃ¡n</li>
                    <li>â€¢ VehÃ­culos con primera matriculaciÃ³n extranjera</li>
                    <li>â€¢ Compras a compraventas con documentaciÃ³n incompleta</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <Clock size={14} /> 05. Â¿CuÃ¡nto tarda la ITV con y sin Certificado de Conformidad?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border border-white/5 p-6">
                  <h4 className="text-gold-400 font-bold mb-4 uppercase text-[10px]">Con Certificado de Conformidad</h4>
                  <ul className="text-xs space-y-3 text-gray-200 font-medium">
                    <li>âœ“ InspecciÃ³n mÃ¡s directa</li>
                    <li>âœ“ Datos tÃ©cnicos ya reconocidos</li>
                    <li>âœ“ Menos comprobaciones adicionales</li>
                    <li>âœ“ Proceso de matriculaciÃ³n Ã¡gil</li>
                  </ul>
                </div>
                <div className="border border-red-900/20 p-6">
                  <h4 className="text-red-500 font-bold mb-4 uppercase text-[10px]">Sin Certificado de Conformidad</h4>
                  <ul className="text-xs space-y-3 text-gray-200 font-medium">
                    <li>âœ— Necesidad de homologaciÃ³n individual</li>
                    <li>âœ— Informes tÃ©cnicos adicionales</li>
                    <li>âœ— Posibles reformas a legalizar</li>
                    <li>âœ— Retrasos importantes (semanas o meses)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <Search size={14} /> 06. Â¿CÃ³mo conseguir el Certificado de Conformidad?
              </h2>
              <p className="mb-8 text-lg">
                Existen varias vÃ­as para obtener el COC, pero no todas son igual de eficaces. En <strong>Premium German Cars</strong> trabajamos Ãºnicamente con Certificados de Conformidad vÃ¡lidos para ITV, evitando rechazos.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-[#0a0a0a]">
                  <HelpCircle className="text-gold-400 shrink-0" />
                  <div>
                    <h5 className="text-white font-bold mb-1">Solicitarlo directamente al fabricante</h5>
                    <p className="text-xs text-gray-400">Documento vÃ¡lido pero proceso que puede ser lento y con coste variable segÃºn la marca.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-[#0a0a0a] border-l-2 border-gold-400">
                  <ShieldCheck className="text-gold-400 shrink-0" />
                  <div>
                    <h5 className="text-white font-bold mb-1">A travÃ©s de gestores especializados (PGC)</h5>
                    <p className="text-xs text-gray-400">TramitaciÃ³n mÃ¡s rÃ¡pida, revisiÃ³n de datos tÃ©cnicos y certificados adaptados a los requisitos de la ITV espaÃ±ola.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <HelpCircle size={14} /> 07. Preguntas Frecuentes sobre el COC
              </h2>
              <div className="space-y-8">
                {[
                  { q: "Â¿Es obligatorio el Certificado de Conformidad para matricular un coche importado?", a: "En la mayorÃ­a de los vehÃ­culos importados desde la UniÃ³n Europea, sÃ­. Sin COC, normalmente serÃ¡ necesaria una homologaciÃ³n individual para poder matricular el coche en EspaÃ±a." },
                  { q: "Â¿CuÃ¡nto cuesta un Certificado de Conformidad?", a: "Depende de la marca y del modelo. El precio varÃ­a si se solicita directamente al fabricante o mediante un gestor especializado." },
                  { q: "Â¿QuÃ© pasa si mi coche no tiene COC?", a: "El vehÃ­culo deberÃ¡ pasar por un proceso de homologaciÃ³n individual, con mayor coste, mÃ¡s documentaciÃ³n tÃ©cnica y plazos mÃ¡s largos en la ITV." },
                  { q: "Â¿Un coche antiguo puede tener Certificado de Conformidad?", a: "No siempre. Los vehÃ­culos muy antiguos o fabricados antes de determinadas normativas europeas pueden no disponer de COC, lo que obliga a recurrir a homologaciones alternativas." },
                  { q: "Â¿El COC sirve para cualquier paÃ­s de la UniÃ³n Europea?", a: "SÃ­. El Certificado de Conformidad europeo permite que un vehÃ­culo homologado en un paÃ­s de la UE pueda matricularse en otro, como ocurre al importar un coche desde Alemania a EspaÃ±a." }
                ].map((faq, i) => (
                  <div key={i} className="border-b border-white/5 pb-6">
                    <h4 className="text-white font-bold text-sm mb-2 italic">{faq.q}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="bg-[#0a0a0a] border border-gold-400/20 p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"></div>
                <h2 className="text-3xl font-bold mb-6 text-white leading-tight">
                  Certificado de Conformidad (COC): <span className="text-gold-400 italic text-2xl block mt-2">la clave para una importaciÃ³n sin errores</span>
                </h2>
                <p className="text-gray-300 mb-10 text-base max-w-2xl mx-auto font-bold">
                  El COC no es un simple papel: es el documento que decide si tu coche entra en EspaÃ±a por la vÃ­a rÃ¡pida o por la mÃ¡s cara y lenta. ConsÃºltanos tu caso antes de iniciar la matriculaciÃ³n.
                </p>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                  <a 
                    href="https://wa.me/34603743608?text=Hola,%20tengo%20dudas%20con%20el%20COC%20y%20la%20matriculaciÃ³n." 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-gold-400 text-black px-12 py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-xl shadow-gold-400/5"
                  >
                    Consultar mi caso <ArrowRight size={16} />
                  </a>
                </div>
                <p className="text-[9px] text-gray-600 mt-12 font-black tracking-[0.4em] uppercase">
                  ðŸ‘‰ Premium German Cars â€” Especialistas en Activos MecÃ¡nicos
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

