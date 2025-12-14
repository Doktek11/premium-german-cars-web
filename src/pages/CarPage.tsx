import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cars } from "../data/cars";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { SEO } from "../components/SEO";

export const CarPage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const car = cars.find((c) => c.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!car) return null;

  const title = `${car.make} ${car.model} en venta | Importado desde Alemania`;
  const description = `Compra ${car.make} ${car.model} importado desde Alemania. Kilómetros certificados, historial verificado y entrega llave en mano en España.`;

  const availability =
    car.status === "Disponible"
      ? "https://schema.org/InStock"
      : car.status === "Reservado"
      ? "https://schema.org/PreOrder"
      : "https://schema.org/OutOfStock";

  const goToImportForm = () => {
    navigate("/", { state: { scrollTo: "#import" } });
  };

  /* ✅ SCHEMA PRODUCT */
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://www.premiumgermancars.com/car/${car.slug}#product`,
    name: `${car.make} ${car.model}`,
    description: car.description,
    image:
      car.gallery && car.gallery.length > 0
        ? car.gallery
        : [car.image],
    brand: {
      "@type": "Brand",
      name: car.make,
    },
    offers: {
      "@type": "Offer",
      url: `https://www.premiumgermancars.com/car/${car.slug}`,
      priceCurrency: "EUR",
      price: car.price,
      availability,
      itemCondition: "https://schema.org/UsedCondition",
      seller: {
        "@type": "AutoDealer",
        name: "Premium German Cars",
        url: "https://www.premiumgermancars.com",
      },
    },
  };

  return (
    <>
      {/* SEO + SCHEMA */}
      <SEO
        title={title}
        description={description}
        canonical={`https://www.premiumgermancars.com/car/${car.slug}`}
        schema={productSchema}
      />

      <Navbar />

      <main className="bg-metallic-950 text-white pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* H1 */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            {car.make} {car.model}
          </h1>

          {/* CTA BAJO H1 */}
          <div className="mb-8">
            <button
              onClick={goToImportForm}
              className="inline-block px-8 py-4 bg-gold-400 text-black font-bold uppercase tracking-widest text-xs hover:bg-gold-500 transition-all duration-300"
            >
              Comenzar pedido
            </button>
          </div>

          {/* PRECIO */}
          <p className="text-gold-400 text-2xl font-serif mb-10">
            {car.price.toLocaleString("de-DE")} €
          </p>

          {/* GALERÍA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {car.gallery?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${car.make} ${car.model} imagen ${index + 1}`}
                className="w-full h-[360px] object-cover rounded-lg"
                loading="lazy"
              />
            ))}
          </div>

          {/* DESCRIPCIÓN */}
          <div className="max-w-3xl mb-16">
            <h2 className="text-2xl font-serif font-bold mb-6">
              Descripción del vehículo
            </h2>

            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {car.description}
            </p>
          </div>

          {/* DATOS CLAVE */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            <div>
              <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
                Año
              </span>
              <span className="font-semibold">{car.year}</span>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
                Kilómetros
              </span>
              <span className="font-semibold">
                {car.km.toLocaleString("de-DE")} km
              </span>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
                Motor
              </span>
              <span className="font-semibold">{car.engine}</span>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
                Estado
              </span>
              <span className="font-semibold">{car.status}</span>
            </div>
          </div>

          {/* CTA FINAL */}
          <div className="text-center">
            <button
              onClick={goToImportForm}
              className="inline-block px-12 py-5 bg-gold-400 text-black font-bold uppercase tracking-widest text-sm hover:bg-gold-500 transition-all duration-300"
            >
              Pedir información ahora
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};
