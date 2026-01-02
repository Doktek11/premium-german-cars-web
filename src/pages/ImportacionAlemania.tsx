import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { SEO } from "../components/SEO";
import { X, CheckCircle2, ShieldCheck, Gem, Clock, ArrowRight } from "lucide-react";

export const ImportacionAlemania: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = [
    { title: "Consultoría y búsqueda", desc: "Analizamos contigo modelo, presupuesto, uso y equipamiento. No proponemos coches al azar." },
    { title: "Verificación en origen", desc: "Auditamos la unidad antes de comprarla: mecánica, electrónica, estructura y situación legal." },
    { title: "Negociación profesional", desc: "Hablamos el idioma del vendedor y defendemos tus intereses para las mejores condiciones." },
    { title: "Logística asegurada", desc: "Transporte profesional en camión porta-coches con seguro a todo riesgo hasta Cambrils." },
    { title: "Gestión de trámites", desc: "ITV de importación, ficha técnica, impuestos y matriculación. Sin gestiones para ti." },
    { title: "Entrega final", desc: "Te entregamos el coche listo para rodar, en tu domicilio o en nuestras instalaciones." }
  ];

  return (
    <>
      <SEO
        title="Importación de coches desde Alemania en Cambrils | Premium German Cars"
        description="Especialistas en selección de activos mecánicos en Alemania. Historial certificado, gestión integral y entrega llave en mano en Tarragona y Cataluña."
        canonical="https://www.premiumgermancars.com/importacion-coches-alemania"
      />

      <Navbar />

      <main className="bg-black text-white pt-32 pb-20">
        {/* HERO SECTION */}
        <section className="container mx-auto px-6 max-w-5xl text-center mb-24">
          <span className="text-gold-400 text-xs font-bold tracking-[0.4em] uppercase mb-6 block">
            Especialistas en Cambrils (Tarragona)
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
            Importación de coches <br />
            <span className="text-gold-400 italic font-light">desde Alemania</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
            Accede al mercado premium más exigente de Europa con total tranquilidad. 
            Historial certificado, selección profesional y <span className="text-white font-medium">cero improvisaciones</span>.
          </p>
        </section>

        {/* SECTION: LOS "NO" - FILTRADO DE CLIENTE */}
        <section className="container mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-white/10">
            {[
              "No trabajamos con stock genérico.",
              "No perseguimos «gangas».",
              "No improvisamos."
            ].map((text, i) => (
              <div key={i} className="flex items-center justify-center gap-4 group">
                <X className="text-red-600 group-hover:scale-125 transition-transform" size={28} />
                <span className="text-xl font-bold tracking-tight uppercase">{text}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center max-w-3xl mx-auto">
            <p className="text-lg text-gray-400 leading-relaxed">
              Nuestro enfoque es claro: no solo traemos coches, seleccionamos <strong>activos mecánicos</strong> para clientes que valoran la transparencia, la seguridad y el valor a largo plazo.
            </p>
            <p className="text-gold-400 font-serif text-2xl mt-6 italic">
              "Importar bien no es cuestión de suerte, sino de criterio."
            </p>
          </div>
        </section>

        {/* SECTION: POR QUÉ ALEMANIA */}
        <section className="bg-metallic-900 py-24 mb-32">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">
              ¿Por qué Alemania sigue siendo la mejor opción en 2026?
            </h2>
            <div className="space-y-6 text-gray-300 text-lg">
              <p>Alemania no es solo el mayor mercado de automóviles de Europa; es también el más riguroso, documentado y profesional.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {[
                  "Mantenimientos estrictos en entornos oficiales",
                  "Registros completos y verificables",
                  "Configuraciones premium poco habituales en España",
                  "Base sólida para mantener alto valor de reventa"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-black/40 p-4 rounded-lg border border-white/5">
                    <CheckCircle2 className="text-gold-400 shrink-0" size={20} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="pt-8 border-t border-white/10 mt-8 italic text-center">
                👉 Aquí es donde se nota la diferencia entre importar... y elegir bien.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: POR QUÉ ELEGIR PGC (BENEFICIOS) */}
        <section className="container mx-auto px-6 max-w-6xl mb-32">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 text-center">¿Por qué elegir Premium German Cars?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Beneficio 1 */}
            <div className="space-y-4">
              <ShieldCheck className="text-gold-400" size={40} />
              <h3 className="text-xl font-bold uppercase tracking-wider">Garantía y trazabilidad certificada</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                No negociamos con la seguridad. Cada vehículo cuenta con historial 100% documentado y kilometraje coherente. Si no es transparente, no lo trabajamos.
              </p>
            </div>
            {/* Beneficio 2 */}
            <div className="space-y-4">
              <Gem className="text-gold-400" size={40} />
              <h3 className="text-xl font-bold uppercase tracking-wider">Exclusividad seleccionada</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Accede a niveles de equipamiento y motorizaciones superiores poco comunes en el mercado nacional. Tú pones los requisitos, nosotros filtramos el mercado.
              </p>
            </div>
            {/* Beneficio 3 */}
            <div className="space-y-4">
              <Clock className="text-gold-400" size={40} />
              <h3 className="text-xl font-bold uppercase tracking-wider">Reducción real de riesgos</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Nos contratas para evitar errores costosos y eliminar incertidumbre legal. Tomamos decisiones basadas en datos técnicos, no en suposiciones.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: TIMELINE PROCESO */}
        <section className="bg-metallic-950 py-24 border-y border-white/5">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-center">Nuestro proceso "Llave en Mano"</h2>
            <p className="text-gray-400 text-center mb-16 italic">Cero preocupaciones. Control total.</p>
            
            <div className="space-y-12">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-6 md:gap-10 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border-2 border-gold-400 flex items-center justify-center text-gold-400 font-bold shrink-0 bg-black">
                      {i + 1}
                    </div>
                    {i !== steps.length - 1 && <div className="w-px h-full bg-gold-400/30 mt-2"></div>}
                  </div>
                  <div className="pb-10">
                    <h3 className="text-xl font-bold mb-2 uppercase tracking-wide text-white">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: CTA FINAL */}
        <section className="container mx-auto px-6 py-24">
          <div className="bg-gradient-to-br from-metallic-900 to-black p-12 md:p-20 rounded-3xl border border-gold-400/20 text-center relative overflow-hidden">
            <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">¿Buscas un modelo o configuración concreta?</h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                No te limites al stock reducido de tu zona. El mercado alemán ofrece miles de unidades... pero solo unas pocas merecen realmente la pena. 
                Clientes de toda <strong>Cataluña</strong> confían en nuestro criterio.
              </p>
              <a
                href="https://wa.me/34603743608?text=Hola!%20Me%20gustaría%20solicitar%20un%20presupuesto%20personalizado%20para%20importar%20un%20coche."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-12 py-6 bg-gold-400 text-black font-bold uppercase tracking-widest hover:bg-white transition-all duration-500 rounded-full shadow-2xl shadow-gold-400/10"
              >
                Solicitar presupuesto personalizado <ArrowRight size={20} />
              </a>
              <p className="mt-8 text-xs text-gray-500 uppercase tracking-widest font-bold">
                Importar bien no es cuestión de suerte, sino de criterio
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};
