import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { WhatsAppButton } from '../../components/WhatsAppButton';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "¿Corazón BMW en un Mercedes? El posible pacto de motores para 2027",
    excerpt: "Analizamos los rumores sobre la colaboración entre Mercedes-Benz y BMW para el uso de motores de 4 cilindros.",
    date: "17 Dic, 2025",
    author: "Premium German Cars",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80",
    slug: "motores-bmw-en-mercedes-2027",
    category: "Actualidad"
  },
  {
    id: 2,
    title: "BMW de Reestreno: La guía definitiva para 2026",
    excerpt: "Todo lo que necesitas saber para importar tu próximo BMW desde Alemania con las mejores garantías.",
    date: "15 Dic, 2025",
    author: "Premium German Cars",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80",
    slug: "bmw-reestreno-alemania-2026",
    category: "Guías"
  },
  {
    id: 3,
    title: "Coches de segunda mano en Reus y Tarragona",
    excerpt: "¿Vale la pena comprar local o importar? Comparamos el mercado de ocasión frente a la importación directa.",
    date: "10 Dic, 2025",
    author: "Premium German Cars",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80",
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
              <article key={post.id} className="bg-metallic-900 border border-white/10 rounded-lg overflow-hidden flex flex-col group">
                <div className="relative h-64 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8 flex flex-col flex-grow text-white">
                  <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold mb-4">{post.title}</h2>
                  <p className="text-gray-400 mb-8 flex-grow">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="text-gold-400 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                    Leer más <ArrowRight size={16} />
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
