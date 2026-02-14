import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { SEO } from "../../components/SEO";
import {
  ChevronLeft,
  Mail,
  Zap,
  Fuel,
  Leaf,
  Gauge,
  Calculator
} from 'lucide-react';

const EleccionMotor2026 = () => {
  return (
    <>
      <SEO
        title="¿Diésel, Gasolina o Híbrido? Guía de Motores 2026 | PGC"
        description="Qué motor elegir al importar de Alemania en 2026: Etiquetas ZBE, fiscalidad y ahorro. Analizamos PHEV, MHEV y motores térmicos de reestreno."
        article={true}
        image="/logoPGC.svg"
        canonical="https://www.premiumgermancars.com/blog/que-motor-elegir-importar-alemania-2026"
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
              <span className="inline-block bg-blue-950/30 text-blue-400 px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-black border border-blue-500/20">
                Guía de Compra Inteligente
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">
                ¿Diésel, Gasolina o Híbrido? <span className="text-gold-400 block md:inline italic">Qué motor elegir en 2026</span>
              </h1>
            </div>
            <div className="flex items-center gap-6 mt-10 text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold">
              <span>Premium German Cars</span>
              <span className="w-8 h-[1px] bg-gold-400/30"></span>
              <span>12 Enero, 2026</span>
            </div>
          </header>

          {/* HERO VISUAL */}
          <div className="aspect-[21/9] w-full bg-[#0a0a0a] border border-white/5 flex flex-col items-center justify-center mb-20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-600/5 via-transparent to-transparent opacity-50"></div>
            <img src="/logoPGC.svg" className="w-64 opacity-20 brightness-0 invert transition-transform duration-700 group-hover:scale-110" alt="PGC Logo" />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold-400/40 font-serif italic text-xs tracking-[0.5em] uppercase">
              Análisis Técnico y Fiscal
            </div>
          </div>

          <div className="prose prose-invert prose-gold max-w-none text-gray-300 leading-relaxed">

            {/* INTRODUCCIÓN */}
            <section className="mb-20">
              <p className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
                En 2026, la pregunta clave no es cuánto corre el coche, sino qué etiqueta obtendrá y cómo afectará a tu movilidad diaria.
              </p>
              <p className="mb-6 text-justify text-lg text-gray-400">
                Con las Zonas de Bajas Emisiones (ZBE) plenamente activas, elegir el motor equivocado puede significar limitaciones de movilidad o una fiscalidad innecesariamente alta. En <strong>Premium German Cars</strong> analizamos cada unidad desde un punto de vista técnico, fiscal y de uso real.
              </p>
            </section>

            {/* 1. DIESEL */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <Fuel size={14} /> 1. Diésel de Reestreno: El "Rey" de la Autopista
              </h2>
              <p className="text-lg mb-8">
                El mercado alemán sigue siendo el mejor lugar para encontrar unidades diésel modernas (Euro 6d-ISC-FCM) en estado impecable.
              </p>
              <div className="grid md:grid-cols-2 gap-8 bg-[#0a0a0a] p-8 border border-white/5">
                <div>
                  <h4 className="text-gold-400 font-bold uppercase text-xs tracking-widest mb-4">Análisis PGC</h4>
                  <ul className="space-y-3 text-sm italic">
                    <li>• Etiqueta C (Verde) en España.</li>
                    <li>• Impuesto matriculación: Tramo del 4,75%.</li>
                    <li>• Ideal para recorrer más de 20.000 km/año.</li>
                  </ul>
                </div>
                <div className="border-l border-white/10 pl-8">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Es el motor ideal para devorar kilómetros por la AP-7 con una sola carga de depósito. No lo recomendamos si tu uso es 100% urbano.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. MILD HYBRID */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <Zap size={14} /> 2. Mild Hybrid (MHEV): El Equilibrio Perfecto
              </h2>
              <p className="text-lg mb-8 text-justify">
                La opción más inteligente para la mayoría. Gran parte del stock alemán de BMW, Mercedes y Audi desde 2021 incorpora este sistema de 48V.
              </p>
              <div className="bg-gradient-to-r from-gold-400/5 to-transparent p-8 border-l-2 border-gold-400">
                <h4 className="text-white font-black text-sm uppercase mb-4">La Ventaja ECO:</h4>
                <p className="text-base text-gray-400 italic">
                  Independientemente de que el motor sea gasolina o diésel, en España reciben <strong>Etiqueta ECO</strong>. Acceso sin restricciones a ZBE y ventajas en aparcamiento.
                </p>
              </div>
            </section>

            {/* 3. PHEV */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <Leaf size={14} /> 3. Híbridos Enchufables (PHEV): El Ganador Fiscal
              </h2>
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="flex-1">
                  <p className="text-lg leading-relaxed mb-6">
                    Si puedes cargar a diario, el PHEV es el vencedor absoluto. La mayoría emiten menos de 45 g/km de CO₂, lo que exime del impuesto de matriculación.
                  </p>
                </div>
                <div className="w-full md:w-72 bg-white/5 p-6 border border-white/10">
                  <span className="text-[10px] font-black text-gold-400 uppercase tracking-[0.2em] block mb-4">Ahorro Directo</span>
                  <p className="text-2xl font-bold text-white mb-2">0%</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Impuesto de Matriculación en España</p>
                </div>
              </div>
            </section>

            {/* 4. GASOLINA */}
            <section className="mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-400 mb-6 border-b border-gold-400/20 pb-4 flex items-center gap-3">
                <Gauge size={14} /> 4. Gasolina Moderno: Pureza y Rendimiento
              </h2>
              <p className="text-lg mb-10 text-justify">
                Alemania es el paraíso para encontrar motores de 6 y 8 cilindros. Aunque la fiscalidad puede situarse en tramos del 9,75% o 14,75%, para el entusiasta es una inversión en exclusividad y sensaciones.
              </p>
            </section>

            {/* CONCLUSIÓN Y CTA */}
            <div className="bg-[#0a0a0a] border border-gold-400/20 p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"></div>
              <h2 className="text-3xl font-bold mb-6 text-white leading-tight">
                Importar bien empieza por <span className="text-gold-400 italic">elegir el motor correcto</span>
              </h2>
              <p className="text-gray-300 mb-10 text-base max-w-2xl mx-auto font-bold">
                ¿Dudas con la etiqueta de un modelo concreto? Pásanos el enlace de Mobile.de y te confirmamos su fiscalidad en 10 minutos.
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <a
                  href="https://wa.me/34603743608?text=Hola,%20tengo%20dudas%20sobre%20qué%20motor%20elegir%20para%20mi%20coche%20de%20importación."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-gold-400 text-black px-12 py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all duration-500"
                >
                  Consultar a un Experto <Mail size={16} />
                </a>
                <Link to="/calculadora-impuesto-matriculacion" className="inline-flex items-center justify-center gap-3 border border-white/10 text-white px-12 py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500">
                  <Calculator size={16} /> Ir a la Calculadora
                </Link>
              </div>
              <p className="text-[9px] text-gray-600 mt-12 font-black tracking-[0.4em] uppercase">
                👉 Premium German Cars — Cambrils | Tarragona
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default EleccionMotor2026;
