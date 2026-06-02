import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { SEO } from "../../components/SEO";
import { 
  ChevronLeft, 
  CheckCircle2, 
  Mail, 
  ArrowRight, 
  Info
} from 'lucide-react';
import { SeoIntentLinks, seoIntentLinks } from "../../components/SeoIntentLinks";

const ComoImportarCocheAlemania = () => {
  return (
    <>
      <SEO 
        title="Guía 2026: Importar Coche de Alemania a España sin Sorpresas | PGC"
        description="Protocolo experto 2026 para la importación de vehículos premium. Aprenda a gestionar fiscalidad, emisiones de CO2 y logística profesional con Premium German Cars."
        article={true}
        image="/logoPGC.svg"
        canonical="https://www.premiumgermancars.com/blog/como-importar-coche-alemania"
      />
      
      <Navbar />
      
      <main className="bg-black text-white pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          
          {/* CABECERA */}
          <header className="mb-16">
            <Link to="/blog" className="text-gray-500 hover:text-gold-400 mb-10 inline-flex items-center gap-2 transition-all group tracking-[0.2em] text-[10px] uppercase font-bold">
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Volver al Blog
            </Link>
            <div className="space-y-4">
              <span className="inline-block bg-gold-400/10 text-gold-400 px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-black border border-gold-400/20">
                Protocolo de Importación 2026
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">
                Guía 2026 para Importar de Alemania <span className="text-gold-400 block md:inline italic">sin Sorpresas Fiscales</span>
              </h1>
            </div>
            <div className="flex items-center gap-6 mt-10 text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold">
              <span>Premium German Cars</span>
              <span className="w-8 h-[1px] bg-gold-400/30"></span>
              <span>5 Enero, 2026</span>
            </div>
          </header>

          {/* HERO VISUAL */}
          <div className="aspect-[21/9] w-full bg-[#0a0a0a] border border-white/5 flex flex-col items-center justify-center mb-20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-400/5 via-transparent to-transparent opacity-50"></div>
              <img src="/logoPGC.svg" className="w-64 opacity-20 brightness-0 invert transition-transform duration-700 group-hover:scale-110" alt="PGC Logo" />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold-400/40 font-serif italic text-xs tracking-[0.5em] uppercase">
                Expertos en Mercado Alemán
              </div>
          </div>

          <div className="prose prose-invert prose-gold max-w-none text-gray-400 leading-relaxed">
            
            {/* INTRODUCCIÓN */}
            <section className="mb-20">
              <p className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
                Cada año en España se repite la misma historia: alguien encuentra un “chollo” en Alemania, firma la compra con ilusión… y semanas después descubre que importar ese coche le cuesta miles de euros más de lo previsto.
              </p>
              <p className="mb-6 text-justify text-lg">
                En 2026, la importación ya no va solo de encontrar buen precio en plataformas como Mobile.de o AutoScout24. Va de entender la fiscalidad real, las emisiones y la documentación que protege su inversión. El mercado ha cambiado, y Hacienda también.
              </p>
              <blockquote className="border-l-2 border-gold-400 bg-white/[0.02] p-8 my-12 font-bold text-white text-lg md:text-xl">
                "Nuestra idea es clara: que el coche siga siendo una buena compra cuando ya está matriculado en España, no solo cuando aparece anunciado en Alemania."
              </blockquote>
            </section>

            {/* BLOQUE 1: ESTRATEGIA */}
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4">
              Bloque 1: La Búsqueda Estratégica
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl text-white font-bold mb-6 md:mb-8">¿Por qué los coches de 2 a 3 años son la mejor opción?</h3>
            <p className="mb-8 md:mb-10 text-justify text-base sm:text-lg">
              Aquí es donde fallan la mayoría de particulares: solo miran el precio en Alemania, sin calcular el valor oficial de Hacienda (BOE). Los coches de 24 a 36 meses ofrecen el mejor equilibrio entre precio, estado y fiscalidad al cumplir la curva de depreciación oficial.
            </p>

            <div className="bg-[#0a0a0a] p-6 sm:p-8 md:p-10 border border-white/5 rounded-sm mb-12 md:mb-20">
              <h4 className="text-gold-400 font-bold mb-8 uppercase tracking-widest text-sm flex items-center gap-2">
                <Info size={16} /> El concepto clave: reestreno
              </h4>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6 text-base text-justify">
                  <div>
                    <span className="text-white font-bold block mb-1 uppercase tracking-tighter text-lg">Depreciación BOE</span>
                    <p>Al cumplir los 24 o 36 meses, el valor oficial para el impuesto de matriculación cae notablemente, aunque el coche esté como nuevo.</p>
                  </div>
                  <div>
                    <span className="text-white font-bold block mb-1 uppercase tracking-tighter text-lg">Garantía Oficial Europea</span>
                    <p>Programas como Junge Sterne o Premium Selection permiten mantener la cobertura oficial en España.</p>
                  </div>
                </div>
                <div className="bg-white/5 p-6 border-l border-gold-400">
                  <span className="text-[10px] uppercase font-black text-gray-500 block mb-4 tracking-widest text-center">Filtros Indispensables PGC</span>
                  <ul className="space-y-3 text-sm uppercase tracking-wider font-bold text-gray-200">
                    <li className="flex items-center gap-2">✔ Historial Completo</li>
                    <li className="flex items-center gap-2">✔ KM Coherente y verificable</li>
                    <li className="flex items-center gap-2 text-gold-400">✔ IVA Deducible (MwSt. ausweisbar)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* BLOQUE 2: DOCUMENTACIÓN */}
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4">
              Bloque 2: Los 3 Documentos que “Salvan” la Importación
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12 md:mb-20">
              {[
                { t: "COC", d: "Certificado de Conformidad. El DNI europeo. Sin él, la ITV de importación se bloquea." },
                { t: "Teil I & II", d: "Documentos originales de circulación y propiedad. Nunca copias ni escaneos." },
                { t: "Kaufvertrag", d: "Factura o contrato. La base legal para justificar IVA o ITP correctamente." }
              ].map((doc, i) => (
                <div key={i} className="p-6 sm:p-8 bg-[#0a0a0a] border border-white/10 hover:border-gold-400/30 transition-colors min-h-[140px] flex flex-col">
                  <span className="text-gold-400 font-black text-2xl mb-4 block">0{i+1}</span>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-3">{doc.t}</h4>
                  <p className="text-sm md:text-base leading-relaxed text-gray-200 font-medium">{doc.d}</p>
                </div>
              ))}
            </div>

            {/* BLOQUE 3: EMISIONES */}
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4">
              Bloque 3: El Nuevo Escenario de las Emisiones CO₂ 2026
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl text-white font-bold mb-6 md:mb-8">La diferencia fiscal de miles de euros</h3>
            <p className="mb-8 md:mb-10 text-justify text-base sm:text-lg">
              En 2026, el impuesto de matriculación en España es más exigente que nunca. Dos coches visualmente idénticos pueden generar una diferencia fiscal abismal según su motorización y homologación de emisiones.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-20">
              <div className="bg-gradient-to-br from-green-900/20 to-transparent p-8 border border-green-900/30">
                <span className="text-green-500 font-black text-3xl mb-2 block">0 %</span>
                <h4 className="text-white font-bold uppercase text-sm mb-4">Eficiencia Máxima</h4>
                <p className="text-sm text-gray-300 font-medium">Vehículos por debajo de 120 g/km. Incluye híbridos enchufables y motores diésel de última generación.</p>
              </div>
              <div className="bg-gradient-to-br from-red-900/20 to-transparent p-8 border border-red-900/30">
                <span className="text-red-500 font-black text-3xl mb-2 block">14,75 %</span>
                <h4 className="text-white font-bold uppercase text-sm mb-4">Tramo Máximo</h4>
                <p className="text-sm text-gray-300 font-medium">Deportivos, SUV de gran tonelaje o motorizaciones antiguas. El impacto fiscal aquí es crítico.</p>
              </div>
            </div>
            
            <p className="bg-gold-400/5 p-6 sm:p-8 border-l-2 border-gold-400 text-white font-bold text-sm sm:text-base mb-12 md:mb-20">
              <span className="text-gold-400 font-black uppercase tracking-widest block mb-2 text-xs">Consejo PGC:</span>
              A veces, elegir un motor ligeramente más moderno puede suponer un ahorro de 3.000 € o más simplemente por bajar un tramo de emisiones. Nunca propongas una importación sin calcular antes el impacto del Modelo 576.
            </p>

            {/* BLOQUE 4: LOGÍSTICA */}
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4">
              Bloque 4: Logística y Transporte
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-12 md:mb-16">
              <div className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 md:p-10 rounded-sm hover:border-white/20 transition-colors">
                <h4 className="text-gray-400 font-bold mb-6 uppercase text-base tracking-[0.2em] border-b border-white/5 pb-4">
                  Traer el coche rodando
                </h4>
                <ul className="space-y-4">
                  {["Placas temporales (Zollkennzeichen)", "Combustible, peajes y pernoctas", "Desgaste mecánico y kilómetros", "Responsabilidad legal en ruta"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-base text-white font-medium">
                      <span className="text-red-600 font-black">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0a0a0a] border border-gold-400/40 p-6 sm:p-8 md:p-10 rounded-sm relative shadow-[0_0_50px_rgba(212,175,55,0.05)]">
                <div className="absolute -top-3 left-10 bg-gold-400 text-black text-[9px] font-black uppercase px-4 py-1 tracking-[0.2em]">Recomendación PGC</div>
                <h4 className="text-gold-400 font-bold mb-6 uppercase text-base tracking-[0.2em] border-b border-gold-400/20 pb-4">
                  Camión Especializado
                </h4>
                <ul className="space-y-4">
                  {["Seguridad total y seguro CMR", "Cero desgaste mecánico", "Costes cerrados e inamovibles", "Entrega directa personalizada"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-base text-white font-bold">
                      <CheckCircle2 size={20} className="text-gold-400 shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* BLOQUE 5: TRÁMITES */}
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-12 border-b border-gold-400/20 pb-4">
              Bloque 5: Fase Final en España
            </h2>
            <div className="space-y-12 mb-24">
              {[
                { n: "I", t: "ITV de importación", d: "Verificación técnica y documental rigurosa." },
                { n: "II", t: "Modelo 576", d: "Liquidación del impuesto de matriculación real. El punto crítico fiscal." },
                { n: "III", t: "IVTM e IV", d: "Impuesto de circulación y tasas de tráfico." },
                { n: "IV", t: "Matriculación DGT", d: "Emisión de placas españolas y permiso definitivo." }
              ].map((step, i) => (
                <div key={i} className="flex items-start sm:items-center gap-4 sm:gap-6 md:gap-10 group">
                  <span className="font-bold text-3xl sm:text-4xl md:text-5xl text-gold-400/20 group-hover:text-gold-400 transition-colors w-12 sm:w-16 md:w-20 shrink-0">{step.n}</span>
                  <div>
                    <h4 className="text-white font-bold uppercase text-xs sm:text-sm tracking-widest mb-1">{step.t}</h4>
                    <p className="text-sm sm:text-base text-gray-300 font-medium">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <section className="mb-20 border border-gold-400/20 bg-gold-400/5 p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Acompañamiento antes de reservar
              </h2>
              <p className="text-gray-300 text-lg mb-0">
                Podemos revisar una unidad concreta, calcular su coste total y confirmar si merece la pena antes de que pagues señal o transporte.
              </p>
            </section>

            <SeoIntentLinks
              title="Profundiza antes de importar"
              intro="La guía es el mapa general. Estos enlaces completan coste, fiscalidad, riesgos y servicio local para cerrar la operación con criterio."
              links={seoIntentLinks.guide}
            />

            {/* CONCLUSIÓN Y CTA CORREGIDO */}
            <div className="bg-[#050505] border border-gold-400/20 p-6 sm:p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"></div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 text-white leading-tight">
                  Importar Bien <span className="text-gold-400 italic">No es Suerte</span>
                </h2>
                <p className="text-gray-300 mb-8 md:mb-10 text-sm sm:text-base max-w-2xl mx-auto font-bold">
                  En <strong>Premium German Cars</strong> controlamos cada variable para que el coche que ve en Alemania siga siendo una gran inversión cuando ya circula en España.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                  <a 
                    href="https://wa.me/34603743608?text=Hola,%20he%20le%C3%ADdo%20la%20gu%C3%ADa%20de%20importaci%C3%B3n%202026%20y%20necesito%20asesoramiento%20para%20un%20proyecto." 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-gold-400 text-black px-8 sm:px-10 md:px-12 py-4 sm:py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all duration-500 min-h-[48px] touch-manipulation"
                  >
                    Solicitar Info <Mail size={16} />
                  </a>
                  <Link to="/calculadora-impuesto-matriculacion" className="inline-flex items-center justify-center gap-2 sm:gap-3 border border-white/10 text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 min-h-[48px] touch-manipulation">
                    Calculadora Fiscal <ArrowRight size={16} />
                  </Link>
                </div>
                <p className="text-[9px] text-gray-600 mt-12 font-black tracking-[0.4em] uppercase">
                  👉 Protocolo Premium German Cars — Resultados Garantizados
                </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ComoImportarCocheAlemania;


