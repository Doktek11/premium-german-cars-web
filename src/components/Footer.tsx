import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Car,
  Instagram,
  Facebook,
  Phone,
  Mail,
  MapPin,
  Plus,
  Minus,
} from "lucide-react";
import { FAQItem } from "../types";

const faqs: FAQItem[] = [
  {
    question: "¿Tengo que pagar el IVA en España?",
    answer:
      "Depende. Si el coche se factura con IVA deducible en Alemania (Netto), empresas y autónomos pueden comprarlo sin IVA intracomunitario. Para particulares, el precio incluye el IVA alemán (19%) o se ajusta según el régimen REBU. Nosotros te asesoramos en tu caso específico.",
  },
  {
    question: "¿Cuánto tarda el proceso completo?",
    answer:
      "Generalmente entre 15 y 20 días desde que se confirma la compra hasta que el coche está matriculado y a tu nombre en España.",
  },
  {
    question: "¿Qué incluye vuestro servicio?",
    answer:
      "Incluye negociación, revisión técnica in situ o peritaje, contrato de compraventa, transporte asegurado, ITV en España, pago de impuestos (Matriculación, Circulación) y gestoría.",
  },
];

export const Footer: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <footer className="bg-metallic-950 text-white pt-20 pb-10 border-t border-white/10">
      {/* FAQ */}
      <div className="container mx-auto px-6 mb-20">
        <h3 className="text-2xl font-serif font-bold mb-8 text-center">
          Preguntas Frecuentes
        </h3>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-white/10">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-4 flex justify-between items-center text-left hover:text-gold-400 transition-colors"
              >
                <span className="font-medium text-lg">{faq.question}</span>
                {openFaq === idx ? <Minus size={20} /> : <Plus size={20} />}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === idx ? "max-h-48 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER GRID */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* LOGO */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-6">
            <Car className="w-8 h-8 text-gold-400" />
            <span className="text-lg font-serif font-bold tracking-wider">
              PREMIUM<span className="text-gold-400"> GERMAN CARS</span>
            </span>
          </Link>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Pasión por el motor. Excelencia en el servicio. Tu puente directo a
            los mejores coches de Alemania.
          </p>

          <div className="flex space-x-4">
            <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-500 hover:text-black transition-colors">
              <Instagram size={20} />
            </a>
            <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-500 hover:text-black transition-colors">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* CONTACTO */}
        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">
            Contacto
          </h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="text-gold-400 w-5 h-5" />
              <span>43850<br />Cambrils, España</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-gold-400 w-5 h-5" />
              <span>+34 603 743 608</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-gold-400 w-5 h-5" />
              <span>info@premiumgermancars.com</span>
            </li>
          </ul>
        </div>

        {/* ENLACES */}
        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">
            Enlaces
          </h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#home" className="hover:text-gold-400">Inicio</a></li>
            <li><a href="#about" className="hover:text-gold-400">Quiénes Somos</a></li>
            <li><a href="#stock" className="hover:text-gold-400">Stock Disponible</a></li>
            <li><a href="#import" className="hover:text-gold-400">Importación a la Carta</a></li>
            <li><a href="#guarantee" className="hover:text-gold-400">Garantías</a></li>
          </ul>
        </div>

        {/* HORARIO */}
        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">
            Horario
          </h4>
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

      {/* LEGAL */}
      <div className="border-t border-white/5 py-8 text-center">
        <p className="text-gray-600 text-xs">
          © {new Date().getFullYear()} Premium German Cars. Todos los derechos
          reservados. |{" "}
          <Link to="/aviso-legal" className="hover:text-gold-400">
            Aviso Legal
          </Link>{" "}
          |{" "}
          <Link to="/politica-de-privacidad" className="hover:text-gold-400">
            Política de Privacidad
          </Link>
        </p>
      </div>
    </footer>
  );
};
