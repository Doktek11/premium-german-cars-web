import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { SEO } from "../../components/SEO";
import { 
  ChevronLeft, 
  CheckCircle2, 
  Mail, 
  ArrowRight, 
  AlertTriangle,
  ShieldCheck,
  Search,
  FileText,
  CreditCard
} from 'lucide-react';

const RiesgosImportarCocheAlemania = () => {
  return (
    <>
      <SEO 
        title="5 Riesgos al Importar de Alemania en 2026 y Cómo Evitarlos | PGC"
        description="Evite estafas, problemas de IVA y vicios ocultos. Conozca el método de verificación de Premium German Cars para una importación segura y rentable."
        article={true}
        image="/logoPGC.svg"
        canonical="https://premiumgermancars.com/blog/5-riesgos-importar-coche-alemania"
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
              <span className="inline-block bg-red-950/30 text-red-500 px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-black border border-red-500/20">
                Seguridad y Control de Riesgos
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">
                Los 5 Riesgos al Importar de Alemania <span className="text-gold-400 block md:inline italic">que Arruinan tu Inversión</span>
              </h1>
            </div>
            <div className="flex items-center gap-6 mt-10 text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold">
              <span>Premium German Cars</span>
              <span className="w-8 h-[1px] bg-gold-400/30"></span>
              <span>7 Enero, 2026</span>
            </div>
          </header>

          {/* HERO VISUAL */}
          <div className="aspect-[21/9] w-full bg-[#0a0a0a] border border-white/5 flex flex-col items-center justify-center mb-20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/5 via-transparent to-transparent opacity-50"></div>
              <img src="/logoPGC.svg" className="w-64 opacity-20 brightness-0 invert transition-transform duration-700 group-hover:scale-110" alt="PGC Logo" />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold-400/40 font-serif italic text-xs tracking-[0.5em] uppercase">
                Método de Tolerancia Cero
              </div>
          </div>

          <div className="prose prose-invert prose-gold max-w-none text-gray-300 leading-relaxed">
            
            {/* INTRODUCCIÓN */}
            <section className="mb-20">
              <p className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
                Importar un coche premium en 2026 ya no es un proceso inocente. Con el auge de la demanda, han aparecido situaciones de riesgo que pueden convertir un "chollo" en un problema legal y financiero serio.
              </p>
              <p className="mb-6 text-justify text-lg text-gray-400">
                Muchos particulares parten de una idea equivocada: “si viene de Alemania, todo es legal y transparente”. Sin embargo, en <strong>Premium German Cars</strong> sabemos que la mayoría de los problemas aparecen antes de firmar o enviar el primer pago. Nuestro método de verificación está diseñado para que su operación sea, por encima de todo, segura.
              </p>
            </section>

            {/* RIESGO 1 */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <CreditCard size={14} /> Riesgo 1: El IVA Mal Planteado (Netto vs Brutto)
              </h2>
              <p className="text-lg mb-8">
                El error más costoso. Un coche aparentemente un 19% más barato puede esconder una estructura fiscal que Hacienda reclamará al llegar a España.
              </p>
              <div className="grid md:grid-cols-2 gap-8 bg-[#0a0a0a] p-8 border border-white/5">
                <div>
                  <h4 className="text-red-500 font-bold uppercase text-xs tracking-widest mb-4">Puntos Críticos</h4>
                  <ul className="space-y-3 text-sm italic">
                    <li>• Vendedores sin capacidad de emitir factura con IVA desglosado.</li>
                    <li>• Anuncios que ocultan una fiscalidad inadecuada para exportación.</li>
                  </ul>
                </div>
                <div className="border-l border-gold-400/30 pl-8">
                  <h4 className="text-gold-400 font-bold uppercase text-xs tracking-widest mb-4">Protocolo PGC</h4>
                  <ul className="space-y-3 text-sm font-bold">
                    <li className="flex items-center gap-2 text-white"><CheckCircle2 size={14} className="text-gold-400" /> Verificación NIF intracomunitario.</li>
                    <li className="flex items-center gap-2 text-white"><CheckCircle2 size={14} className="text-gold-400" /> Confirmación de deducibilidad real.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* RIESGO 2 */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <AlertTriangle size={14} /> Riesgo 2: Reparaciones Ocultas (Unfallfrei Falso)
              </h2>
              <p className="text-lg mb-8 text-justify font-medium text-white">
                El término "Unfallfrei" tiene validez legal, pero se manipula. Detectamos daños estructurales que no se aprecian a simple vista para evitar que compre un vehículo accidentado.
              </p>
              <div className="bg-gradient-to-r from-gold-400/5 to-transparent p-8 border-l-2 border-gold-400">
                <h4 className="text-white font-black text-sm uppercase mb-4 tracking-tighter">Cómo protegemos su compra:</h4>
                <p className="text-base text-gray-400 italic">
                  Exigimos el historial digital oficial de la marca y realizamos inspecciones técnicas con medición de espesor de pintura. Si hay rastro de soldaduras no originales o bancada, la unidad se descarta.
                </p>
              </div>
            </section>

            {/* RIESGO 3 */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <Search size={14} /> Riesgo 3: Kilometraje Incoherente
              </h2>
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <p className="text-lg leading-relaxed">
                    Un cuadro con pocos kilómetros no siempre refleja la realidad. Algunos vehículos rotan por varios países europeos para "limpiar" su historial antes de volver al mercado alemán.
                  </p>
                </div>
                <div className="w-full md:w-72 bg-white/5 p-6 border border-white/10">
                  <span className="text-[10px] font-black text-gold-400 uppercase tracking-[0.2em] block mb-4">Verificación PGC</span>
                  <p className="text-xs font-bold leading-loose text-gray-300">
                    ANALIZAMOS DESGASTE DE: <br/>
                    • VOLANTE Y PEDALES <br/>
                    • DISCOS DE FRENO <br/>
                    • HISTORIAL DE REVISIONES OFICIALES
                  </p>
                </div>
              </div>
            </section>

            {/* RIESGO 4 */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <ShieldCheck size={14} /> Riesgo 4: Pagos Anticipados sin Verificación
              </h2>
              <div className="bg-red-900/10 border border-red-900/20 p-10">
                <p className="text-white font-bold mb-6 text-xl italic">
                  "Existen webs que imitan concesionarios reales con precisión quirúrgica."
                </p>
                <p className="text-gray-400 text-base mb-0">
                  En <strong>Premium German Cars</strong> nunca autorizamos un pago basándonos solo en información online. Verificamos telefónicamente con la matriz y confirmamos la titularidad real de las cuentas bancarias antes de emitir cualquier transferencia.
                </p>
              </div>
            </section>

            {/* RIESGO 5 */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <FileText size={14} /> Riesgo 5: Documentación Incompleta (ITV)
              </h2>
              <p className="text-lg mb-10 text-justify">
                El problema aparece cuando el coche llega a España. Sin el COC (Certificado de Conformidad) original o con errores en los documentos Teil I y Teil II, la matriculación puede quedar bloqueada indefinidamente.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {["COC Original", "Teil I & II", "Contrato Legal", "Ficha Euro 6"].map((doc, i) => (
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
                  Importar Bien <span className="text-gold-400 italic">es Cuestión de Método</span>
                </h2>
                <p className="text-gray-300 mb-10 text-base max-w-2xl mx-auto font-bold">
                  Los riesgos en Alemania son previsibles y evitables. No deje su inversión al azar; aplique nuestro protocolo de verificación experto.
                </p>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                  <a 
                    href="https://wa.me/34603743608?text=Hola,%20he%20leído%20el%20artículo%20sobre%20los%205%20riesgos%20y%20quiero%20verificar%20un%20coche." 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-gold-400 text-black px-12 py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all duration-500"
                  >
                    Hablar con Especialista <Mail size={16} />
                  </a>
                  <Link to="/calculadora-impuesto-matriculacion" className="inline-flex items-center justify-center gap-3 border border-white/10 text-white px-12 py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500">
                    Calculadora de Ahorro <ArrowRight size={16} />
                  </Link>
                </div>
                <p className="text-[9px] text-gray-600 mt-12 font-black tracking-[0.4em] uppercase">
                  👉 Verificación Premium German Cars — Resultados Garantizados
                </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RiesgosImportarCocheAlemania;
