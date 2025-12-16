import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ImportForm } from "../components/ImportForm";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { SEO } from "../components/SEO";

export default function ImportarCocheAlemania() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Importar coche desde Alemania | Premium German Cars"
        description="Importa tu coche desde Alemania con total garantía. Gestión completa, verificación, transporte y entrega en España."
        canonical="https://www.premiumgermancars.com/importar-coche-alemania"
      />

      <Navbar />

      <main className="bg-metallic-950 text-white">
        {/* HERO */}
        <section className="pt-40 pb-24">
          <div className="container mx-auto px-6 max-w-4xl text-center space-y-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold">
              Importar coche desde Alemania
              <span className="block text-gold-400 mt-3">
                sin riesgos y con garantía total
              </span>
            </h1>

            <p className="text-gray-300 text-lg">
              Servicio profesional de importación de coches premium desde Alemania.
              Nos encargamos de todo el proceso para que recibas tu coche listo para
              circular en España.
            </p>

            <p className="text-sm text-gray-400">
              ✔ Kilómetros certificados · ✔ Historial verificado · ✔ Entrega llave en mano
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
                Accede al mayor mercado europeo de vehículos premium con mejor
                equipamiento y mantenimiento.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-serif mb-4 text-gold-400">
                Gestión completa
              </h3>
              <p className="text-gray-300">
                Búsqueda, verificación, transporte, homologación y matriculación incluidos.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-serif mb-4 text-gold-400">
                Compra segura
              </h3>
              <p className="text-gray-300">
                Proveedores verificados, kilómetros reales y total transparencia.
              </p>
            </div>
          </div>
        </section>

        {/* PROCESO */}
        <section className="py-32">
          <div className="container mx-auto px-6 max-w-4xl space-y-10">
            <h2 className="text-3xl font-serif font-bold text-center">
              ¿Cómo importamos tu coche desde Alemania?
            </h2>

            <ol className="space-y-6 text-gray-300">
              <li><strong>1.</strong> Asesoramiento personalizado.</li>
              <li><strong>2.</strong> Búsqueda y selección en Alemania.</li>
              <li><strong>3.</strong> Verificación técnica y negociación.</li>
              <li><strong>4.</strong> Transporte, homologación y matriculación.</li>
              <li><strong>5.</strong> Entrega en España listo para disfrutar.</li>
            </ol>

            <div className="text-center pt-8">
              <a
                href="#form"
                className="inline-block px-8 py-3 border border-gold-400 text-gold-400 text-sm font-bold uppercase tracking-widest hover:bg-gold-400 hover:text-black transition"
              >
                Quiero asesoramiento
              </a>
            </div>
          </div>
        </section>

        {/* FORMULARIO */}
        <section id="form" className="py-32 bg-metallic-900">
          <div className="container mx-auto px-6 max-w-3xl text-center space-y-8">
            <h2 className="text-3xl font-serif font-bold">
              Cuéntanos qué coche buscas
            </h2>

            <p className="text-gray-300">
              Te asesoramos sin compromiso y te proponemos las mejores opciones en Alemania.
            </p>

            <ImportForm />
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

