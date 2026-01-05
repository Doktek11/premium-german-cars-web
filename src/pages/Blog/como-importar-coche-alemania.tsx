import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { SEO } from "../../components/SEO";
import { 
  ChevronLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Mail, 
  ArrowRight, 
  Info,
  Gauge,
  FileText,
  Truck,
  Gavel
} from 'lucide-react';

const ComoImportarCocheAlemania = () => {
  return (
    <>
      <SEO 
        title="Guía 2026: Importar Coche de Alemania a España sin Sorpresas | PGC"
        description="Protocolo experto 2026 para la importación de vehículos premium. Aprenda a gestionar fiscalidad, emisiones de CO2 y logística profesional con Premium German Cars."
        article={true}
        image="/logoPGC.svg"
        canonical="https://premiumgermancars.com/blog/como-importar-coche-alemania"
      />
      
      <Navbar />
      
      <main className="bg-black text-white pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* CABECERA */}
          <header className="mb-16">
            <Link to="/blog" className="text-gray-500 hover:text-gold-400 mb-10 inline-flex items-center gap-2 transition-all group tracking-[0.2em] text-[10px] uppercase font-bold">
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Volver al Blog
            </Link>
            <div className="space-y-4">
              <span className="inline-block bg-gold-400/10 text-gold-400 px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-black border border-gold-400/20">
                Protocolo de Importación 2026
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold leading-[1.1] tracking-tight">
                Guía 2026 para Importar de Alemania <span className="text-gold-400 italic text-3xl md:text-5xl block md:inline">sin Sorpresas Fiscales</span>
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
              <p className="text-xl md:text-2xl font-serif italic text-white mb-8 leading-snug">
                Cada año en España se repite la misma historia: alguien encuentra un “chollo” en Alemania, firma la compra con ilusión… y semanas después descubre que importar ese coche le cuesta miles de euros más de lo previsto.
              </p>
              <p className="mb-6 text-justify">
                En 2026, la importación ya no va solo de encontrar buen precio en plataformas como Mobile.de o AutoScout24. Va de entender la fiscalidad real, las emisiones y la documentación que protege su inversión. El mercado ha cambiado, y Hacienda también.
              </p>
              <blockquote className="border-l-2 border-gold-400 bg-white/[0.02] p-8 my-12 italic font-serif text-white text-lg">
                "Nuestra idea es clara: que el coche siga siendo una buena compra cuando ya está matriculado en España, no solo cuando aparece anunciado en Alemania."
              </blockquote>
            </section>

            {/* BLOQUE 1: ESTRATEGIA */}
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4">
              Bloque 1: La Búsqueda Estratégica
            </h2>
            <h3 className="text-2xl text-white font-serif font-bold mb-8 italic">¿Por qué los coches de 2 a 3 años son la mejor opción?</h3>
            <p className="mb-10 text-justify">
              Aquí es donde fallan la mayoría de particulares: solo miran el precio en Alemania, sin calcular el valor oficial de Hacienda (BOE). Los coches de 24 a 36 meses ofrecen el mejor equilibrio entre precio, estado y fiscalidad al cumplir la curva de depreciación oficial.
            </p>

            <div className="bg-[#0a0a0a] p-10 border border-white/5 rounded-sm mb-20">
              <h4 className="text-gold-400 font-bold mb-8 uppercase tracking-widest text-xs flex items-center gap-2">
                <Info size={14} /> El concepto clave: reestreno
              </h4>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6 text-sm text-justify">
                  <div>
                    <span className="text-white font-bold block mb-1 uppercase tracking-tighter italic">Depreciación BOE</span>
                    <p>Al cumplir los 24 o 36 meses, el valor oficial para el impuesto de matriculación cae notablemente, aunque el coche esté como nuevo.</p>
                  </div>
                  <div>
                    <span className="text-white font-bold block mb-1 uppercase tracking-tighter italic">Garantía Oficial Europea</span>
                    <p>Programas como Junge Sterne o Premium Selection permiten mantener la cobertura oficial en España.</p>
                  </div>
                </div>
                <div className="bg-white/5 p-6 border-l border-gold-400">
                  <span className="text-[10px] uppercase font-black text-gray-500 block mb-4 tracking-widest text-center">Filtros Indispensables PGC</span>
                  <ul className="space-y-3 text-[11px] uppercase tracking-wider font-bold text-gray-300">
                    <li className="flex items-center gap-2 italic">✔ Historial Completo</li>
                    <li className="flex items-center gap-2 italic">✔ KM Coherente y verificable</li>
                    <li className="flex items-center gap-2 italic text-gold-400">✔ IVA Deducible (MwSt. ausweisbar)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* BLOQUE 2: DOCUMENTACIÓN */}
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4">
              Bloque 2: Los 3 Documentos que “Salvan” la Importación
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {[
                { t: "COC", d: "Certificado de Conformidad. El DNI europeo. Sin él, la ITV de importación se bloquea." },
                { t: "Teil I & II", d: "Documentos originales de circulación y propiedad. Nunca copias ni escaneos." },
                { t: "Kaufvertrag", d: "Factura o contrato. La base legal para justificar IVA o ITP correctamente." }
              ].map((doc, i) => (
                <div key={i} className="p-6 bg-[#0a0a0a] border border-white/5 hover:border-gold-400/30 transition-colors">
                  <span className="text-gold-400 font-black text-xl mb-4 block">0{i+1}</span>
                  <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">{doc.t}</h4>
                  <p className="text-[11px] leading-relaxed text-gray-500 italic">{doc.d}</p>
                </div>
              ))}
            </div>

            {/* BLOQUE 3: EMISIONES (NUEVO) */}
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4">
              Bloque 3: El Nuevo Escenario de las Emisiones CO₂ 2026
            </h2>
            <h3 className="text-2xl text-white font-serif font-bold mb-8 italic">La diferencia fiscal de miles de euros</h3>
            <p className="mb-10 text-justify">
              En 2026, el impuesto de matriculación en España es más exigente que nunca. Dos coches visualmente idénticos pueden generar una diferencia fiscal abismal según su motorización y homologación de emisiones.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-20">
              <div className="bg-gradient-to-br from-green-900/20 to-transparent p-8 border border-green-900/30">
                <span className="text-green-500 font-black text-2xl mb-2 block">0 %</span>
                <h4 className="text-white font-bold uppercase text-xs mb-4">Eficiencia Máxima</h4>
                <p className="text-xs italic text-gray-400">Vehículos por debajo de 120 g/km. Incluye híbridos enchufables y motores diésel de última generación.</p>
              </div>
              <div className="bg-gradient-to-br from-red-900/20 to-transparent p-8 border border-red-900/30">
                <span className="text-red-500 font-black text-2xl mb-2 block">14,75 %</span>
                <h4 className="text-white font-bold uppercase text-xs mb-4">Tramo Máximo</h4>
                <p className="text-xs italic text-gray-400">Deportivos, SUV de gran tonelaje o motorizaciones antiguas. El impacto fiscal aquí es crítico.</p>
              </div>
            </div>
            
            <p className="bg-gold-400/5 p-6 border-l-2 border-gold-400 italic text-sm mb-20">
              <span className="text-gold-400 font-bold not-italic uppercase tracking-widest block mb-2 text-xs">Consejo PGC:</span>
              A veces, elegir un motor ligeramente más moderno puede suponer un ahorro de 3.000 € o más simplemente por bajar un tramo de emisiones. Nunca propongas una importación sin calcular antes el impacto del Modelo 576.
            </p>

            {/* BLOQUE 4: LOGÍSTICA */}
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4">
              Bloque 4: Logística y Transporte
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              <div className="bg-[#0a0a0a] border border-white/10 p-10 rounded-sm hover:border-white/20 transition-colors">
                <h4 className="text-gray-500 font-bold mb-6 uppercase text-sm tracking-[0.2em] border-b border-white/5 pb-4">
                  Traer el coche rodando
                </h4>
                <ul className="space-y-4">
                  {["Placas temporales (Zollkennzeichen)", "Combustible, peajes y pernoctas", "Desgaste mecánico y kilómetros", "Responsabilidad legal en ruta"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-gray-600 italic">
                      <span className="text-red-900">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0a0a0a] border border-gold-400/40 p-10 rounded-sm relative shadow-[0_0_50px_rgba(212,175,55,0.05)]">
                <div className="absolute -top-3 left-10 bg-gold-400 text-black text-[9px] font-black uppercase px-4 py-1 tracking-[0.2em]">Recomendación PGC</div>
                <h4 className="text-gold-400 font-bold mb-6 uppercase text-sm tracking-[0.2em] border-b border-gold-400/20 pb-4">
                  Camión Especializado
                </h4>
                <ul className="space-y-4">
                  {["Seguridad total y seguro CMR", "Cero desgaste mecánico", "Costes cerrados e inamovibles", "Entrega directa personalizada"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-gray-200 italic font-medium">
                      <CheckCircle2 size={14} className="text-gold-400 shrink-0 mt-0.5" /> {item}
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
                <div key={i} className="flex items-center gap-10 group">
                  <span className="font-serif italic text-5xl text-white/5 group-hover:text-gold-400/10 transition-colors w-20 shrink-0">{step.n}</span>
                  <div>
                    <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-1">{step.t}</h4>
                    <p className="text-sm italic text-gray-500">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CONCLUSIÓN Y CTA */}
            <div className="bg-[#050505] border border-gold-400/20 p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"></div>
                <h2 className="text-3xl font-serif font-bold mb-6 text-white leading-tight">
                  Importar Bien <span className="text-gold-400 italic">No es Suerte</span>
                </h2>
                <p className="text-gray-500 mb-10 text-sm max-w-2xl mx-auto italic">
                  En <strong>Premium German Cars</strong> controlamos cada variable para que el coche que ve en Alemania siga siendo una gran inversión cuando ya circula en España.
                </p>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                  <a href="/#import" className="inline-flex items-center justify-center gap-3 bg-gold-400 text-black px-12 py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all duration-500">
                    Solicitar Info <Mail size={16} />
                  </a>
                  <Link to="/calculadora-impuesto-matriculacion" className="inline-flex items-center justify-center gap-3 border border-white/10 text-white px-12 py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500">
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
