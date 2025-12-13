import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  return (
    <a 
      href="https://wa.me/34603743608" 
      target="_blank" 
      rel="noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={32} className="fill-current" />
      <span className="absolute right-full mr-4 bg-white text-black px-3 py-1 rounded text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
        ¡Hablemos ahora!
      </span>
    </a>
  );
};
