import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ImportForm } from "../components/ImportForm";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { SEO } from "../components/SEO";

export const ImportarCocheAlemania: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Importar coche desde Alemania | Premium German Cars"
        description="Importa tu coche premium desde Alemania con total garantía. Búsqueda personalizada, verificación, transporte y entrega en España."
      />

      <Navbar />

      <main className="bg-metallic-950 text-white">

        {/* HERO */}
        <section className="pt-40 pb-32">
          <div className="container mx-auto px-6 max-w-4xl text-center space-y-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold">
              Importa tu coche desde Alemania  
              <span className="block text-gold-400 mt-2">
                con total garantía y sin complicaciones
              </span>
            </h1>

            <p className="text-gray-300 text-lg">
              Nos encargamos de todo el proceso de importación de coches premium
              desde Alemania. Tú eliges el coche, nosotros hacemos el resto.
            </p>

            <a
              href="#form"
              className="inline-block mt-6 px-10 py-4 border border-gold-400 text-gold-400 font-bold uppercase tracking-widest hover:bg-gold-400 hover:text-black transition"
            >
              Solicitar asesoramiento
            </a>
          </div>
        </section>

        {/* BENEFICIOS */}
        <section className="py-32 bg-metallic-900">
          <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-3 gap-12 text-center">
            <div>
              <h3 className="text-xl font-serif mb-4 text-gold-400">
                Mercado alemán
              </h3>
              <p className="text-gray-300">
                Accede al mayor mercado europeo de vehículos premium, con más
                equipamiento y mejor historial.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-serif mb-4 text-gold-400">
                Proceso llave en mano
              </h3>
              <p className="text-gray-300">
                Búsqueda, verificación, transporte, homologación y matriculación
                incluidos.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-serif mb-4 text-gold-400">
                Transparencia total
              </h3>
              <p className="text-gray-300">
                Kilómetros reales, historial completo y proveedores verificados.
              </p>
            </div>
          </div>
        </section>

        {/* PROCESO */}
        <section className="py-32">
          <div className="container mx-auto px-6 max-w-4xl space-y-10">
            <h2 className="text-3xl font-serif font-bold text-center">
              Nuestro proceso de importación
            </h2>

            <ol className="space-y-6 text-gray-300">
              <li><strong>1.</strong> Asesoramiento y definición del coche ideal.</li>
              <li><strong>2.</strong> Búsqueda en Alemania y selección de unidades.</li>
              <li><strong>3.</strong> Verificación técnica y negociación.</li>
              <li><strong>4.</strong> Transporte, homologación y matriculación.</li>
              <li><strong>5.</strong> Entrega final en España.</li>
            </ol>
          </div>
        </section>

        {/* FORMULARIO */}
        <section id="form" className="py-32 bg-metallic-900">
          <div className="container mx-auto px-6 max-w-3xl text-center space-y-8">
            <h2 className="text-3xl font-serif font-bold">
              ¿Buscas un coche en Alemania?
            </h2>

            <p className="text-gray-300">
              Cuéntanos qué coche estás buscando y te asesoramos sin compromiso.
            </p>

            <ImportForm />
          </div>
        </section>

        {/* SEO CONTENT */}
        <section className="py-32">
          <div className="container mx-auto px-6 max-w-4xl text-gray-300 leading-relaxed space-y-6">
            <h2 className="text-2xl font-serif font-bold text-white">
              Especialistas en importación de coches premium desde Alemania
            </h2>

            <p>
              En Premium German Cars ayudamos a nuestros clientes a importar
              coches desde Alemania de forma segura y transparente. Trabajamos
              exclusivamente con vehículos premium, seleccionados cuidadosamente
              y con historial completo.
            </p>

            <p>
              Importar un coche alemán permite acceder a mejores precios, más
              equipamiento y mayor fiabilidad. Nuestro servicio está pensado para
              quienes buscan calidad, confianza y una experiencia sin riesgos.
            </p>
          </div>
        </section>

      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};
