import React from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import { Info, Cpu, TrendingUp, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

const MotoresBmwMercedes2027 = () => {
  return (
    <>
      <SEO 
        title="¿Motores BMW en Mercedes-Benz? Análisis del Pacto Alemán | Premium German Cars"
        description="Analizamos el rumor del siglo: ¿Llevarán los futuros Mercedes motores BMW? Qué significa para el valor de reventa y la inversión en coches premium."
      />
      <Navbar />
      
      <main className="bg-black text-white pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Cabecera */}
          <div className="mb-12">
            <span className="text-gold-400 font-bold tracking-widest text-xs uppercase italic">Perspectiva del Sector 2026/27</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6 leading-tight text-white">
              ¿Corazón BMW en un Mercedes? El debate de motores para 2027 y cómo afecta a tu inversión
            </h1>
            <div className="flex items-center gap-4 text-gray-500 text-sm italic">
              <span>Premium German Cars</span>
              <span className="w-1 h-1 bg-gold-400 rounded-full"></span>
              <span>17 Dic, 2025</span>
            </div>
          </div>

          {/* Imagen Conceptual con Branding PGC */}
          <div className="h-80 w-full bg-gradient-to-br from-metallic-800 to-black border border-white/5 flex items-center justify-center mb-16 relative overflow-hidden">
             <img src="/logoPGC.svg" className="w-40 opacity-10 brightness-0 invert" alt="PGC Blog" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/10 font-serif text-3xl md:text-6xl font-bold tracking-tighter uppercase select-none text-center">
                  BMW <span className="text-gold-400/20">×</span> MERCEDES
                </div>
             </div>
             <div className="absolute bottom-4 left-6 flex items-center gap-2 text-gold-400/40 text-xs font-bold uppercase tracking-widest">
                <AlertCircle size={14} /> Análisis de Mercado Técnico
             </div>
          </div>

          {/* Cuerpo del Artículo */}
          <div className="prose prose-invert prose-gold max-w-none text-gray-300 leading-relaxed text-justify">
            <p className="text-xl text-gray-200 mb-8 font-light italic border-l-2 border-gold-400 pl-6">
              "En el sector premium, la identidad mecánica es parte del lujo. Ante los rumores de colaboración entre Stuttgart y Múnich, el mercado se pregunta: ¿qué estamos comprando realmente?"
            </p>

            <p className="mb-8">
              Quienes seguimos de cerca las cadenas de montaje de Baviera y Baden-Wurtemberg sabemos que hay titulares que marcan época. El posible pacto entre <strong>Mercedes-Benz y BMW</strong> para compartir motores de 4 cilindros a partir de 2027 ha encendido todas las alarmas. Aunque Mercedes ha defendido su independencia técnica, la presión de la normativa <strong>Euro 7</strong> y los costes de electrificación invitan a una reflexión estratégica para los compradores de reestreno.
            </p>

            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-12 mb-6 uppercase tracking-wider text-white">¿Por qué BMW entra en la conversación?</h2>
            <p className="mb-8">
              Desde un punto de vista técnico, los bloques de 4 cilindros de la <strong>familia B48 de BMW</strong> son una referencia absoluta. Han demostrado un equilibrio notable entre eficiencia y fiabilidad, especialmente en aplicaciones híbridas enchufables (PHEV). Para cualquier fabricante, recurrir a una arquitectura tan madura supone un ahorro en I+D de miles de millones de euros.
            </p>

            {/* Grid de Beneficios Industriales */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-metallic-900 p-6 border border-white/5 rounded-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="text-gold-400" />
                  <h4 className="font-bold text-white uppercase tracking-tight">Eficiencia Líder</h4>
                </div>
                <p className="text-sm text-gray-400">El bloque B48 de BMW es extremadamente versátil para configuraciones híbridas, un factor vital para la transición de 2027.</p>
              </div>
              <div className="bg-metallic-900 p-6 border border-white/5 rounded-sm">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="text-gold-400" />
                  <h4 className="font-bold text-white uppercase tracking-tight">Valor de Reventa</h4>
                </div>
                <p className="text-sm text-gray-400">Las marcas buscan proteger sus márgenes compartiendo piezas no visibles, lo que estandariza la fiabilidad a largo plazo.</p>
              </div>
            </div>

            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-12 mb-6 italic text-white">¿Cómo afecta esto a tu inversión?</h2>
            <p className="mb-6">
              Como especialistas en importación en <strong>Premium German Cars</strong>, analizamos este escenario para proteger el valor de tu compra:
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex gap-4 items-start">
                <ShieldCheck className="text-gold-400 shrink-0 mt-1" size={24} />
                <p><strong>BMW como referente:</strong> Si el mercado asume que BMW marca el estándar mecánico, los modelos actuales (Serie 3, Serie 5, X5) mantendrán un valor residual muy superior.</p>
              </div>
              <div className="flex gap-4 items-start">
                <ShieldCheck className="text-gold-400 shrink-0 mt-1" size={24} />
                <p><strong>Mercedes y su ADN:</strong> Las unidades actuales de Mercedes desarrolladas íntegramente en Stuttgart podrían convertirse en los últimos exponentes de una era de independencia total, aumentando su atractivo para puristas.</p>
              </div>
            </div>

            <blockquote className="border-l-4 border-gold-400 pl-6 py-6 italic text-gray-200 bg-white/5 my-10 text-lg">
              "Independientemente de acuerdos futuros, las unidades actuales con ADN 100% propio representan una arquitectura mecánica madura que difícilmente se volverá a ver en el mercado premium."
            </blockquote>

            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-12 mb-6 uppercase tracking-wider text-white text-center">Conclusión de Premium German Cars</h2>
            <p className="mb-10">
              Estamos en un punto de inflexión del mercado alemán. Importar hoy un BMW o un Mercedes de reestreno significa asegurar una unidad con la ingeniería de su marca en su forma más madura. Nuestro consejo desde Cambrils es claro: <strong>no esperes a que los cambios se oficialicen; anticípate y asegura una mecánica de identidad probada.</strong>
            </p>
          </div>

          {/* Sección Final / CTA */}
          <div className="mt-20 border-t border-white/10 pt-16 text-center">
            <h3 className="text-3xl font-serif font-bold mb-6 italic text-white">¿Buscas ingeniería alemana pura?</h3>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
              Tanto si eres fiel a la propulsión de Múnich como si buscas el confort de Stuttgart, seleccionamos para ti las mejores unidades con historial 100% transparente.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="/#import" className="bg-gold-400 text-black px-10 py-4 font-bold uppercase tracking-widest hover:bg-gold-500 transition-all flex items-center justify-center gap-2">
                Configurar mi pedido <ArrowRight size={18} />
              </a>
              <a href="/blog" className="border border-white/20 text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
                Volver al Blog
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default MotoresBmwMercedes2027;
