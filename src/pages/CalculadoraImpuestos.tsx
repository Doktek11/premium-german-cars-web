import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Info, Calculator, Gauge, Calendar, Euro } from 'lucide-react';

export const CalculadoraImpuestos = () => {
  const [precio, setPrecio] = useState<number>(45000);
  const [emisiones, setEmisiones] = useState<number>(150);
  const [antiguedad, setAntiguedad] = useState<number>(1); // años
  const [resultado, setResultado] = useState<number>(0);

  // Lógica de cálculo basada en tramos de 2026
  useEffect(() => {
    let porcentaje = 0;
    if (emisiones <= 120) porcentaje = 0;
    else if (emisiones <= 159) porcentaje = 4.75;
    else if (emisiones <= 199) porcentaje = 9.75;
    else porcentaje = 14.75;

    // Simplificación de depreciación BOE (orientativo)
    const depreciacion = antiguedad === 1 ? 1 : antiguedad === 2 ? 0.84 : antiguedad === 3 ? 0.67 : 0.50;
    const impuesto = (precio * depreciacion) * (porcentaje / 100);
    
    setResultado(impuesto);
  }, [precio, emisiones, antiguedad]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Calculadora de <span className="text-gold-400 font-light italic">Impuestos</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Estima el coste del Impuesto de Matriculación para tu vehículo importado. 
              Valores actualizados según normativa 2026.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-metallic-900 p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
            
            {/* CONTROLES */}
            <div className="space-y-10">
              {/* Precio */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gold-400 mb-4">
                  <Euro size={16} /> Valor estimado (Tablas BOE/Compra)
                </label>
                <input 
                  type="range" min="10000" max="150000" step="1000"
                  value={precio} onChange={(e) => setPrecio(Number(e.target.value))}
                  className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-gold-500"
                />
                <div className="flex justify-between mt-2 font-mono text-xl text-white">
                  <span>{precio.toLocaleString()} €</span>
                </div>
              </div>

              {/* Emisiones */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gold-400 mb-4">
                  <Gauge size={16} /> Emisiones CO2 (g/km)
                </label>
                <input 
                  type="range" min="0" max="350" step="1"
                  value={emisiones} onChange={(e) => setEmisiones(Number(e.target.value))}
                  className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-gold-500"
                />
                <div className="flex justify-between mt-2 font-mono text-xl text-white">
                  <span>{emisiones} g/km</span>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-400">WLTP</span>
                </div>
              </div>

              {/* Antigüedad */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gold-400 mb-4">
                  <Calendar size={16} /> Antigüedad del vehículo
                </label>
                <select 
                  value={antiguedad} onChange={(e) => setAntiguedad(Number(e.target.value))}
                  className="w-full bg-black border border-white/10 p-4 rounded-xl text-white focus:border-gold-400 outline-none"
                >
                  <option value={1}>Menos de 1 año (100% base)</option>
                  <option value={2}>Entre 1 y 2 años (84% base)</option>
                  <option value={3}>Entre 2 y 3 años (67% base)</option>
                  <option value={4}>Más de 4 años (50% base aprox)</option>
                </select>
              </div>
            </div>

            {/* RESULTADO VISUAL */}
            <div className="bg-black/50 rounded-2xl p-8 border border-gold-400/20 flex flex-col justify-center items-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Calculator size={120} />
              </div>
              
              <h3 className="text-gray-400 uppercase tracking-tighter text-sm mb-2">Total Impuesto Estimado</h3>
              <div className="text-6xl md:text-7xl font-mono font-bold text-gold-400 mb-4">
                {resultado.toLocaleString(undefined, { maximumFractionDigits: 0 })}€
              </div>
              <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed">
                *Este cálculo es una estimación. El valor final depende de las tablas oficiales del BOE vigentes.
              </p>

              <div className="mt-8 pt-8 border-t border-white/5 w-full">
                <p className="text-sm text-gray-300 mb-4">¿Quieres que verifiquemos el coste exacto de una unidad?</p>
                <a 
                  href={`https://wa.me/34603743608?text=Hola! He usado vuestra calculadora para un coche de ${emisiones}g/km y me sale un impuesto de ${resultado}€. ¿Me ayudáis?`}
                  target="_blank" rel="noopener noreferrer"
                  className="block w-full py-4 bg-gold-500 text-black font-bold rounded-full hover:bg-white transition-all uppercase text-xs tracking-widest"
                >
                  Consultar con un experto
                </a>
              </div>
            </div>
          </div>

          {/* TABLA INFORMATIVA PARA SEO */}
          <section className="mt-20">
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
              <Info className="text-gold-400" /> Tramos Impuesto de Matriculación 2026
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-gold-400 text-sm uppercase">
                    <th className="py-4 px-4">Emisiones CO2</th>
                    <th className="py-4 px-4">Tipo Impositivo</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-mono">0 - 120 g/km</td>
                    <td className="py-4 px-4 font-bold text-white">0%</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-mono">121 - 159 g/km</td>
                    <td className="py-4 px-4 font-bold text-white">4,75%</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-mono">160 - 199 g/km</td>
                    <td className="py-4 px-4 font-bold text-white">9,75%</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-mono">200 g/km o más</td>
                    <td className="py-4 px-4 font-bold text-white">14,75%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};
