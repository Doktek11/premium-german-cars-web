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

  const title = `${car.make} ${car.model} en venta | Importado desde Alemania`;
  const description = `Compra ${car.make} ${car.model} importado desde Alemania. Kilómetros certificados, historial verificado y entrega en España.`;

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={`https://www.premiumgermancars.com/car/${car.slug}`}
      />

      <Navbar />

      <main className="bg-metallic-950 text-white pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-5xl">
          <h1 className="text-4xl font-serif font-bold mb-6">
            {car.make} {car.model}
          </h1>

          <p className="text-gold-400 text-xl mb-8">
            {car.price.toLocaleString("de-DE")} €
          </p>

          <img
            src={car.image}
            alt={`${car.make} ${car.model}`}
            className="w-full rounded-lg mb-10"
          />
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};
