import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { WhatsAppButton } from "../../components/WhatsAppButton";

export default function MotoresBmwMercedes2027() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <Navbar />
      <main className="bg-metallic-950 text-white pt-32 pb-20">
        <article className="container mx-auto px-6 max-w-3xl">
          <header className="mb-12">
            <span className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-4 block">Actualidad e Industria</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">¿Corazón BMW en un Mercedes? El posible pacto de motores para 2027</h1>
          </header>
          <div className="space-y-8 text-gray-300 text-lg leading-relaxed">
            <p>Mercedes-Benz y BMW podrían colaborar a nivel de propulsores a partir de 2027 para optimizar recursos ante la normativa Euro 7.</p>
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
