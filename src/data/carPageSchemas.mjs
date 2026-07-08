import {
  createBreadcrumbSchema,
  createCarProductGraph,
  createGraph,
  createWebPageSchema,
  SITE_URL,
} from "../lib/structuredData.mjs";

const absoluteImage = (path) =>
  path.startsWith("http") ? path : `${SITE_URL}${path}`;

export const CAR_PAGE_METADATA = [
  {
    slug: "bmw-serie-1-116i",
    make: "BMW",
    model: "Serie 1 116i",
    year: 2023,
    price: 26500,
    km: 31500,
    engine: "1.5 Turbo 109cv",
    status: "Disponible",
    image: "/bmwconcesionario.webp",
    gallery: [
      "/bmwconcesionario.webp",
      "/bmwconcesionario2.webp",
      "/cockpit.webp",
      "/interior.webp",
      "/interiordos.webp",
    ],
    title: "BMW Serie 1 116i importado de Alemania | Premium German Cars",
    seoDescription:
      "BMW Serie 1 116i importado de Alemania con historial verificado, kilómetros certificados y opción de buscar unidades similares de reestreno.",
    productDescription:
      "BMW Serie 1 116i de importación alemana, año 2023, con 31.500 km, motor 1.5 Turbo de 109 CV e historial de mantenimiento completo.",
  },
  {
    slug: "audi-rs6-avant",
    make: "Audi",
    model: "RS6 Avant",
    year: 2022,
    price: 115000,
    km: 44500,
    engine: "4.0 V8 TFSI",
    status: "Vendido",
    image: "/rs6dos.webp",
    gallery: ["/rs6.webp", "/rs6dos.webp", "/rs6tres.webp"],
    title: "Audi RS6 Avant en venta | Importado desde Alemania",
    seoDescription:
      "Compra Audi RS6 Avant importado desde Alemania. Kilómetros certificados, historial verificado y entrega llave en mano en España.",
    productDescription:
      "Audi RS6 Avant de 2022 con 44.500 km y motor 4.0 V8 TFSI, con frenos cerámicos y paquete dinámico RS.",
  },
  {
    slug: "mercedes-benz-c63-amg",
    make: "Mercedes-Benz",
    model: "C63 AMG",
    year: 2021,
    price: 72000,
    km: 38200,
    engine: "4.0 V8 Biturbo",
    status: "Vendido",
    image: "/mercedes1.webp",
    gallery: ["/mercedes1.webp", "/mercedes2.webp", "/mercedes3.webp"],
    title: "Mercedes-Benz C63 AMG en venta | Importado desde Alemania",
    seoDescription:
      "Compra Mercedes-Benz C63 AMG importado desde Alemania. Kilómetros certificados, historial verificado y entrega llave en mano en España.",
    productDescription:
      "Mercedes-AMG C63 de 2021 con 38.200 km y motor 4.0 V8 Biturbo hecho a mano.",
  },
  {
    slug: "audi-a3-sportback-35-tfsi",
    make: "Audi",
    model: "A3 Sportback 35 TFSI",
    year: 2021,
    price: 25500,
    km: 42000,
    engine: "1.5 TFSI 150cv",
    status: "Vendido",
    image: "/audi1.webp",
    gallery: ["/audi1.webp", "/audi2.webp", "/audi3.webp", "/audi4.webp"],
    title: "Audi A3 Sportback 35 TFSI en venta | Importado desde Alemania",
    seoDescription:
      "Compra Audi A3 Sportback 35 TFSI importado desde Alemania. Kilómetros certificados, historial verificado y entrega llave en mano en España.",
    productDescription:
      "Audi A3 Sportback 35 TFSI de 2021 con 42.000 km y motor de gasolina 1.5 TFSI de 150 CV.",
  },
].map((car) => ({
  ...car,
  path: `/car/${car.slug}`,
  url: `${SITE_URL}/car/${car.slug}`,
}));

export const getCarPageMetadata = (slug) => {
  const car = CAR_PAGE_METADATA.find((candidate) => candidate.slug === slug);

  if (!car) {
    throw new Error(`Missing car structured-data metadata for: ${slug}`);
  }

  return car;
};

export const getCarPageJsonLd = (slug) => {
  const car = getCarPageMetadata(slug);

  if (car.status !== "Disponible") {
    return createGraph([
      createWebPageSchema({
        url: car.url,
        name: car.title,
        description: car.seoDescription,
        breadcrumbId: `${car.url}#breadcrumb`,
      }),
      createBreadcrumbSchema({
        url: car.url,
        items: [
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: `${car.make} ${car.model}`, url: car.url },
        ],
      }),
    ]);
  }

  return createCarProductGraph({
    url: car.url,
    title: car.title,
    description: car.seoDescription,
    productDescription: car.productDescription,
    name: `${car.make} ${car.model}`,
    image: car.gallery.map(absoluteImage),
    brand: car.make,
    model: car.model,
    year: car.year,
    mileage: car.km,
    engine: car.engine,
    price: car.price,
    availability: car.status === "Vendido"
      ? "https://schema.org/SoldOut"
      : "https://schema.org/InStock",
  });
};
