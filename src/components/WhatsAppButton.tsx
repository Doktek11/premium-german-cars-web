import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  const { pathname } = useLocation();
  const phoneNumber = "34603743608"; // Reemplaza con tu número real

  // Personalizamos el mensaje según la página donde esté el usuario
  let message = "Hola! Vengo de la web de Premium German Cars y me gustaría recibir más información.";

  if (pathname.includes('mejores-modelos-importar-alemania-2026')) {
    message = "Hola! He leído vuestro artículo sobre los mejores modelos para importar en 2026 y me gustaría asesoramiento sobre uno de ellos.";
  } else if (pathname.includes('car/')) {
    message = "Hola! Estoy interesado en uno de los vehículos de vuestro stock. ¿Sigue disponible?";
  } else if (pathname.includes('importacion')) {
    message = "Hola! Me gustaría solicitar un presupuesto personalizado para importar un coche de Alemania.";
  }

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
    >
      <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
      
      {/* Tooltip opcional que aparece al pasar el ratón */}
      <span className="absolute right-16 bg-white text-black text-xs font-bold px-3 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        ¿Hablamos?
      </span>
    </a>
  );
};
