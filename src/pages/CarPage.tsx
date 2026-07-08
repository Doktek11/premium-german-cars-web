import { useEffect, useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { cars } from "../data/cars";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { SEO } from "../components/SEO";
import { SeoIntentLinks, seoIntentLinks } from "../components/SeoIntentLinks";
import { getLeadContext } from "../lib/leadAttribution";
import { trackLeadEvent } from "../lib/analytics";
import {
  getCarPageJsonLd,
  getCarPageMetadata,
} from "../data/carPageSchemas.mjs";
import { getResponsiveImageProps } from "../lib/responsiveImages";

export const CarPage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const location = useLocation();

  const car = cars.find((c) => c.slug === slug);
  const leadContext = useMemo(
    () =>
      getLeadContext(
        location.pathname,
        location.search,
        typeof document !== "undefined" ? document.title : ""
      ),
    [location.pathname, location.search]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Evita pantalla en blanco si el slug no existe
  if (!car) {
    return (
      <>
        <SEO
          title="Vehículo no encontrado | Premium German Cars"
          description="El vehículo que buscas no está disponible o no existe."
          noIndex={true}
        />
        <Navbar />
        <main className="bg-black text-white pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 md:pb-32 min-h-[60vh]">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Vehículo no encontrado
            </h1>
            <p className="text-gray-400 mb-10">
              El enlace puede estar desactualizado o el coche ya no está disponible.
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-4 bg-gold-400 text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-300 min-h-[48px] touch-manipulation"
            >
              Volver al inicio
            </Link>
          </div>
        </main>
        <Footer />
        <WhatsAppButton />
      </>
    );
  }

  const pageMetadata = getCarPageMetadata(car.slug);
  const isBmwSerie116i = car.slug === "bmw-serie-1-116i";
  const title = pageMetadata.title;
  const description = pageMetadata.seoDescription;
  const carUrl = pageMetadata.url;
  const carJsonLd = getCarPageJsonLd(car.slug);

  // Si no hay galería, usa al menos la imagen principal
  const gallery = car.gallery?.length ? car.gallery : [car.image];

  // FUNCIÓN DE CONTACTO DIRECTO POR WHATSAPP
  const handleWhatsAppContact = (tipo: "pedido" | "dossier") => {
    const telefono = "34603743608";
    const mensaje =
      tipo === "pedido"
        ? `Hola! Estoy interesado en iniciar el pedido de este ${car.make} ${car.model} (${car.price.toLocaleString(
            "de-DE"
          )}€) que he visto en la web de Premium German Cars.`
        : `Hola! Me gustaría recibir el dossier completo del ${car.make} ${car.model} de ${car.price.toLocaleString(
            "de-DE"
          )}€ que tenéis disponible.`;

    trackLeadEvent("lead_followup_click", {
      leadType: "vehiculo-stock",
      channel: "whatsapp",
      pagePath: location.pathname,
      cta: tipo === "pedido" ? "car_page_pedido" : "car_page_dossier",
      carSlug: car.slug,
      carMake: car.make,
      carModel: car.model,
      carPrice: car.price,
      context: leadContext,
    });

    window.open(
      `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`,
      "_blank"
    );
  };

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={carUrl}
        jsonLd={carJsonLd}
      />

      <Navbar />

      <main className="bg-black text-white pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 md:pb-32">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* CABECERA */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">
              {car.make} <span className="text-gold-400">{car.model}</span>
            </h1>
            <p className="text-gold-400 text-2xl sm:text-3xl font-serif">
              {car.price.toLocaleString("de-DE")} €
            </p>
          </div>

          {/* CTA RÁPIDO */}
          <div className="mb-12">
            <button
              onClick={() => handleWhatsAppContact("pedido")}
              className="inline-block px-8 py-4 bg-gold-400 text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-300 shadow-lg shadow-gold-400/10 min-h-[48px] touch-manipulation"
            >
              Comenzar pedido
            </button>
          </div>

          {/* GALERÍA OPTIMIZADA WEBP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-16">
            {gallery.map((img: string, index: number) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-metallic-900 border border-white/5"
              >
                <img
                  {...getResponsiveImageProps(
                    img,
                    "(min-width: 768px) 50vw, 100vw"
                  )}
                  alt={`${car.make} ${car.model} imagen ${index + 1}`}
                  className="w-full h-[360px] object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>

          {/* INFO TÉCNICA Y DESCRIPCIÓN */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-serif font-bold mb-6 border-b border-gold-400/20 pb-4">
                Descripción del vehículo
              </h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                {car.description}
              </p>
            </div>

            <div className="bg-metallic-900 p-6 sm:p-8 rounded-lg border border-white/10 h-fit">
              <h3 className="text-gold-400 font-bold uppercase tracking-tighter mb-6">
                Especificaciones
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400 text-sm uppercase">Año</span>
                  <span className="font-semibold">{car.year}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400 text-sm uppercase">
                    Kilómetros
                  </span>
                  <span className="font-semibold">
                    {car.km.toLocaleString("de-DE")} km
                  </span>
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
                className="w-full mt-10 py-4 border border-gold-400 text-gold-400 font-bold uppercase tracking-widest text-xs hover:bg-gold-400 hover:text-black transition-all min-h-[48px] touch-manipulation"
              >
                Solicitar Dossier
              </button>
            </div>
          </div>

          {isBmwSerie116i ? (
            <section className="mt-16 border border-gold-400/20 bg-gold-400/5 p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
                ¿Buscas un BMW Serie 1 similar en Alemania?
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Podemos localizar una unidad equivalente con historial oficial, kilometraje coherente, coste fiscal calculado y entrega llave en mano en España.
              </p>
              <button
                onClick={() => handleWhatsAppContact("pedido")}
                className="inline-flex items-center justify-center bg-gold-400 text-black px-6 py-4 text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-white transition-colors min-h-[48px]"
              >
                Buscar BMW Serie 1 similar
              </button>
            </section>
          ) : null}

          <SeoIntentLinks
            title="Calcula y compara antes de reservar"
            intro="Si esta unidad no encaja al cien por cien, revisa coste, fiscalidad y riesgos antes de buscar una alternativa en Alemania."
            links={seoIntentLinks.car}
          />
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};
