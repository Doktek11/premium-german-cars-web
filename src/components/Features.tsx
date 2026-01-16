import React from 'react';
import { Search, CheckCircle, Truck, FileCheck, ShieldCheck, Euro } from 'lucide-react';

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
    <section id="process" className="py-20 md:py-32 bg-metallic-950 relative overflow-hidden">
        <div className="container mx-auto px-6">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step, index) => (
                    <div key={index} className="premium-card p-8 md:p-10 group relative overflow-hidden transition-all duration-300 hover:bg-white/[0.02]">
                        {/* Number Background - Optimizado para no causar saltos visuales */}
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

export const Guarantee: React.FC = () => {
    return (
        <section id="guarantee" className="py-20 md:py-32 bg-metallic-900 border-t border-white/5 overflow-hidden">
             <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="order-2 lg:order-1 relative">
                        {/* Decorative elements */}
                        <div className="absolute top-6 left-6 w-full h-full border border-gold-400/20 rounded z-0 hidden lg:block"></div>
                        <div className="relative z-10 overflow-hidden rounded shadow-2xl">
                            <img 
                                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop" 
                                alt="Interior de coche de lujo Premium German Cars" 
                                className="w-full h-[300px] md:h-auto object-cover grayscale hover:grayscale-0 transition-all duration-1000 transform hover:scale-105"
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
                            Sin riesgos. <br className="hidden md:block"/> Solo <span className="text-gold-400">certezas.</span>
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
    )
}
