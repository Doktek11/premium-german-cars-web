import React, { useState } from 'react';
import { Send, CheckCircle, MessageCircle } from 'lucide-react';

export const ImportForm: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        budget: '',
        email: '',
        phone: '',
        details: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Estructura profesional para el mensaje que recibirás
    const generateMessageBody = () => {
        return `Solicitud de Importación - Premium German Cars

Vehículo: ${formData.brand} ${formData.model}
Presupuesto Máx: ${formData.budget} €

Datos de contacto:
Email: ${formData.email}
Teléfono: ${formData.phone}

Detalles específicos:
${formData.details || 'Sin detalles adicionales'}`;
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = `Nueva Solicitud: ${formData.brand} ${formData.model}`;
        const mailtoLink = `mailto:info@premiumgermancars.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(generateMessageBody())}`;
        
        window.location.href = mailtoLink;
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const handleWhatsAppSubmit = () => {
        if (!formData.brand || !formData.model || !formData.phone) {
            alert("Por favor, rellena Marca, Modelo y Teléfono para enviarlo por WhatsApp.");
            return;
        }

        // Tu número configurado correctamente
        const whatsappNumber = "34603743608"; 
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(generateMessageBody())}`;
        
        window.open(whatsappLink, '_blank');
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <section id="import" className="py-32 bg-metallic-950 relative border-t border-white/5">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16">
                    
                    {/* Sección de Texto */}
                    <div className="lg:w-1/3">
                        <span className="text-gold-400 text-xs tracking-widest uppercase font-bold mb-4 block">Búsqueda a la carta</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                            ¿No encuentras lo que buscas?
                        </h2>
                        <p className="text-gray-400 font-light text-lg leading-relaxed mb-8">
                            Dinos qué coche buscas y nosotros rastreamos las unidades oficiales disponibles en Alemania por ti.
                        </p>
                        <div className="border-l border-gold-400 pl-6 py-2">
                            <p className="text-white font-serif italic text-xl">"Tu coche ideal existe. Nosotros sabemos dónde está."</p>
                        </div>
                    </div>

                    {/* Sección del Formulario */}
                    <div className="lg:w-2/3">
                        <div className="bg-metallic-900 border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
                            
                            {isSubmitted ? (
                                <div className="py-20 text-center animate-fade-in">
                                    <CheckCircle className="text-gold-400 mx-auto mb-6" size={64} />
                                    <h3 className="text-2xl font-serif font-bold text-white mb-4">¡Solicitud Procesada!</h3>
                                    <p className="text-gray-400">Gracias por contactar con Premium German Cars.<br/>Te responderemos en menos de 24 horas.</p>
                                    <button 
                                        onClick={() => setIsSubmitted(false)}
                                        className="mt-8 text-gold-400 text-sm uppercase tracking-widest font-bold"
                                    >
                                        Hacer otra consulta
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleEmailSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="group">
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-gold-400">Marca</label>
                                            <input required name="brand" type="text" placeholder="Ej. Audi" className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors" onChange={handleChange} value={formData.brand} />
                                        </div>
                                        <div className="group">
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-gold-400">Modelo</label>
                                            <input required name="model" type="text" placeholder="Ej. RS3 Sportback" className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors" onChange={handleChange} value={formData.model} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="group">
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-gold-400">Presupuesto (€)</label>
                                            <input required name="budget" type="number" placeholder="Ej. 65000" className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors" onChange={handleChange} value={formData.budget} />
                                        </div>
                                        <div className="group">
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-gold-400">Email</label>
                                            <input required name="email" type="email" placeholder="tu@email.com" className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors" onChange={handleChange} value={formData.email} />
                                        </div>
                                         <div className="group">
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-gold-400">Teléfono</label>
                                            <input required name="phone" type="tel" placeholder="+34 603 743 608" className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors" onChange={handleChange} value={formData.phone} />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-gold-400">Extras y Preferencias</label>
                                        <textarea name="details" rows={2} placeholder="Techo panorámico, acabado mate, menos de 50.000km..." className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors resize-none" onChange={handleChange} value={formData.details}></textarea>
                                    </div>

                                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                        <button 
                                            type="submit" 
                                            className="flex-1 px-8 py-4 bg-white text-black font-bold uppercase text-[10px] tracking-widest hover:bg-gold-400 transition-all flex items-center justify-center gap-2"
                                        >
                                            Enviar por Email <Send size={14} />
                                        </button>
                                        
                                        <button 
                                            type="button"
                                            onClick={handleWhatsAppSubmit}
                                            className="flex-1 px-8 py-4 bg-[#25D366] text-white font-bold uppercase text-[10px] tracking-widest hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 shadow-xl shadow-green-900/10"
                                        >
                                            Contactar WhatsApp <MessageCircle size={14} />
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest opacity-50">
                                        Premium German Cars - Gestión Directa
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
