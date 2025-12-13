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
  if (!car) return null;

  const title = `${car.make} ${car.model} en venta | Importado desde Alemania`;
  const description = `Compra ${car.make} ${car.model} importado desde Alemania. Kilómetros certificados, historial verificado y entrega llave en mano en España.`;

  const handleOrderClick = () => {
    navigate("/", { state: { scrollTo: "#import" } });
  };

  return (
    <>
      {/* SEO INVISIBLE */}
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

          {/* IMAGEN */}
          <div className="mb-12">
            <img
              src={car.image}
              alt={`${car.make} ${car.model} importado desde Alemania`}
              className="w-full rounded-xl shadow-lg"
              loading="eager"
            />
          </div>

          {/* BLOQUE INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* TEXTO */}
            <div className="text-gray-300 leading-relaxed space-y-6">
              <p>
                Este <strong>{car.make} {car.model}</strong> ha sido seleccionado
                en el mercado alemán, con historial verificado y kilometraje
                certificado.
              </p>

              <p>
                Gestionamos todo el proceso de importación: verificación técnica,
                transporte, homologación, matriculación y entrega final en
                España.
              </p>

              <p>
                Un servicio pensado para quienes buscan un coche premium con
                total tranquilidad y transparencia.
              </p>
            </div>

            {/* CTA */}
            <div className="bg-metallic-900 p-10 rounded-xl border border-white/10 text-center">
              <p className="text-xl font-serif mb-6">
                ¿Te interesa este vehículo?
              </p>

              <button
                onClick={handleOrderClick}
                className="w-full px-8 py-5 bg-gold-400 text-black font-bold uppercase tracking-widest text-sm hover:bg-gold-500 transition-all duration-300"
              >
                Confirmar pedido
              </button>

              <p className="text-xs text-gray-400 mt-4">
                Importación personalizada · Sin compromiso
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

