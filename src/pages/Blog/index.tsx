import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { WhatsAppButton } from "../../components/WhatsAppButton";
import { SEO } from "../../components/SEO";
import { Link } from "react-router-dom";

export default function BlogIndex() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Blog sobre importación de coches desde Alemania | Premium German Cars"
        description="Guías, consejos y análisis expertos sobre la importación de coches premium desde Alemania: BMW, Audi, Mercedes y más."
        canonical="https://www.premiumgermancars.com/blog"
      />

      <Navbar />

      <main className="bg-black text-white min-h-screen pt-40 pb-24 px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* HERO */}
          <header className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold">
              Blog sobre importación de coches desde Alemania
            </h1>

            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Guías prácticas, consejos profesionales y análisis reales para
              importar coches premium desde Alemania con seguridad, criterio y
              sin sorpresas.
            </p>
          </header>

          {/* LISTADO POSTS (placeholder por ahora) */}
          <section className="grid md:grid-cols-2 gap-12">
            {/* POST CARD */}
            <article className="border border-white/10 p-8 hover:border-gold-400 transition">
              <h2 className="text-2xl font-serif font-bold mb-4">
                Guía para comprar un BMW de reestreno en 2026
              </h2>

              <p className="text-gray-400 mb-6 leading-relaxed">
                Todo lo que debes tener en cuenta al importar un BMW de ocasión
                premium desde Alemania: procedencia, tecnología, garantía y
                errores habituales que debes evitar.
              </p>

              <Link
                to="/blog/guia-comprar-bmw-reestreno-2026"
                className="inline-block text-gold-400 font-semibold hover:underline"
              >
                Leer artículo →
              </Link>
            </article>

            {/* FUTUROS POSTS */}
            <article className="border border-white/10 p-8 opacity-50">
              <h2 className="text-2xl font-serif font-bold mb-4">
                Próximamente nuevos artículos
              </h2>

              <p className="text-gray-400 leading-relaxed">
                Estamos preparando nuevas guías sobre importación de vehículos
                premium, fiscalidad, garantías y selección de unidades en
                Alemania.
              </p>
            </article>
          </section>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
