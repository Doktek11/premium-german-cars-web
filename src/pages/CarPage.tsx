import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { cars } from "../data/cars";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { SEO } from "../components/SEO";

export const CarPage = () => {
  const { slug } = useParams();
  const car = cars.find((c) => c.slug === slug);

  if (!car) return null;

  // ✅ Evita que cargue abajo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const title = `${car.make} ${car.model} en venta | Importado desde Alemania`;
  const description = `Compra ${car.make} ${car.model} importado desde Alemania. ${car.engine}. Kilómetros certificados y entrega en España.`;

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={`https://www.premiumgermancars.com/car/${car.slug}`}
      />

      <Navbar />

      <main className="bg-metallic-950 text-white pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-6xl">

          {/* HEADER */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {car.make} {car.model}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <span>{car.year}</span>
              <span>•</span>
              <span>{car.km.toLocaleString("de-DE")} km</span>
              <span>•</span>
              <span>{car.engine}</span>
            </div>

            <p className="text-gold-400 text-3xl font-serif mt-6">
              {car.price.toLocaleString("de-DE")} €
            </p>
          </div>

          {/* GALERÍA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {car.gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${car.make} ${car.model} imagen ${index + 1}`}
                className="w-full h-[380px] object-cover rounded-lg"
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
          </div>

          {/* DESCRIPCIÓN */}
          <div className="max-w-3xl text-gray-300 text-lg leading-relaxed space-y-6 mb-24 whitespace-pre-line">
            {car.description}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="/#import"
              className="inline-block px-12 py-5 bg-gold-400 text-black font-bold uppercase tracking-widest text-sm hover:bg-gold-500 transition-all duration-300"
            >
              Confirmar pedido
            </a>
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};
