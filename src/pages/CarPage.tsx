import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cars } from "../data/cars";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { SEO } from "../components/SEO";

export default function CarPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const car = cars.find((c) => c.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ NUNCA devolver null en páginas
  if (!car) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#050505",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
        }}
      >
        Vehículo no encontrado
      </div>
    );
  }

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

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://www.premiumgermancars.com/car/${car.slug}#product`,
    name: `${car.make} ${car.model}`,
    description: car.description,
    image: car.gallery?.length ? car.gallery : [car.image],
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://www.premiumgermancars.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Stock",
        item: "https://www.premiumgermancars.com/#stock",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${car.make} ${car.model}`,
        item: `https://www.premiumgermancars.com/car/${car.slug}`,
      },
    ],
  };

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={`https://www.premiumgermancars.com/car/${car.slug}`}
        schema={[productSchema, breadcrumbSchema]}
      />

      <Navbar />

      <main className="bg-metallic-950 text-white pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            {car.make} {car.model}
          </h1>

          <div className="mb-8">
            <button
              onClick={goToImportForm}
              className="inline-block px-8 py-4 bg-gold-400 text-black font-bold uppercase tracking-widest text-xs hover:bg-gold-500 transition-all"
            >
              Comenzar pedido
            </button>
          </div>

          <p className="text-gold-400 text-2xl font-serif mb-10">
            {car.price.toLocaleString("de-DE")} €
          </p>

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

          <Footer />
          <WhatsAppButton />
        </div>
      </main>
    </>
  );
}
