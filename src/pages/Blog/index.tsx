import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { WhatsAppButton } from '../../components/WhatsAppButton';
import { Calendar, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 7,
    title: "BMW y Alpina: El nacimiento de una nueva era en el lujo automotriz alemán",
    excerpt: "Analizamos la integración de Alpina en BMW Group. ¿Qué significa para los coleccionistas y por qué las unidades artesanalas son la inversión clave de 2026?",
    date: "09 Ene, 2026",
    slug: "bmw-alpina-nueva-era-lujo-aleman",
    category: "Actualidad"
  },
  {
    id: 6,
    title: "Los 5 Riesgos Más Comunes al Importar un Coche de Alemania (y Cómo Evitarlos)",
    excerpt: "Evite estafas, problemas de IVA y vicios ocultos. Conozca nuestro protocolo de verificación de tolerancia cero para una importación segura en 2026.",
    date: "07 Ene, 2026",
    slug: "5-riesgos-importar-coche-alemania",
    category: "Seguridad"
  },
  {
    id: 5,
    title: "Guía 2026: Importar un Coche de Alemania sin Sorpresas Fiscales",
    excerpt: "Protocolo completo 2026. Entienda la fiscalidad de las emisiones de CO2, la documentación necesaria y cómo evitar los errores más comunes en la logística profesional.",
    date: "05 Ene, 2026",
    slug: "como-importar-coche-alemania",
    category: "Protocolo PGC"
  },
  {
    id: 4,
    title: "Los 5 modelos más inteligentes para importar de Alemania en 2026",
    excerpt: "Calidad real, historial transparente y valor de reventa. Descubre por qué la trazabilidad certificada es la clave para una importación segura.",
    date: "02 Ene, 2026",
    slug: "mejores-modelos-importar-alemania-2026",
    category: "Guías"
  },
  {
    id: 1,
    title: "¿Corazón BMW en un Mercedes? El posible pacto de motores para 2027",
    excerpt: "Analizamos los rumores sobre la colaboración entre Mercedes-Benz y BMW para el uso de motores de 4 cilindros.",
    date: "17 Dic, 2025",
    slug: "motores-bmw-en-mercedes-2027",
    category: "Actualidad"
  },
  {
    id: 2,
    title: "BMW de Reestreno: La guía definitiva para 2026",
    excerpt: "Todo lo que necesitas saber para importar tu próximo BMW desde Alemania con las mejores garantías.",
    date: "15 Dic, 2025",
    slug: "bmw-reestreno-alemania-2026",
    category: "Guías"
  },
  {
    id: 3,
    title: "Coches de segunda mano en Reus y Tarragona",
    excerpt: "¿Vale la pena comprar local o importar? Comparamos el mercado de ocasión frente a la importación directa.",
    date: "10 Dic, 2025",
    slug: "coche-segunda-mano-reus-tarragona",
    category: "Mercado"
  }
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-40 pb-20">
        <div className="container mx-auto px-6">
          <header className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              Blog <span className="text-gold-400">Premium</span>
            </h1>
            <p className="text-gray-400 text-lg italic leading-relaxed">
              Actualidad, protocolos de importación y análisis estratégico del mercado automotriz alemán para clientes de <span className="text-white font-semibold italic">Premium German Cars</span>.
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-[#0a0a0a] border border-white/5 overflow-hidden flex flex-col group hover:border-gold-400/30 transition-all duration-500 shadow-2xl"
              >
                
                {/* CONTENEDOR DE IMAGEN */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#111] to-black flex items-center justify-center">
                  <img 
                    src="/logoPGC.svg" 
                    alt={`Artículo sobre ${post.title}`} 
                    className="w-32 h-auto opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700 brightness-0 invert"
                  />
                  
                  {/* CATEGORÍA */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-gold-400 text-black text-[9px] font-black px-4 py-1.5 uppercase tracking-[0.2em] shadow-lg">
                      {post.category}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                </div>

                <div className="p-8 flex flex-col flex-grow text-white">
                  <div className="flex items-center gap-2 text-gray-500 text-[10px] mb-6 uppercase tracking-[0.2em] font-bold">
                    <Calendar size={12} className="text-gold-400" /> 
                    {post.date}
                  </div>
                  
                  <h2 className="text-2xl font-serif font-bold mb-4 group-hover:text-gold-400 transition-colors duration-300 line-clamp-2 leading-[1.2]">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-500 mb-8 flex-grow line-clamp-3 text-sm leading-relaxed italic">
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="text-white font-bold uppercase text-[10px] tracking-[0.3em] flex items-center gap-3 group/link mt-auto border-t border-white/5 pt-6 group-hover:text-gold-400 transition-colors"
                  >
                    Leer artículo completo
                    <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform duration-300 text-gold-400" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
