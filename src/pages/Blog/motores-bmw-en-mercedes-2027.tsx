import React from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import { Info, Cpu, TrendingUp, ArrowRight } from "lucide-react";

const MotoresBmwMercedes = () => {
  return (
    <>
      <SEO 
        title="¿Motores BMW en Mercedes-Benz para 2027? | Premium German Cars"
        description="Analizamos el posible pacto histórico entre los dos gigantes alemanes para compartir motores de 4 cilindros y tecnología híbrida."
      />
      <Navbar />
      
      <main className="bg-black text-white pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Cabecera */}
          <div className="mb-12">
            <span className="text-gold-400 font-bold tracking-widest text-xs uppercase italic">Análisis Industrial</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6 leading-tight">
              ¿Corazón BMW en un Mercedes? El posible pacto de motores para 2027
            </h1>
            <div className="flex items-center gap-4 text-gray-500 text-sm italic">
              <span>Premium German Cars</span>
              <span className="w-1 h-1 bg-gold-400 rounded-full"></span>
              <span>17 Dic, 2025</span>
            </div>
          </div>

          {/* Imagen Conceptual */}
          <div className="h-80 w-full bg-gradient-to-br from-metallic-800 to-black border border-white/5 flex items-center justify-center mb-16 relative">
             <img src="/logoPGC.svg" className="w-40 opacity-10 brightness-0 invert" alt="PGC Blog" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/20 font-serif text-3xl md:text-5xl font-bold tracking-tighter uppercase">
                  BMW <span className="text-gold-400/20">×</span> MERCEDES
                </div>
             </div>
          </div>

          {/* Cuerpo del Artículo */}
          <div className="prose prose-invert prose-gold max-w-none">
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              En el mundo del motor premium, pocas noticias podrían ser tan disruptivas como una alianza técnica entre <strong>Stuttgart y Múnich</strong>. Los últimos rumores del sector apuntan a que Mercedes-Benz podría estar negociando el uso de motores de 4 cilindros de origen BMW para sus gamas de acceso a partir de 2027.
            </p>

            <div className="bg-metallic-900 border border-white/10 p-8 mb-12">
              <h3 className="text-gold-400 font-bold flex items-center gap-2 mb-4">
                <Info size={20} /> ¿Por qué ahora?
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                La inversión masiva en electrificación está obligando a los fabricantes a reducir costes en el desarrollo de motores de combustión interna (ICE). Compartir bloques motor permitiría a ambos gigantes cumplir con la normativa Euro 7 sin sacrificar márgenes de beneficio.
              </p>
            </div>

            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-12 mb-6 uppercase">Puntos clave de la negociación</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Cpu className="text-gold-400" />
                  <h4 className="font-bold">Eficiencia Modular</h4>
                </div>
                <p className="text-gray-400 text-sm">BMW ha demostrado una eficiencia líder con sus motores modulares B48, un bloque que Mercedes ve con muy buenos ojos por su versatilidad híbrida.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="text-gold-400" />
                  <h4 className="font-bold">Ahorro en I+D</h4>
                </div>
                <p className="text-gray-400 text-sm">Se estima un ahorro conjunto de más de 2.000 millones de euros en los próximos 5 años si el acuerdo llega a materializarse.</p>
              </div>
            </div>

            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-12 mb-6 italic">¿Afectará esto al ADN de la marca?</h2>
            <p className="mb-6">
              Esta es la gran pregunta de los puristas. Sin embargo, no sería la primera vez: Mercedes ya utilizó motores de origen Renault en sus Clases A y B, y BMW ha colaborado con Toyota para el desarrollo del Supra. La clave estará en la <strong>gestión electrónica</strong>: aunque el bloque sea compartido, la "sensación" al volante seguirá siendo 100% Mercedes-Benz.
            </p>

            <blockquote className="border-l-4 border-gold-400 pl-6 py-6 italic text-gray-200 bg-white/5 my-10">
              "En Premium German Cars creemos que estas alianzas son necesarias para preservar el motor de combustión en el mercado premium. La unión de fuerzas garantiza que seguiremos viendo coches emocionantes en la próxima década."
            </blockquote>

            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-12 mb-6 uppercase">Qué esperar en 2027</h2>
            <p className="mb-10">
              Es probable que veamos las primeras unidades de prueba a finales de 2026. Este movimiento podría redefinir el mercado de importación, creando vehículos con una fiabilidad mecánica cruzada sin precedentes.
            </p>
          </div>

          {/* Sección Final / CTA */}
          <div className="mt-20 border-t border-white/10 pt-16 text-center">
            <h3 className="text-2xl font-serif font-bold mb-6 italic">¿Buscas tecnología alemana de vanguardia?</h3>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
              Tanto si prefieres un motor puro Mercedes como si eres fiel a BMW, nosotros seleccionamos para ti las mejores unidades con el historial más transparente del mercado europeo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#import" className="bg-gold-400 text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-gold-500 transition-all">
                Configurar mi pedido
              </a>
              <a href="/blog" className="border border-white/20 px-8 py-4 font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
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

export default MotoresBmwMercedes;
