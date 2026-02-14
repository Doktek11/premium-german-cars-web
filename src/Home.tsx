import { Suspense, lazy, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { cars } from "./data/cars";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Guarantee } from "./components/Features";
import { WhatsAppButton } from "./components/WhatsAppButton";

// Below-the-fold: diferidos
const Features = lazy(() =>
  import("./components/Features").then((m) => ({ default: m.Features }))
);
const ImportForm = lazy(() =>
  import("./components/ImportForm").then((m) => ({ default: m.ImportForm }))
);
const Testimonials = lazy(() =>
  import("./components/Testimonials").then((m) => ({ default: m.Testimonials }))
);
const Footer = lazy(() =>
  import("./components/Footer").then((m) => ({ default: m.Footer }))
);
const SeoContent = lazy(() =>
  import("./components/SeoContent").then((m) => ({ default: m.SeoContent }))
);

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
      <Navbar />

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="process">
          <About />
        </section>

        <Suspense fallback={<SectionLoader />}>
          <Features />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ImportForm />
        </Suspense>

        {/* STOCK CON COLOR SUAVIZADO */}
        <section id="stock" className="py-32 bg-metallic-900">
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
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
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

        <section id="guarantee">
          <Guarantee />
        </section>

        <section id="testimonials">
          <Suspense fallback={<SectionLoader />}>
            <Testimonials />
          </Suspense>
        </section>

        <section id="contact">
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
