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

  // 🔒 Seguridad
  if (!car) return null;

  // ✅ RESET SCROLL (SOLUCIÓN PROBLEMA 2)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const title = `${car.make} ${car.model} en venta | Importado desde Alemania`;
  const description = `Compra ${car.make} ${car.model} importado desde Alemania. Kilómetros certificados, historial verificado y entrega en España.`;

  // 📸 GALERÍA DE IMÁGENES
  const images = car.images ?? [car.image];

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

          {/* TÍTULO */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            {car.make} {car.model}
          </h1>

          {/* PRECIO */}
          <p className="text-gold-400 text-2xl font-serif mb-10">
            {car.price.toLocaleString("de-DE")} €
          </p>

          {/* GALERÍA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {images.map((img, index) => (
              <div key={index} className="overflow-hidden rounded-lg">
                <img
                  src={img}
                  alt={`${car.make} ${car.model} imagen ${index + 1}`}
                  className="w-full h-72 object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="/#import"
              className="inline-block px-10 py-5 bg-gold-400 text-black font-bold uppercase tracking-widest text-sm hover:bg-gold-500 transition-all duration-300"
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
