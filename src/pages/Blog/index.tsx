import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { WhatsAppButton } from '../../components/WhatsAppButton';
import { Calendar, ArrowRight, Car } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "¿Corazón BMW en un Mercedes? El posible pacto de motores para 2027",
    excerpt: "Analizamos los rumores sobre la colaboración entre Mercedes-Benz y BMW para el uso de motores de 4 cilindros.",
    date: "17 Dic, 2025",
    author: "Premium German Cars",
    slug: "motores-bmw-en-mercedes-2027",
    category: "Actualidad"
  },
  {
    id: 2,
    title: "BMW de Reestreno: La guía definitiva para 2026",
    excerpt: "Todo lo que necesitas saber para importar tu próximo BMW desde Alemania con las mejores garantías.",
    date: "15 Dic, 2025",
    author: "Premium German Cars",
    slug: "bmw-reestreno-alemania-2026",
    category: "Guías"
  },
  {
    id: 3,
    title: "Coches de segunda mano en Reus y Tarragona",
    excerpt: "¿Vale la pena comprar local o importar? Comparamos el mercado de ocasión frente a la importación directa.",
    date: "10 Dic, 2025",
    author: "Premium German Cars",
    slug: "coche-segunda-mano-reus-tarragona",
    category: "Mercado"
  }
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <header className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              Blog <span className="text-gold-400">Premium</span>
            </h1>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-metallic-900 border border-white/10 rounded-lg overflow-hidden flex flex-col group hover:border-gold-400/50 transition-colors duration-300">
                
                {/* CONTENEDOR DE IMAGEN SUSTITUIDO POR PLACEHOLDER ELEGANTE */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-metallic-800 to-black flex items-center justify-center">
                  <Car className="w-16 h-16 text-gold-400/20 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold-400 text-black text-[10px] font-bold px-2 py-1 uppercase tracking-tighter">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow text-white">
                  <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-gold-400" /> {post.date}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-serif font-bold mb-4 group-hover:text-gold-400 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-400 mb-8 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="text-gold-400 font-bold uppercase text-xs tracking-widest flex items-center gap-2 group/link"
                  >
                    Leer más 
                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
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
