import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Gauge, Calendar, Euro, AlertTriangle, ArrowRight } from 'lucide-react';

export const CalculadoraImpuestos = () => {
  const [precio, setPrecio] = useState<number>(45000);
  const [emisiones, setEmisiones] = useState<number>(155);
  const [meses, setMeses] = useState<number>(12);
  const [resultado, setResultado] = useState({ matriculacion: 0, tramo: 0 });

  useEffect(() => {
    // 1. Determinar tramo
    let tramo = 0;
    if (emisiones <= 120) tramo = 0;
    else if (emisiones <= 159) tramo = 4.75;
    else if (emisiones <= 199) tramo = 9.75;
    else tramo = 14.75;

    // 2. Tabla de Depreciación
    let coef = 1;
    if (meses <= 12) coef = 1;
    else if (meses <= 24) coef = 0.84;
    else if (meses <= 36) coef = 0.67;
    else if (meses <= 48) coef = 0.56;
    else if (meses <= 60) coef = 0.47;
    else if (meses <= 72) coef = 0.39;
    else coef = 0.30;

    const baseImponible = precio * coef;
    const impuesto = baseImponible * (tramo / 100);

    setResultado({
      matriculacion: impuesto,
      tramo: tramo
    });
  }, [precio, emisiones, meses]);

  // Función de seguridad para calcular el porcentaje de reducción sin romper la web
  const getReduccionText = () => {
    if (resultado.tramo === 0) return "0%";
    const baseTeorica = precio * (resultado.tramo / 100);
    if (baseTeorica === 0) return "0%";
    const red = ((1 - (resultado.matriculacion / baseTeorica)) * 100).toFixed(0);
    return `-${red}%`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO 
        title="Calculadora Impuesto Matriculación 2026 | Premium German Cars"
        description="Calcula el coste de importar tu coche desde Alemania con datos reales del BOE."
      />
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
              Calculadora <span className="text-gold-400 italic">Oficial</span>
            </h1>
            <p className="text-gray-400 text-lg">Ajustada a tramos de CO2 2026 y depreciación BOE.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-12 bg-metallic-900/50 p-8 rounded-3xl border border-white/5">
              
              {/* PRECIO */}
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-xs font-bold uppercase text-gold-400 flex items-center gap-2">
                    <Euro size={14}/> Valor del Vehículo
                  </label>
                  <span className="font-mono text-xl text-white">{precio.toLocaleString()} €</span>
                </div>
                <input 
                  type="range" min="5000" max="150000" step="1000"
                  value={precio} onChange={(e) => setPrecio(Number(e.target.value))}
                  className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-gold-500"
                />
              </div>

              {/* EMISIONES */}
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-xs font-bold uppercase text-gold-400 flex items-center gap-2">
                    <Gauge size={14}/> Emisiones CO2: {emisiones} g/km
                  </label>
                </div>
                <input 
                  type="range" min="0" max="350" step="1"
                  value={emisiones} onChange={(e) => setEmisiones(Number(e.target.value))}
                  className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-gold-500"
                />
              </div>

              {/* MESES */}
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-xs font-bold uppercase text-gold-400 flex items-center gap-2">
                    <Calendar size={14}/> Antigüedad: {meses} meses
                  </label>
                </div>
                <input 
                  type="range" min="1" max="120" step="1"
                  value={meses} onChange={(e) => setMeses(Number(e.target.value))}
                  className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-gold-500"
                />
              </div>
            </div>

            {/* RESULTADO */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gold-500 p-1 rounded-3xl">
                <div className="bg-black rounded-[calc(1.5rem-1.5px)] p-8">
                  <span className="text-xs text-gray-500 uppercase block mb-2">Impuesto Estimado</span>
                  <div className="text-5xl font-serif font-bold text-white mb-6">
                    {Math.round(resultado.matriculacion).toLocaleString()}€
                  </div>

                  <div className="space-y-3 pt-6 border-t border-white/10 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tramo Emisiones:</span>
                      <span className="text-gold-400 font-bold">{resultado.tramo}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Reducción BOE:</span>
                      <span className="text-white">{getReduccionText()}</span>
                    </div>
                  </div>

                  <a 
                    href={`https://wa.me/34603743608?text=Hola! He calculado el impuesto para un coche de ${emisiones}g/km y sale ${Math.round(resultado.matriculacion)}€. ¿Es correcto?`}
                    target="_blank" rel="noopener noreferrer"
                    className="mt-8 flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gold-400 transition-all uppercase text-xs tracking-widest"
                  >
                    Consultar experto <ArrowRight size={16}/>
                  </a>
                </div>
              </div>
              
              <div className="bg-red-900/10 border border-red-900/20 p-6 rounded-2xl flex gap-4">
                <AlertTriangle className="text-red-500 shrink-0" size={20} />
                <p className="text-[10px] text-gray-400 leading-tight">
                  Aviso: Clientes en Cataluña sujetos a impuesto anual de CO2 adicional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};
