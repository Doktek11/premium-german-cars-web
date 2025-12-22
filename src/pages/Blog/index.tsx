import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { WhatsAppButton } from "../../components/WhatsAppButton";
import { SEO } from "../../components/SEO";

export default function BlogIndex() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Blog sobre importación de coches desde Alemania | Premium German Cars"
        description="Guías, consejos y análisis expertos sobre la importación de coches premium desde Alemania."
        canonical="https://www.premiumgermancars.com/blog"
      />

      <Navbar />

      <main className="bg-black text-white min-h-screen pt-40 pb-24 px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          <header className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold">
              Blog sobre importación de coches desde Alemania
            </h1>

            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Guías prácticas y consejos profesionales para importar coches
              premium desde Alemania con total seguridad.
            </p>
          </header>

          <section className="grid md:grid-cols-2 gap-12">
            <article className="border border-white/10 p-8 hover:border-gold-400 transition">
              <h2 className="text-2xl font-serif font-bold mb-4">
                Guía para comprar un BMW de reestreno en 2026
              </h2>

              <p className="text-gray-400 mb-6 leading-relaxed">
                Claves para elegir bien un BMW importado desde Alemania:
                procedencia, tecnología, garantía y errores a evitar.
              </p>

              <Link
                to="/blog/bmw-reestreno-alemania-2026"
                className="inline-block text-gold-400 font-semibold hover:underline"
              >
                Leer artículo →
              </Link>
            </article>
          </section>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
