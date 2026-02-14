import React from "react";
import { ShieldCheck, FileCheck, Euro } from "lucide-react";

export const Guarantee: React.FC = () => {
  return (
    <section id="guarantee" className="py-20 md:py-32 bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            {/* Decorative elements */}
            <div className="absolute top-6 left-6 w-full h-full border border-gold-400/20 rounded z-0 hidden lg:block"></div>
            <div className="relative z-10 overflow-hidden rounded shadow-2xl bg-black/40">
              <img
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop"
                alt="Interior de coche de lujo Premium German Cars"
                className="w-full h-[300px] md:h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 transform hover:scale-105"
                loading="lazy"
                decoding="async"
                width="600"
                height="450"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-4 block">Tranquilidad Total</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight">
              Sin riesgos. <br className="hidden md:block" /> Solo <span className="text-gold-400">certezas.</span>
            </h2>

            <div className="space-y-6 md:space-y-8">
              {[
                {
                  icon: <ShieldCheck className="w-5 h-5 text-gold-400" />,
                  title: "Garantía Oficial Europea",
                  desc: "Mínimo 12 meses de garantía válida en cualquier servicio oficial de la marca en España. Cobertura idéntica a nacional."
                },
                {
                  icon: <FileCheck className="w-5 h-5 text-gold-400" />,
                  title: "Historial Certificado",
                  desc: "Certificado de kilometraje real y ausencia de daños estructurales (Unfallfrei) verificado en contrato oficial."
                },
                {
                  icon: <Euro className="w-5 h-5 text-gold-400" />,
                  title: "Inversión Inteligente",
                  desc: "Accede a unidades más equipadas por el mismo precio, o ahorra entre un 5-15% respecto al mercado local."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 md:gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-gold-400/50 transition-all duration-300 flex-shrink-0 shadow-inner">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-white mb-2 group-hover:text-gold-400 transition-colors">{item.title}</h4>
                    <p className="text-sm text-gray-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
