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
  Info 
} from 'lucide-react';

const ComoImportarCocheAlemania = () => {
  return (
    <>
      <SEO 
        title="Guía 2026: Importar un Coche de Alemania | Premium German Cars"
        description="Guía experta 2026 para importar vehículos premium de Alemania a España sin sorpresas fiscales. Protocolo PGC."
      />
      <Navbar />
      
      <main className="bg-black text-white pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* CABECERA DE ALTA GAMA */}
          <header className="mb-16">
            <Link to="/blog" className="text-gray-500 hover:text-gold-400 mb-10 inline-flex items-center gap-2 transition-all group tracking-[0.2em] text-[10px] uppercase font-bold">
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Volver al Blog
            </Link>
            <div className="space-y-4">
              <span className="inline-block bg-gold-400/10 text-gold-400 px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-black border border-gold-400/20">
                Protocolo de Importación 2026
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold leading-[1.1] tracking-tight">
                Guía para Importar de Alemania <span className="text-gold-400 italic text-3xl md:text-5xl block md:inline">sin Sorpresas Fiscales</span>
              </h1>
            </div>
            <div className="flex items-center gap-6 mt-10 text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold">
              <span>Premium German Cars</span>
              <span className="w-8 h-[1px] bg-gold-400/30"></span>
              <span>5 Enero, 2026</span>
            </div>
          </header>

          {/* HERO VISUAL SUSTITUYENDO EL ANTERIOR */}
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
              <p className="mb-6">
                En 2026, la importación ya no va solo de encontrar buen precio en plataformas como Mobile.de o AutoScout24. Va de entender la fiscalidad real, las emisiones y la documentación que protege su inversión.
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
              Aquí es donde fallan la mayoría de particulares: solo miran el precio en Alemania, sin calcular el valor oficial de Hacienda (BOE) una vez el coche cruza la frontera.
            </p>

            <div className="bg-[#0a0a0a] p-10 border border-white/5 rounded-sm mb-20">
              <h4 className="text-gold-400 font-bold mb-8 uppercase tracking-widest text-xs flex items-center gap-2">
                <Info size={14} /> El concepto clave: reestreno
              </h4>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6 text-sm">
                  <div>
                    <span className="text-white font-bold block mb-1 uppercase tracking-tighter italic">Depreciación BOE</span>
                    <p>Al cumplir los 24 meses, el valor oficial cae de forma notable, reduciendo drásticamente el impuesto de matriculación.</p>
                  </div>
                  <div>
                    <span className="text-white font-bold block mb-1 uppercase tracking-tighter italic">Programas de Garantía</span>
                    <p>Programas como <span className="text-gold-400">Junge Sterne</span> o <span className="text-gold-400">Premium Selection</span> mantienen la cobertura oficial en concesionarios españoles.</p>
                  </div>
                </div>
                <div className="bg-white/5 p-6 border-l border-gold-400">
                  <span className="text-[10px] uppercase font-black text-gray-500 block mb-4 tracking-widest">Filtros Indispensables PGC</span>
                  <ul className="space-y-3 text-[11px] uppercase tracking-wider font-bold text-gray-300">
                    <li className="flex items-center gap-2 italic">✔ Historial Completo</li>
                    <li className="flex items-center gap-2 italic">✔ KM Coherente</li>
                    <li className="flex items-center gap-2 italic text-gold-400">✔ IVA Deducible (MwSt.)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* BLOQUE 2: DOCUMENTACIÓN */}
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4">
              Bloque 2: Documentos Críticos
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {[
                { t: "COC", d: "Certificado de Conformidad. Sin él, la ITV de importación se bloquea." },
                { t: "Teil I & II", d: "Documentos originales de circulación. Imprescindibles en formato físico." },
                { t: "Kaufvertrag", d: "Factura o contrato. La base legal para liquidar IVA o ITP correctamente." }
              ].map((doc, i) => (
                <div key={i} className="p-6 bg-[#0a0a0a] border border-white/5 hover:border-gold-400/30 transition-colors">
                  <span className="text-gold-400 font-black text-xl mb-4 block">0{i+1}</span>
                  <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">{doc.t}</h4>
                  <p className="text-[11px] leading-relaxed text-gray-500 italic">{doc.d}</p>
                </div>
              ))}
            </div>

            {/* BLOQUE 4: LOGÍSTICA CORREGIDO */}
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4">
              Bloque 4: Logística y Transporte
            </h2>
            <p className="mb-10 text-lg text-white font-serif italic text-center">
              "La logística es donde más errores caros se cometen una vez comprado el vehículo."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              {/* OPCIÓN 1 */}
              <div className="bg-[#0a0a0a] border border-white/10 p-10 rounded-sm flex flex-col justify-between hover:border-white/20 transition-colors">
                <div>
                  <h4 className="text-gray-500 font-bold mb-6 uppercase text-sm tracking-[0.2em] border-b border-white/5 pb-4">
                    Opción 1: Traer el coche rodando
                  </h4>
                  <p className="text-[11px] text-gray-500 mb-8 italic leading-relaxed uppercase tracking-wider">
                    Implica riesgos y costes ocultos que a menudo superan el ahorro inicial:
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Placas temporales y seguro internacional",
                      "Peajes, combustible y pernoctas",
                      "Riesgo de averías o daños en ruta",
                      "Kilómetros añadidos al odómetro",
                      "Responsabilidad legal fuera de España"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-xs text-gray-600 italic">
                        <span className="text-red-900">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* OPCIÓN 2 - PREMIUM */}
              <div className="bg-[#0a0a0a] border border-gold-400/40 p-10 rounded-sm flex flex-col justify-between relative shadow-[0_0_50px_rgba(212,175,55,0.05)]">
                <div className="absolute -top-3 left-10 bg-gold-400 text-black text-[9px] font-black uppercase px-4 py-1 tracking-[0.2em]">
                  Recomendación PGC
                </div>
                <div>
                  <h4 className="text-gold-400 font-bold mb-6 uppercase text-sm tracking-[0.2em] border-b border-gold-400/20 pb-4">
                    Opción 2: Camión Especializado
                  </h4>
                  <p className="text-[11px] text-white mb-8 italic font-bold uppercase tracking-wider">
                    Protocolo profesional para vehículos de alta gama:
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Seguridad absoluta durante el trayecto",
                      "Cero desgaste mecánico y de neumáticos",
                      "Seguro profesional de carga CMR",
                      "Costes cerrados desde el primer día",
                      "Entrega directa en nuestras instalaciones"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-xs text-gray-200 italic font-medium">
                        <CheckCircle2 size={14} className="text-gold-400 shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-center font-serif italic text-xl text-white mb-24 leading-snug">
              Es la diferencia entre una importación <span className="text-gray-600">improvisada</span> y una importación <span className="text-gold-400 font-bold uppercase tracking-widest not-italic text-sm">profesional</span>.
            </p>

            {/* BLOQUE 5: TRÁMITES */}
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-12 border-b border-gold-400/20 pb-4">
              Bloque 5: Fase Final en España
            </h2>
            <div className="space-y-12 mb-24">
              {[
                { n: "I", t: "ITV de importación", d: "Verificación técnica y documental rigurosa." },
                { n: "II", t: "Modelo 576", d: "Liquidación del impuesto de matriculación real. El punto crítico fiscal." },
                { n: "III", t: "IVTM e IV", d: "Impuesto de circulación y tasas de tráfico." },
                { n: "IV", t: "DGT", d: "Emisión de placas españolas y permiso de circulación definitivo." }
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

            {/* CONCLUSIÓN Y CTA UNIFICADO */}
            <div className="bg-[#050505] border border-gold-400/20 p-12 text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"></div>
                <h2 className="text-3xl font-serif font-bold mb-6 text-white leading-tight">
                  Importar Bien <span className="text-gold-400 italic">No es Suerte</span>
                </h2>
                <div className="text-gray-500 mb-10 text-sm max-w-2xl mx-auto italic leading-relaxed">
                  <p className="mb-4">Importar en 2026 sigue siendo altamente rentable, pero no permite improvisaciones. En <strong>Premium German Cars</strong> controlamos cada variable para que su único trabajo sea disfrutar de su nuevo vehículo.</p>
                </div>
                
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
