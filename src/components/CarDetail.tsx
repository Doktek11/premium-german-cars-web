import React, { useState, useEffect } from 'react';
import { Car } from '../types';
import { X, Calendar, Gauge, Fuel, Check, ChevronLeft, ChevronRight, Phone, Mail } from 'lucide-react';

interface CarDetailProps {
    car: Car;
    onClose: () => void;
}

export const CarDetail: React.FC<CarDetailProps> = ({ car, onClose }) => {
    
    // Combine main image and gallery into a unique list of images
    const allImages = React.useMemo(() => {
        const images = [car.image, ...(car.gallery || [])];
        // Filter duplicates just in case
        return Array.from(new Set(images));
    }, [car]);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    };

    return (
        <div className="fixed inset-0 z-50 bg-black overflow-y-auto min-h-screen animate-fade-in">
            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-metallic-950/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center shadow-lg">
                <div className="flex items-center gap-2">
                     <span className="text-lg md:text-xl font-serif font-bold text-white">
                        PREMIUM<span className="text-gold-400"> GERMAN CARS</span>
                    </span>
                </div>
                <button 
                    onClick={onClose}
                    className="flex items-center gap-2 text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors group"
                >
                    Cerrar <span className="bg-white/10 p-2 rounded-full group-hover:bg-gold-500 group-hover:text-black transition-all"><X size={20} /></span>
                </button>
            </div>

            <div className="container mx-auto px-6 py-8 md:py-12">
                {/* Header Info */}
                <div className="mb-8 md:mb-10 border-b border-white/10 pb-8">
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <div>
                            <span className="inline-block py-1 px-3 rounded bg-white/5 text-gold-400 text-xs tracking-widest uppercase font-bold mb-3 border border-white/10">{car.status}</span>
                            <h1 className="text-3xl md:text-6xl font-serif font-bold text-white mb-2 leading-tight">{car.make} {car.model}</h1>
                            <p className="text-lg md:text-xl text-gray-400 flex items-center gap-2">
                                <span>{car.year}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                <span>{car.engine}</span>
                            </p>
                        </div>
                        <div className="text-left md:text-right w-full md:w-auto">
                             <p className="text-3xl md:text-5xl font-serif text-gold-400 mb-1">{car.price.toLocaleString('de-DE')} €</p>
                             <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wide">Precio final matriculado</p>
                        </div>
                     </div>
                </div>

                {/* Single Image Carousel / Slider */}
                <div className="mb-12 md:mb-16 relative group select-none">
                    <div className="w-full h-[50vh] md:h-[70vh] bg-metallic-900 rounded-lg overflow-hidden relative border border-white/5 shadow-2xl">
                        
                        {/* Image */}
                        <img 
                            src={allImages[currentImageIndex]} 
                            alt={`${car.make} ${car.model} view ${currentImageIndex + 1}`} 
                            className="w-full h-full object-cover md:object-contain bg-black/50 transition-opacity duration-300" 
                        />

                        {/* Navigation Arrows - Only if more than 1 image */}
                        {allImages.length > 1 && (
                            <>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                    className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-gold-500 hover:text-black transition-all duration-300 border border-white/10 hover:border-transparent z-10"
                                    aria-label="Anterior"
                                >
                                    <ChevronLeft size={32} />
                                </button>
                                
                                <button 
                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-gold-500 hover:text-black transition-all duration-300 border border-white/10 hover:border-transparent z-10"
                                    aria-label="Siguiente"
                                >
                                    <ChevronRight size={32} />
                                </button>
                            </>
                        )}

                        {/* Image Counter Badge */}
                        <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-widest border border-white/10">
                            {currentImageIndex + 1} / {allImages.length}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <div className="bg-metallic-900/50 p-6 md:p-8 rounded-lg border border-white/5">
                            <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-gold-400 pl-4">Descripción del Vehículo</h3>
                            
                            <div className="prose prose-invert prose-lg text-gray-300 leading-relaxed whitespace-pre-line mb-10 font-light text-justify">
                                {car.description || "Descripción detallada no disponible para este vehículo. Contacta con nosotros para más información."}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-gold-400 pl-4">Características Destacadas</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {['Garantía Oficial 12 Meses', 'Certificado de Kilometraje', 'Libro de Mantenimiento al día', 'Vehículo No Fumador', 'Revisión 200 puntos check', 'Entrega en domicilio disponible'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-black/40 rounded border border-white/5">
                                        <Check className="text-gold-400 w-5 h-5 flex-shrink-0" />
                                        <span className="text-sm text-gray-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / CTO */}
                    <div className="lg:col-span-1 order-1 lg:order-2">
                        <div className="bg-metallic-900 border border-white/10 p-6 md:p-8 rounded-lg sticky top-32 shadow-2xl">
                            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Resumen</h3>
                            
                            <div className="space-y-5 mb-8">
                                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="text-gold-400 w-5 h-5" />
                                        <span className="text-gray-300">Año</span>
                                    </div>
                                    <span className="font-bold text-white text-lg">{car.year}</span>
                                </div>
                                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                                    <div className="flex items-center gap-3">
                                        <Gauge className="text-gold-400 w-5 h-5" />
                                        <span className="text-gray-300">Kilometraje</span>
                                    </div>
                                    <span className="font-bold text-white text-lg">{car.km.toLocaleString()} km</span>
                                </div>
                                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                                    <div className="flex items-center gap-3">
                                        <Fuel className="text-gold-400 w-5 h-5" />
                                        <span className="text-gray-300">Motor</span>
                                    </div>
                                    <span className="font-bold text-white text-lg">{car.engine}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <a 
                                    href={`mailto:info@premiumgermancars.com?subject=Interés en ${car.make} ${car.model}`}
                                    className="w-full py-4 bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 rounded shadow-lg hover:shadow-gold-500/20"
                                >
                                    <Mail size={18} /> Solicitar Info
                                </a>
                                <a 
                                    href="tel:+34603743608"
                                    className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 rounded"
                                >
                                    <Phone size={18} /> Llamar
                                </a>
                            </div>
                            
                            <p className="text-xs text-center text-gray-500 mt-6 leading-tight">
                                *Financiación a medida disponible.<br/>Consúltanos sin compromiso.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
