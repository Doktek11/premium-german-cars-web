import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cars } from "../data/cars";
import {
  X,
  Calendar,
  Gauge,
  Fuel,
  Check,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail
} from "lucide-react";

export const CarDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const car = cars.find(c => c.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Vehículo no encontrado
      </div>
    );
  }

  const allImages = useMemo(() => {
    const images = [car.image, ...(car.gallery || [])];
    return Array.from(new Set(images));
  }, [car]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-y-auto min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-metallic-950/90 backdrop-blur border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <span className="text-lg font-serif font-bold text-white">
          PREMIUM<span className="text-gold-400"> GERMAN CARS</span>
        </span>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm uppercase tracking-widest text-gray-400 hover:text-white"
        >
          Cerrar <X size={18} />
        </button>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Title */}
        <h1 className="text-3xl md:text-6xl font-serif font-bold text-white mb-4">
          {car.make} {car.model}
        </h1>

        <p className="text-gold-400 text-3xl font-serif mb-12">
          {car.price.toLocaleString("de-DE")} €
        </p>

        {/* Images */}
        <div className="relative mb-16">
          <img
            src={allImages[currentImageIndex]}
            alt={`${car.make} ${car.model}`}
            className="w-full h-[60vh] object-contain bg-black rounded-lg"
            loading="eager"
          />

          {allImages.length > 1 && (
            <>
              <button
                onClick={() =>
                  setCurrentImageIndex(
                    currentImageIndex === 0
                      ? allImages.length - 1
                      : currentImageIndex - 1
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={() =>
                  setCurrentImageIndex(
                    (currentImageIndex + 1) % allImages.length
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>

        {/* Description */}
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-gold-400 pl-4">
            Descripción del Vehículo
          </h2>

          <div className="text-gray-300 leading-relaxed whitespace-pre-line mb-12">
            {car.description || "Descripción no disponible"}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Kilometraje certificado",
              "Historial verificado",
              "Importación directa desde Alemania",
              "Entrega llave en mano",
              "Unidad muy cuidada",
              "Garantía incluida"
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/5 p-3 rounded"
              >
                <Check className="text-gold-400" />
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex gap-4">
          <a
            href={`mailto:info@premiumgermancars.com?subject=Interés en ${car.make} ${car.model}`}
            className="px-8 py-4 bg-gold-500 text-black font-bold uppercase tracking-widest flex items-center gap-2 rounded"
          >
            <Mail size={18} /> Solicitar info
          </a>

          <a
            href="tel:+34603743608"
            className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest flex items-center gap-2 rounded"
          >
            <Phone size={18} /> Llamar
          </a>
        </div>
      </div>
    </div>
  );
};
