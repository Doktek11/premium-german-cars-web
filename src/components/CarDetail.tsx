import React, { useState, useEffect, useMemo } from 'react';
import { Car } from '../types';
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
} from 'lucide-react';

interface CarDetailProps {
  car: Car;
  onClose: () => void;
}

export const CarDetail: React.FC<CarDetailProps> = ({ car, onClose }) => {
  // Combine main image and gallery, remove duplicates
  const allImages = useMemo(() => {
    const images = [car.image, ...(car.gallery || [])];
    return Array.from(new Set(images));
  }, [car]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-y-auto min-h-screen animate-fade-in">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-metallic-950/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center shadow-lg">
        <span className="text-lg md:text-xl font-serif font-bold text-white">
          PREMIUM<span className="text-gold-400"> GERMAN CARS</span>
        </span>

        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors group"
        >
          Cerrar
          <span className="bg-white/10 p-2 rounded-full group-hover:bg-gold-500 group-hover:text-black transition-all">
            <X size={20} />
          </span>
        </button>
      </div>

      <div className="container mx-auto px-6 py-8 md:py-12">
        {/* Header Info */}
        <div className="mb-8 md:mb-10 border-b border-white/10 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="inline-block py-1 px-3 rounded bg-white/5 text-gold-400 text-xs tracking-widest uppercase font-bold mb-3 border border-white/10">
                {car.status}
              </span>

              <h1 className="text-3xl md:text-6xl font-serif font-bold text-white mb-2 leading-tight">
                {car.make} {car.model}
              </h1>

              <p className="text-lg md:text-xl text-gray-400 flex items-center gap-2">
                <span>{car.year}</span>
                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                <span>{car.engine}</span>
              </p>
            </div>

            <div className="text-left md:text-right w-full md:w-auto">
              <p className="text-3xl md:text-5xl font-serif text-gold-400 mb-1">
                {car.price.toLocaleString('de-DE')} €
              </p>
              <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wide">
                Precio final matriculado
              </p>
            </div>
          </div>
        </div>

        {/* Image Carousel */}
        <div className="mb-12 md:mb-16 relative select-none">
          <div className="w-full h-[50vh] md:h-[70vh] bg-black rounded-lg overflow-hidden relative border border-white/5 shadow-2xl">
            <img
              src={allImages[currentImageIndex]}
              alt={`${car.make} ${car.model} vista ${currentImageIndex + 1}`}
              className="w-full h-full object-cover md:object-contain bg-black"
              width={1200}
              height={800}
              loading={currentImageIndex === 0 ? 'eager' : 'lazy'}
              fetchPriority={currentImageIndex === 0 ? 'high' : 'low'}
              decoding="async"
            />

            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="Anterior"
                  className="absolute top-1/2 left-4 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-gold-500 hover:text-black transition-all border border-white/10 z-10"
                >
                  <ChevronLeft size={32} />
                </button>

                <button
                  onClick={nextImage}
                  aria-label="Siguiente"
                  className="absolute top-1/2 right-4 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-gold-500 hover:text-black transition-all border border-white/10 z-10"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-widest border border-white/10">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="bg-metallic-900/50 p-6 md:p-8 rounded-lg border border-white/5">
              <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-gold-400 pl-4">
                Descripción del Vehículo
              </h3>

              <div className="prose prose-invert prose-lg text-gray-300 whitespace-pre-line mb-10">
                {car.description}
              </div>

              <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-gold-400 pl-4">
                Características Destacadas
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Garantía Oficial 12 Meses',
                  'Certificado de Kilometraje',
                  'Libro de Mantenimiento al día',
                  'Vehículo No Fumador',
                  'Revisión 200 puntos check',
                  'Entrega en domicilio disponible'
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-black/40 rounded border border-white/5"
                  >
                    <Check className="text-gold-400 w-5 h-5" />
                    <span className="text-sm text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-metallic-900 border border-white/10 p-6 md:p-8 rounded-lg sticky top-32 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">
                Resumen
              </h3>

              <div className="space-y-5 mb-8">
                <InfoRow icon={<Calendar />} label="Año" value={car.year} />
                <InfoRow
                  icon={<Gauge />}
                  label="Kilometraje"
                  value={`${car.km.toLocaleString()} km`}
                />
                <InfoRow icon={<Fuel />} label="Motor" value={car.engine} />
              </div>

              <div className="space-y-3">
                <a
                  href={`mailto:info@premiumgermancars.com?subject=Interés en ${car.make} ${car.model}`}
                  className="w-full py-4 bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded"
                >
                  <Mail size={18} /> Solicitar Info
                </a>

                <a
                  href="tel:+34603743608"
                  className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded"
                >
                  <Phone size={18} /> Llamar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center justify-between pb-4 border-b border-white/5">
    <div className="flex items-center gap-3 text-gray-300">
      {icon}
      <span>{label}</span>
    </div>
    <span className="font-bold text-white text-lg">{value}</span>
  </div>
);

