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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!car) return null;

  const title = `${car.make} ${car.model} en venta | Importado desde Alemania`;
  const description = `Compra ${car.make} ${car.model} importado desde Alemania. Kilómetros certificados, historial verificado y entrega llave en mano en España.`;

  // FUNCIÓN DE CONTACTO DIRECTO POR WHATSAPP
  const handleWhatsAppContact = (tipo: "pedido" | "dossier") => {
    const telefono = "34603743608";
    const mensaje = tipo === "pedido" 
      ? `Hola! Estoy interesado en iniciar el pedido de este ${car.make} ${car.model} (${car.price.toLocaleString("de-DE")}€) que he visto en la web de Premium German Cars.`
      : `Hola! Me gustaría recibir el dossier completo del ${car.make} ${car.model} de ${car.price.toLocaleString("de-DE")}€ que tenéis disponible.`;
    
    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, "_blank");
  };

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={`https://www.premiumgermancars.com/car/${car.slug}`}
      />

      <Navbar />

      <main className="bg-black text-white pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-6xl">

          {/* CABECERA */}
          <div className="mb-12">
             <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {car.make} <span className="text-gold-400">{car.model}</span>
            </h1>
            <p className="text-gold-400 text-3xl font-serif">
              {car.price.toLocaleString("de-DE")} €
            </p>
          </div>

          {/* CTA RÁPIDO */}
          <div className="mb-12">
            <button
              onClick={() => handleWhatsAppContact("pedido")}
              className="inline-block px-8 py-4 bg-gold-400 text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-300 shadow-lg shadow-gold-400/10"
            >
              Comenzar pedido
            </button>
          </div>

          {/* GALERÍA OPTIMIZADA WEBP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {car.gallery?.map((img, index) => (
              <div key={index} className="overflow-hidden rounded-lg bg-metallic-900 border border-white/5">
                <img
                  src={img}
                  alt={`${car.make} ${car.model} imagen ${index + 1}`}
                  className="w-full h-[360px] object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* INFO TÉCNICA Y DESCRIPCIÓN */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-serif font-bold mb-6 border-b border-gold-400/20 pb-4">
                  Descripción del vehículo
                </h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                  {car.description}
                </p>
            </div>

            <div className="bg-metallic-900 p-8 rounded-lg border border-white/10 h-fit">
              <h3 className="text-gold-400 font-bold uppercase tracking-tighter mb-6">Especificaciones</h3>
              <div className="space-y-6">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400 text-sm uppercase">Año</span>
                  <span className="font-semibold">{car.year}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400 text-sm uppercase">Kilómetros</span>
                  <span className="font-semibold">{car.km.toLocaleString("de-DE")} km</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400 text-sm uppercase">Motor</span>
                  <span className="font-semibold">{car.engine}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm uppercase">Estado</span>
                  <span className="text-gold-400 font-bold">{car.status}</span>
                </div>
              </div>
              
              <button
                onClick={() => handleWhatsAppContact("dossier")}
                className="w-full mt-10 py-4 border border-gold-400 text-gold-400 font-bold uppercase tracking-widest text-xs hover:bg-gold-400 hover:text-black transition-all"
              >
                Solicitar Dossier
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};
