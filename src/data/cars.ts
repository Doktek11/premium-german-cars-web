// src/data/cars.ts
import { Car } from "../types";

// Función que genera el slug correctamente
const slugify = (make: string, model: string) =>
  `${make}-${model}`
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

export const cars: Car[] = [
  {
    id: 1,
    make: "BMW",
    model: "Serie 1 116i",
    year: 2023,
    price: 27400,
    km: 31500,
    image: "/bmwconcesionario.png",
    engine: "1.5 Turbo 109cv",
    status: "Disponible",
    slug: slugify("BMW", "Serie 1 116i"),
    description: `Un compacto premium que sorprende desde el primer kilómetro...
BMW Serie 1 116i de importación alemana. Unidad en estado impecable,
con historial de mantenimiento completo y un equipamiento superior al habitual:
navegación profesional, sensores de aparcamiento, llantas deportivas y paquete LED.
Perfecto para quien busca un compacto premium eficiente y moderno.`,
    gallery: [
      "/bmwconcesionario.png",
      "/bmwconcesionario2.png",
      "/cockpit.jpg",
      "/interior.jpg",
      "/interiordos.jpg"
    ]
  },

  {
    id: 2,
    make: "Audi",
    model: "RS6 Avant",
    year: 2022,
    price: 115000,
    km: 44500,
    image: "/rs6dos.jpg",
    engine: "4.0 V8 TFSI",
    status: "Reservado",
    slug: slugify("Audi", "RS6 Avant"),
    description:
      "La combinación definitiva de rendimiento y practicidad. Este Audi RS6 Avant cuenta con todos los extras imaginables, incluyendo frenos cerámicos y paquete dinámico RS.",
    gallery: ["/rs6.jpg", "/rs6dos.jpg", "/rs6tres.jpg"]
  },

  {
    id: 3,
    make: "Mercedes-Benz",
    model: "C63 AMG",
    year: 2021,
    price: 72000,
    km: 38200,
    image: "/mercedes1.jpg",
    engine: "4.0 V8 Biturbo",
    status: "Vendido",
    slug: slugify("Mercedes-Benz", "C63 AMG"),
    description: `Máxima expresión del ADN AMG. Mercedes-AMG C63 con motor 4.0 V8 Biturbo hecho a mano,
sonido inconfundible y prestaciones que lo mantienen en la cima de su segmento.
Unidad en estado excelente, con mantenimiento completo y equipamiento AMG de alto nivel.
Deportividad, exclusividad y diseño en una sola pieza.`,
    gallery: ["/mercedes1.jpg", "/mercedes2.jpg", "/mercedes3.jpg"]
  },

  {
    id: 4,
    make: "Audi",
    model: "A3 Sportback 35 TFSI",
    year: 2021,
    price: 25500,
    km: 42000,
    image: "/audi1.jpg",
    engine: "1.5 TFSI 150cv",
    status: "Vendido",
    slug: slugify("Audi", "A3 Sportback 35 TFSI"),
    description: `Audi A3 Sportback 35 TFSI gasolina de 150 CV, eficiente y con un rendimiento equilibrado
para uso diario sin renunciar a confort y refinamiento. Motor de inyección directa,
consumo moderado y buena respuesta en carretera. Ideal para quienes buscan un compacto
premium con carácter, buena tecnología y economía de funcionamiento.`,
    gallery: ["/audi1.jpg", "/audi2.jpg", "/audi3.jpg", "/audi4.jpg"]
  }
];

