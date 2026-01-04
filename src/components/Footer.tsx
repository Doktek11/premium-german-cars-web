import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, Mail, MapPin, Plus, Minus, ShieldCheck } from 'lucide-react';
import { FAQItem } from '../types';

const faqs: FAQItem[] = [
    {
        question: "¿Tengo que pagar el IVA en España?",
        answer: "Depende. Si el coche se factura con IVA deducible en Alemania (Netto), empresas y autónomos pueden comprarlo sin IVA intracomunitario. Para particulares, el precio incluye el IVA alemán (19%) o se ajusta según el régimen REBU. Nosotros te asesoramos en tu caso específico."
    },
    {
        question: "¿Cuánto tarda el proceso completo?",
        answer: "Generalmente entre 15 y 20 días desde que se confirma la compra hasta que el coche está matriculado y a tu nombre en España."
    },
    {
        question: "¿Qué incluye vuestro servicio?",
        answer: "Incluye negociación, revisión técnica in situ o peritaje, contrato de compraventa, transporte asegurado, ITV en España, pago de impuestos (Matriculación, Circulación) y gestoría."
    }
];

export const Footer: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <footer className="bg-metallic-950 text-white pt-20 pb-10 border-t border-white/10">
            {/* FAQ Section */}
            <div className="container mx-auto px-6 mb-20">
                <h3 className="text-2xl font-serif font-bold mb-8 text-center">Preguntas Frecuentes</h3>
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="border-b border-white/10">
                            <button 
                                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                aria-expanded={openFaq === idx}
                                className="w-full py-4 flex justify-between items-center text-left hover:text-gold-400 transition-colors"
                            >
                                <span className="font-medium text-lg">{faq.question}</span>
                                {openFaq === idx ? <Minus size={20} /> : <Plus size={20} />}
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-48 pb-6' : 'max-h-0'}`}>
                                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12" id="contact">
                <div>
                    <Link to="/" className="inline-block mb-6 transition-transform hover:scale-105" aria-label="Ir al inicio">
                        <img 
                            src="/logoPGC.svg" 
                            alt="Premium German Cars - Importación de coches en Cambrils" 
                            className="h-10 w-auto brightness-0 invert" 
                        />
                    </Link>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Pasión por el motor. Excelencia en el servicio. Tu puente directo a los mejores coches de Alemania.
                    </p>
                    <div className="flex space-x-4 mb-8">
                        <a 
                            href="https://www.instagram.com/premiumgermancars1?igsh=MWEzejNrZDhjbmowYg%3D%3D" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-500 hover:text-black transition-colors"
                        >
                            <Instagram size={20} />
                        </a>
                        <a 
                            href="https://facebook.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-500 hover:text-black transition-colors"
                        >
                            <Facebook size={20} />
                        </a>
                    </div>

                    {/* Crypto Section - Nueva Adición */}
                    <div className="pt-6 border-t border-white/5">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 flex items-center gap-2">
                            <ShieldCheck size={12} className="text-gold-500" /> Pagos Digitales
                        </p>
                        <div className="flex items-center gap-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                             {/* Icono BTC Simple */}
                             <div className="flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.471-1.24 14.914.364c6.416 1.604 10.322 8.117 8.724 14.54zm-6.251-4.692c.24-1.582-.976-2.446-2.637-3.014l.54-2.152-1.31-.327-.526 2.103c-.344-.085-.7-.166-1.054-.243l.527-2.103-1.31-.327-.54 2.151c-.285-.064-.56-.128-.848-.197l.001-.004-1.81-.45-.35 1.401s.975.222.955.236c.532.132.627.48.611.758l-.612 2.448c.036.009.083.022.135.044l-.136-.034-.858 3.429c-.065.161-.23.403-.601.311.014.02-.955-.238-.955-.238l-.652 1.503 1.708.426c.318.08.63.162.937.24l-.548 2.19 1.308.326.54-2.16c.358.097.708.187 1.052.272l-.54 2.161 1.31.327.548-2.19c2.24.425 3.924.254 4.631-1.772.574-1.628.022-2.568-1.15-3.18.854-.197 1.498-.758 1.67-1.916zm-3.01 4.18c-.406 1.633-3.15.75-4.04.527l.72-2.883c.89.223 3.738.663 3.32 2.356zm.406-4.202c-.37 1.481-2.662.728-3.403.543l.654-2.62c.74.186 3.127.534 2.75 2.077z"/>
                                </svg>
                                <span className="text-[11px] font-medium tracking-tighter">BTC</span>
                             </div>
                             {/* Icono USDC Simple */}
                             <div className="flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zM12 2.1c5.468 0 9.9 4.432 9.9 9.9s-4.432 9.9-9.9 9.9-9.9-4.432-9.9-9.9 4.432-9.9 9.9-9.9zm.61 14.28c-1.82 0-3.32-.97-3.69-2.31h1.56c.33.61 1.08.97 2.13.97 1.29 0 2.11-.64 2.11-1.52 0-2.41-4.99-1.29-4.99-4.57 0-1.46 1.25-2.58 3.14-2.58 1.76 0 2.92.83 3.29 2.08h-1.52c-.3-.54-.92-.81-1.77-.81-1.18 0-1.85.59-1.85 1.34 0 2.19 4.99 1.14 4.99 4.48 0 1.64-1.3 2.62-3.41 2.62zM12.64 18c.18 0 .33-.13.33-.31v-1.18c0-.18-.15-.31-.33-.31s-.33.13-.33.31v1.18c0 .18.15.31.33.31zm0-10.6c.18 0 .33-.13.33-.31V5.91c0-.18-.15-.31-.33-.31s-.33.13-.33.31v1.18c0 .18.15.31.33.31z"/>
                                </svg>
                                <span className="text-[11px] font-medium tracking-tighter">USDC</span>
                             </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-gold-400">Contacto</h4>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin className="text-gold-400 w-5 h-5 flex-shrink-0" />
                            <span> 43850<br/>Cambrils, Tarragona</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="text-gold-400 w-5 h-5 flex-shrink-0" />
                            <span>+34 603 743 608</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="text-gold-400 w-5 h-5 flex-shrink-0" />
                            <span>info@premiumgermancars.com</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-gold-400">Enlaces</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><Link to="/" className="hover:text-gold-400 transition-colors">Inicio</Link></li>
                        <li><Link to="/importacion-coches-alemania" className="hover:text-gold-400 transition-colors">Importación</Link></li>
                        <li><Link to="/blog" className="hover:text-gold-400 transition-colors font-medium">Blog Premium</Link></li>
                        <li><button onClick={() => document.getElementById('stock')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-gold-400 transition-colors">Stock Disponible</button></li>
                        <li><button onClick={() => document.getElementById('guarantee')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-gold-400 transition-colors">Garantías</button></li>
                    </ul>
                </div>
                
                <div>
                     <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-gold-400">Horario</h4>
                     <ul className="space-y-2 text-gray-400 text-sm">
                        <li className="flex justify-between">
                            <span>Lunes - Viernes</span>
                            <span className="text-white">10:00 - 20:00</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Sábados</span>
                            <span className="text-white">10:00 - 14:00</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Domingos</span>
                            <span className="text-gold-400">Cerrado</span>
                        </li>
                     </ul>
                </div>
            </div>

            {/* Créditos y Enlaces Legales */}
            <div className="border-t border-white/5 py-8 text-center">
                <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 text-[10px] text-gray-400 uppercase tracking-widest transition-opacity duration-500">
                    <p>© {new Date().getFullYear()} Premium German Cars</p>
                    <span className="hidden md:inline text-gray-600">|</span>
                    <Link to="/aviso-legal" className="hover:text-gold-400 transition-colors py-2 md:py-0">Aviso Legal</Link>
                    <span className="hidden md:inline text-gray-600">|</span>
                    <Link to="/politica-privacidad" className="hover:text-gold-400 transition-colors py-2 md:py-0">Política de Privacidad</Link>
                </div>
            </div>
        </footer>
    );
};
