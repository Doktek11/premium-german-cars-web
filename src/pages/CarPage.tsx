import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cars } from "../data/cars";

export const CarPage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // 👉 Scroll al inicio al cargar la página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Buscamos el coche cuyo slug coincide con la URL
  const car = cars.find((c) => {
    const generatedSlug = `${c.make}-${c.model}`
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    return generatedSlug === slug;
  });

  // Si no existe el coche
  if (!car) {
    return (
      <div className="text-center text-white py-40">
        <h1 className="text-4xl font-bold mb-6">Vehículo no encontrado</h1>

        <button
          onClick={() => navigate("/")}
          className="text-gold-400 underline text-lg hover:text-gold-300"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="bg-metallic-950 text-white min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Botón volver fiable */}
        <button
          onClick={() => {
            if (window.history.length > 1) navigate(-1);
            else navigate("/");
          }}
          className="text-gold-400 underline hover:text-gold-300 text-sm"
        >
          ← Volver
        </button>

        {/* Título */}
        <h1 className="text-4xl font-serif font-bold mt-6 mb-4">
          {car.make} {car.model}
        </h1>

        {/* Datos principales */}
        <div className="text-gray-400 mb-10">
          Año {car.year} • {car.km.toLocaleString()} km • {car.engine}
        </div>

        {/* Galería de imágenes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {car.gallery.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${car.make} ${car.model}`}
              className="w-full h-80 object-cover rounded-lg"
              loading="lazy"
            />
          ))}
        </div>

        {/* Descripción */}
        <p className="text-lg leading-relaxed text-gray-300 whitespace-pre-line">
          {car.description}
        </p>

        {/* Precio */}
        <div className="mt-10 text-3xl font-serif text-gold-400">
          {car.price.toLocaleString("de-DE")} €
        </div>
      </div>
    </div>
  );
};

