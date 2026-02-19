import React from "react";
import { Search, CheckCircle, Truck, FileCheck } from "lucide-react";

export const Features: React.FC = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-gold-400" />,
      title: "Búsqueda",
      desc: "Acceso a inventario oculto y concesionarios oficiales en toda Alemania."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-gold-400" />,
      title: "Verificación",
      desc: "Inspección técnica detallada, historial de mantenimiento y pintura."
    },
    {
      icon: <FileCheck className="w-8 h-8 text-gold-400" />,
      title: "Gestión",
      desc: "Negociación de precio, contrato bilingüe y burocracia de exportación."
    },
    {
      icon: <Truck className="w-8 h-8 text-gold-400" />,
      title: "Entrega",
      desc: "Transporte asegurado y matriculación final en España. Llaves en mano."
    }
  ];

  return (
    <section id="process" className="py-16 sm:py-20 md:py-32 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-4 block">El Proceso</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
              Importar nunca fue <span className="text-gray-500 italic">tan sencillo.</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-md font-light text-left md:text-justify leading-relaxed text-sm md:text-base">
            Hemos simplificado la burocracia internacional en 4 pasos transparentes para que tú solo te preocupes de elegir el color.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="premium-card p-8 md:p-10 group relative overflow-hidden transition-all duration-300 hover:bg-white/[0.02] border border-white/5 rounded-sm"
            >
              {/* Number Background - Optimizado */}
              <span className="absolute -right-4 -top-4 text-8xl md:text-9xl font-serif text-white/[0.02] group-hover:text-gold-400/[0.05] transition-colors select-none pointer-events-none">
                {index + 1}
              </span>

              <div className="mb-6 md:mb-8 relative z-10 transform group-hover:scale-110 transition-transform duration-300 will-change-transform">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide relative z-10">{step.title}</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed relative z-10 border-t border-white/5 pt-4 group-hover:border-gold-400/30 transition-colors">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
