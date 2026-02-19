import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '../data/faqs';
import { WhatsAppButton } from '../components/WhatsAppButton';

export function FAQPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-4 block">
              Centro de Ayuda
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white mb-6">
              Preguntas Frecuentes
            </h1>
            <p className="text-gray-400 text-lg">
              Todo lo que necesitas saber sobre la importación de coches desde Alemania en 2026.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-metallic-950/50 border border-white/5 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-6 flex justify-between items-center text-left hover:bg-white/5 transition-all group min-h-[48px] touch-manipulation"
                >
                  <span className="font-medium text-lg text-white group-hover:text-gold-400 transition-colors pr-4">
                    {faq.question}
                  </span>
                  <span className="text-gold-400">
                    {openFaq === idx ? <Minus size={24} /> : <Plus size={24} />}
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ${
                    openFaq === idx ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
