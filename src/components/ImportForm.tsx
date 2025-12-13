import React, { useState } from 'react';
import { Send } from 'lucide-react';

export const ImportForm: React.FC = () => {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const subject = `Solicitud de Presupuesto: ${formData.brand} ${formData.model}`;
        const body = `Solicitud de Importación a la Carta

Vehículo Solicitado:
Marca: ${formData.brand}
Modelo: ${formData.model}
Presupuesto Aproximado: ${formData.budget} €

Datos de Contacto:
Email: ${formData.email}
Teléfono: ${formData.phone}

Detalles Adicionales:
${formData.details}`;

        const mailtoLink = `mailto:info@premiumgermancars.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoLink;
    };

    return (
        <section id="import" className="py-32 bg-metallic-950 relative border-t border-white/5">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16">
                    
                    {/* Text Side */}
                    <div className="lg:w-1/3">
                        <span className="text-gold-400 text-xs tracking-widest uppercase font-bold mb-4 block">Búsqueda a la carta</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                            ¿No encuentras lo que buscas?
                        </h2>
                        <p className="text-gray-400 font-light text-lg leading-relaxed mb-8">
                            El mercado alemán es inmenso. Dinos exactamente qué modelo, color y extras deseas, y nosotros rastreamos las unidades oficiales disponibles para ti.
                        </p>
                        <div className="border-l border-gold-400 pl-6 py-2">
                            <p className="text-white font-serif italic text-xl">"Tu coche ideal existe. Nosotros sabemos dónde está."</p>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="lg:w-2/3">
                        <div className="bg-metallic-900 border border-white/10 p-8 md:p-12 shadow-2xl">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="group">
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-gold-400 transition-colors">Marca</label>
                                        <select 
                                            name="brand" 
                                            className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors appearance-none rounded-none"
                                            onChange={handleChange}
                                            value={formData.brand}
                                        >
                                            <option value="" className="bg-metallic-900">Seleccionar marca...</option>
                                            <option value="Audi" className="bg-metallic-900">Audi</option>
                                            <option value="BMW" className="bg-metallic-900">BMW</option>
                                            <option value="Mercedes-Benz" className="bg-metallic-900">Mercedes-Benz</option>
                                            <option value="Porsche" className="bg-metallic-900">Porsche</option>
                                            <option value="Otro" className="bg-metallic-900">Otra</option>
                                        </select>
                                    </div>
                                    <div className="group">
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-gold-400 transition-colors">Modelo</label>
                                        <input 
                                            type="text" 
                                            name="model" 
                                            placeholder="Ej. RS6 Avant"
                                            className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors placeholder-gray-700"
                                            onChange={handleChange}
                                            value={formData.model}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="group">
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-gold-400 transition-colors">Presupuesto</label>
                                        <input 
                                            type="number" 
                                            name="budget" 
                                            placeholder="€"
                                            className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors placeholder-gray-700"
                                            onChange={handleChange}
                                            value={formData.budget}
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-gold-400 transition-colors">Email</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            placeholder="email@ejemplo.com"
                                            className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors placeholder-gray-700"
                                            onChange={handleChange}
                                            value={formData.email}
                                        />
                                    </div>
                                     <div className="group">
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-gold-400 transition-colors">Teléfono</label>
                                        <input 
                                            type="tel" 
                                            name="phone" 
                                            placeholder="+34"
                                            className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors placeholder-gray-700"
                                            onChange={handleChange}
                                            value={formData.phone}
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-gold-400 transition-colors">Detalles Adicionales</label>
                                    <textarea 
                                        name="details" 
                                        rows={3} 
                                        placeholder="Color, equipamiento imprescindible, año mínimo..."
                                        className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors placeholder-gray-700 resize-none"
                                        onChange={handleChange}
                                        value={formData.details}
                                    ></textarea>
                                </div>

                                <div className="pt-4">
                                    <button 
                                        type="submit" 
                                        className="w-full md:w-auto px-10 py-4 bg-gold-400 hover:bg-gold-500 text-black font-bold uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-gold-400/20 flex items-center justify-center gap-3"
                                    >
                                        Enviar Solicitud <Send size={18} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
