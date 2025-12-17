import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { SEO } from "../components/SEO";
import { FAQ } from "../components/FAQ";

export default function FaqPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Preguntas Frecuentes sobre Importar Coches de Alemania"
        description="Resolvemos todas las dudas sobre la importación de coches desde Alemania: precios, impuestos, plazos, IVA, garantías y proceso completo."
      />

      <Navbar />

      <main className="pt-32">
        <FAQ />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
