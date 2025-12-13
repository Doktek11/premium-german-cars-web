import React from "react";
import { cars } from "../data/cars";
import { ArrowUpRight } from "lucide-react";

export const Stock: React.FC = () => {

  // 👇 función que genera slug SEO automático
  const slugify = (car: { make: string; model: string }) =>
    `${car.make}-${car.model}`
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  return (
    <section id="stock" className="py-32 bg-metallic-950">
      <div className="container mx-auto px-6">

        {/* Título */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div>
            <span className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-4 block">
              Showroom
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">
              Stock Seleccionado
            </h2>
          </div>

          <a
            href="#"
            className="hidden md:flex items-center text-gray-400 uppercase tracking-widest text-xs font-bold hover:text-gold-400 transition-colors mt-4 md:mt-0 border-b border-transparent hover:border-gold-400 pb-1"
          >
            Ver inventario completo <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cars.map((car) => {
            const slug = slugify(car);

            return (
              <div
                key={car.id}
                className="premium-card group bg-metallic-900 overflow-hidden flex flex-col h-full cursor-pointer"
                onClick={() => (window.location.href = `/car/${slug}`)}
              >
                {/* Imagen */}
                <div className="h-64 overflow-hidden relative">

                  {/* Estado */}
                  <div
                    className={`absolute top-0 right-0 z-10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest ${
                      car.status === "Disponible"
                        ? "bg-white text-black"
                        : "bg-metallic-900/90 text-gray-400 border-l border-b border-white/10"
                    }`}
                  >
                    {car.status}
                  </div>

                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>

                  <img
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop";
                    }}
                  />
                </div>

                {/* Información */}
                <div className="p-8 flex-grow flex flex-col">
                  <div className="mb-auto">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-serif font-bold text-white leading-tight">
                        {car.make} <br />
                        <span className="text-gray-400 font-sans font-light">
                          {car.model}
                        </span>
                      </h3>

                      <p className="text-gold-400 font-serif text-xl">
                        {car.price.toLocaleString("de-DE")}€
                      </p>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-6 mt-6">
                    <div className="text-center">
                      <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">
                        Año
                      </span>
                      <span className="text-sm text-gray-300 font-medium">
                        {car.year}
                      </span>
                    </div>

                    <div className="text-center border-l border-white/5">
                      <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">
                        Km
                      </span>
                      <span className="text-sm text-gray-300 font-medium">
                        {car.km.toLocaleString()}
                      </span>
                    </div>

                    <div className="text-center border-l border-white/5">
                      <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">
                        Motor
                      </span>
                      <span className="text-sm text-gray-300 font-medium truncate px-1">
                        {car.engine}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 pt-6 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                    <span className="text-xs text-gold-400 uppercase tracking-widest font-bold flex items-center justify-center gap-2">
                      Ver Ficha Completa <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
