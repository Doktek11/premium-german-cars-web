import { Suspense, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { cars } from "./data/cars";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SEO } from "./components/SEO";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { lazyNamed } from "./lib/lazyNamed";

// Below-the-fold: diferidos
const About = lazyNamed(() => import("./components/About"), "About");
const Features = lazyNamed(() => import("./components/Features"), "Features");
const Guarantee = lazyNamed(() => import("./components/Guarantee"), "Guarantee");
const ImportForm = lazyNamed(() => import("./components/ImportForm"), "ImportForm");
const Testimonials = lazyNamed(() => import("./components/Testimonials"), "Testimonials");
const Footer = lazyNamed(() => import("./components/Footer"), "Footer");
const SeoContent = lazyNamed(() => import("./components/SeoContent"), "SeoContent");

function SectionLoader() {
  return (
    <div className="py-12 text-center text-xs uppercase tracking-[0.2em] text-gray-500">
      Cargando sección...
    </div>
  );
}

export function Home() {
  const location = useLocation();

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
    <div className="bg-black">
      <SEO
        title="Premium German Cars | Importación de Coches Premium desde Alemania"
        description="Importación de coches premium desde Alemania con vehículos certificados, gestión integral y entrega llave en mano en España."
        canonical="https://www.premiumgermancars.com/"
      />

      <Navbar />

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="process" className="content-auto">
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
        </section>

        <section className="content-auto">
          <Suspense fallback={<SectionLoader />}>
            <Features />
          </Suspense>
        </section>

        <section className="content-auto">
          <Suspense fallback={<SectionLoader />}>
            <ImportForm />
          </Suspense>
        </section>

        {/* STOCK CON COLOR SUAVIZADO */}
        <section id="stock" className="py-16 sm:py-24 md:py-32 bg-metallic-900 content-auto">
          <div className="container mx-auto px-4 sm:px-6">
            <span className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-4 block">
              Showroom
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-12 sm:mb-16 md:mb-20">
              Stock Seleccionado
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              {cars.map((car) => (
                <Link
                  key={car.id}
                  to={`/car/${car.slug}`}
                  className="premium-card group bg-metallic-950 border border-white/5 overflow-hidden flex flex-col h-full hover:border-gold-400/30 transition-all duration-500"
                >
                  <div className="h-64 overflow-hidden relative">
                    <div
                      className={`absolute top-0 right-0 z-10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest ${
                        car.status === "Disponible" ? "bg-white text-black" : "bg-black/80 text-gray-400"
                      }`}
                    >
                      {car.status}
                    </div>

                    <img
                      src={car.image}
                      alt={`${car.make} ${car.model}`}
                      width="800"
                      height="600"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="p-6 sm:p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-serif font-bold text-white mb-2">
                      {car.make} <br />
                      <span className="text-gray-400 font-sans font-light">{car.model}</span>
                    </h3>

                    <p className="text-gold-400 font-serif text-xl mb-6">
                      {car.price.toLocaleString("de-DE")} €
                    </p>

                    <span className="mt-auto inline-block px-6 py-3 border border-gold-400/50 text-gold-400 text-xs font-bold uppercase tracking-widest group-hover:bg-gold-400 group-hover:text-black transition-all duration-300 text-center">
                      Más información
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="guarantee" className="content-auto">
          <Suspense fallback={<SectionLoader />}>
            <Guarantee />
          </Suspense>
        </section>

        <section id="testimonials" className="content-auto">
          <Suspense fallback={<SectionLoader />}>
            <Testimonials />
          </Suspense>
        </section>

        <section id="contact" className="content-auto">
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
        </section>

        <section className="sr-only">
          <Suspense fallback={null}>
            <SeoContent />
          </Suspense>
        </section>
      </main>

      <WhatsAppButton />
    </div>
  );
}
