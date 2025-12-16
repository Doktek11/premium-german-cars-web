import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { SEO } from "../components/SEO";

export default function ImportacionAlemania() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* SEO */}
      <SEO
        title="Importación de coches premium desde Alemania"
        description="Servicio integral de importación de coches premium desde Alemania con garantía, historial certificado y entrega llave en mano en España."
        canonical="https://www.premiumgermancars.com/importacion-coches-alemania"
      />

      <Navbar />

      <main className="bg-metallic-950 text-white pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-4xl text-gray-300 leading-relaxed space-y-10">
          <h1 className="text-4xl font-serif font-bold text-white">
            Importación de coches premium desde Alemania
          </h1>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-3">
              Servicio llave en mano
            </h2>
            <p>
              Nos encargamos de todo el proceso de importación de tu vehículo
              desde Alemania a España: búsqueda, verificación, compra,
              transporte, homologación, matriculación y entrega final.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-3">
              Vehículos verificados
            </h2>
            <p>
              Todos los coches pasan por un exhaustivo proceso de comprobación
              de historial, kilometraje y estado mecánico antes de su compra.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-3">
              Transparencia y garantía
            </h2>
            <p>
              Ofrecemos total transparencia en cada fase del proceso y garantía
              en los vehículos importados.
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
