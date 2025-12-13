import React from 'react';
import { Quote } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Carlos M.",
        car: "Porsche Macan GTS",
        text: "La transparencia fue total. Me enviaron vídeos del coche en Alemania, gestionaron la matrícula y me lo entregaron en la puerta de mi casa en Madrid. Impecable.",
        image: "https://picsum.photos/100/100?random=1"
    },
    {
        id: 2,
        name: "Elena R.",
        car: "Audi RS3",
        text: "Buscaba una configuración muy específica que no encontraba en España. En 2 semanas ya tenía opciones reales y en un mes el coche estaba en mi garaje.",
        image: "https://picsum.photos/100/100?random=2"
    },
    {
        id: 3,
        name: "Javier S.",
        car: "BMW M5 Competition",
        text: "El ahorro respecto a unidades nacionales fue considerable, pero lo mejor fue el estado del coche. Parecía recién salido de fábrica. Profesionales 100%.",
        image: "https://picsum.photos/100/100?random=3"
    }
];

export const Testimonials: React.FC = () => {
    return (
        <section className="py-24 bg-metallic-900 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-gold-400 text-sm tracking-widest uppercase font-bold">Confianza</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2">Testimonios Reales</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div key={t.id} className="p-8 bg-metallic-950 border border-white/5 relative">
                            <Quote className="absolute top-8 left-8 text-gold-500/20 w-16 h-16 -z-0" />
                            <div className="relative z-10">
                                <p className="text-gray-300 italic mb-8 leading-relaxed">"{t.text}"</p>
                                <div className="flex items-center gap-4">
                                    <img 
                                        src={t.image} 
                                        alt={t.name} 
                                        className="w-12 h-12 rounded-full object-cover border border-gold-400/50"
                                        loading="lazy"
                                        decoding="async"
                                        width="48"
                                        height="48"
                                    />
                                    <div>
                                        <h4 className="text-white font-bold">{t.name}</h4>
                                        <p className="text-xs text-gold-400 uppercase tracking-wide">{t.car}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
