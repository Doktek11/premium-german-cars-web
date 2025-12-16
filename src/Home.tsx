import React, { useEffect, lazy, Suspense } from "react";
import { useLocation, Link } from "react-router-dom";

import { cars } from "./data/cars";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WhatsAppButton } from "./components/WhatsAppButton";

/* Lazy (solo contenido secundario) */
const About = lazy(() => import("./components/About"));
const Features = lazy(() =>
  import("./components/Features").then((m) => ({ default: m.Features }))
);
const Guarantee = lazy(() =>
  import("./components/Features").then((m) => ({ default: m.Guarantee }))
);
const ImportForm = lazy(() => import("./components/ImportForm"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Footer = lazy(() => import("./components/Footer"));
const SeoContent = lazy(() => import("./components/SeoContent"));

/* Fallback seguro (NO null) */
const LazyFallback = () => (
  <div className="w-full h-8 bg-transparent" aria-hidden="true" />
);

export function Home() {
  const location = useLocation();

  /* Scroll desde otras rutas */
  useEffect(() => {
    const id = location.state?.scrollTo;
    if (id) {
      const el = document.querySelector(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />

      <main>
        {/* HERO – NO lazy */}
        <section id="home">
          <Hero />
        </section>

        {/* TODO el contenido diferido en UN solo Suspense */}
        <Suspense fallback={<LazyFallback />}>
          {/* ABOUT */}
          <section id="process">
            <About />
          </section>

          {/* FEATURES */}
          <Features />

          {/* IMPORT FORM */}
          <section id="import">
            <ImportForm />
          </section>

          {/* STOCK – NO lazy */}
          <section id="stock" className="py-32 bg-metallic-950">
            <div className="container mx-auto px-6">
              <span className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-4 block">
                Showroom
              </span>

              <h2 className="text-4xl md:text-5xl font-serif text-white mb-20">
                Stock Seleccionado
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {cars.map((car) => (
                  <Link
                    key={car.id}
                    to={`/car/${car.slug}`}
                    className="premium-card group bg-metallic-900 overflow-hidden flex flex-col h-full"
                  >
                    <div className="h-64 overflow-hidden relative">
                      <div
                        className={`absolute top-0 right-0 z-10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest ${
                          car.status === "Disponible"
                            ? "bg-white text-black"
                            : "bg-metallic-900/90 text-gray-400 border-l border-b border-white/10"
                        }`}
                      >
                        {car.status}
                      </div>

                      <img
                        src={car.image}
                        alt={`${car.make} ${car.model}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="256"
                      />
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-xl font-serif font-bold text-white mb-2">
                        {car.make}
                        <br />
                        <span className="text-gray-400 font-sans font-light">
                          {car.model}
                        </span>
                      </h3>

                      <p className="text-gold-400 font-serif text-xl mb-6">
                        {car.price.toLocaleString("de-DE")} €
                      </p>

                      <span className="mt-auto inline-block px-6 py-3 border border-gold-400 text-gold-400 text-xs font-bold uppercase tracking-widest hover:bg-gold-400 hover:text-black transition-all duration-300">
                        Más información
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* GARANTÍAS */}
          <section id="guarantee">
            <Guarantee />
          </section>

          {/* TESTIMONIOS */}
          <section id="testimonials">
            <Testimonials />
          </section>

          {/* CONTACTO */}
          <section id="contact">
            <Footer />
          </section>

          {/* SEO OCULTO */}
          <section className="sr-only">
            <SeoContent />
          </section>
        </Suspense>
      </main>

      {/* WhatsApp SIEMPRE visible */}
      <WhatsAppButton />
    </>
  );
}

