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
    <section id="process" className="py-32 bg-metallic-950 relative">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div className="max-w-2xl">
                    <span className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-4 block">El Proceso</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                        Importar nunca fue <span className="text-gray-500 italic">tan sencillo.</span>
                    </h2>
                </div>
                <p className="text-gray-400 max-w-md font-light text-justify leading-relaxed">
                   Hemos simplificado la burocracia internacional en 4 pasos transparentes para que tú solo te preocupes de elegir el color.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step, index) => (
                    <div key={index} className="premium-card p-10 group relative overflow-hidden">
                        {/* Number Background */}
                        <span className="absolute -right-4 -top-4 text-9xl font-serif text-white/[0.02] group-hover:text-gold-400/[0.05] transition-colors select-none">
                            {index + 1}
                        </span>
                        
                        <div className="mb-8 relative z-10">
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
        <section id="guarantee" className="py-32 bg-metallic-900 border-t border-white/5">
             <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="order-2 lg:order-1 relative">
                        {/* Decorative elements */}
                        <div className="absolute top-10 left-10 w-full h-full border border-gold-400/20 rounded z-0 hidden lg:block"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1887&auto=format&fit=crop" 
                            alt="Interior de coche de lujo" 
                            className="relative z-10 w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                            loading="lazy"
                            decoding="async"
                            width="600"
                            height="400"
                        />
                    </div>

                    <div className="order-1 lg:order-2">
                        <span className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-4 block">Tranquilidad Total</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                            Sin riesgos. <br/> Solo <span className="text-gold-400">certezas.</span>
                        </h2>
                        
                        <div className="space-y-8">
                            <div className="flex gap-6 group">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-gold-400/50 transition-colors flex-shrink-0">
                                    <ShieldCheck className="w-5 h-5 text-gold-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-serif text-white mb-2">Garantía Oficial Europea</h4>
                                    <p className="text-sm text-gray-400 font-light leading-relaxed">Mínimo 12 meses de garantía válida en cualquier servicio oficial de la marca en España. Cobertura idéntica a nacional.</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-6 group">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-gold-400/50 transition-colors flex-shrink-0">
                                    <FileCheck className="w-5 h-5 text-gold-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-serif text-white mb-2">Historial Certificado</h4>
                                    <p className="text-sm text-gray-400 font-light leading-relaxed">Certificado de kilometraje real y ausencia de daños estructurales (Unfallfrei) verificado en contrato.</p>
                                </div>
                            </div>

                             <div className="flex gap-6 group">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-gold-400/50 transition-colors flex-shrink-0">
                                    <Euro className="w-5 h-5 text-gold-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-serif text-white mb-2">Inversión Inteligente</h4>
                                    <p className="text-sm text-gray-400 font-light leading-relaxed">Accede a unidades más equipadas por el mismo precio, o ahorra entre un 5-15% respecto al mercado local.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </section>
    )
}
