import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Info, Gauge, Calendar, Euro, AlertTriangle, ArrowRight } from 'lucide-react';

export const CalculadoraImpuestos = () => {
  const [precio, setPrecio] = useState<number>(45000);
  const [emisiones, setEmisiones] = useState<number>(155);
  const [meses, setMeses] = useState<number>(12); // Usamos meses para mayor precisión
  const [resultado, setResultado] = useState({ matriculacion: 0, total: 0, tramo: 0 });

  useEffect(() => {
    // 1. Determinar tramo de Matriculación (Base 2026)
    let tramo = 0;
    if (emisiones <= 120) tramo = 0;
    else if (emisiones <= 159) tramo = 4.75;
    else if (emisiones <= 199) tramo = 9.75;
    else tramo = 14.75;

    // 2. Tabla de Depreciación Oficial BOE
    let porcentajeDepreciacion = 1;
    if (meses <= 12) porcentajeDepreciacion = 1;
    else if (meses <= 24) porcentajeDepreciacion = 0.84;
    else if (meses <= 36) porcentajeDepreciacion = 0.67;
    else if (meses <= 48) porcentajeDepreciacion = 0.56;
    else if (meses <= 60) porcentajeDepreciacion = 0.47;
    else if (meses <= 72) porcentajeDepreciacion = 0.39;
    else porcentajeDepreciacion = 0.30; // Simplificado para coches de +6 años

    const baseImponible = precio * porcentajeDepreciacion;
    const impuestoMatriculacion = baseImponible * (tramo / 100);

    setResultado({
      matriculacion: impuestoMatriculacion,
      total: impuestoMatriculacion, // Aquí podrías sumar honorarios si quisieras
      tramo: tramo
    });
  }, [precio, emisiones, meses]);

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO 
        title="Calculadora Impuesto Matriculación 2026 | Premium German Cars"
        description="Calcula el coste exacto de importar tu coche desde Alemania con las tablas de depreciación del BOE actualizadas a 2026."
      />
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
              Calculadora <span className="text-gold-400 italic">Oficial</span>
            </h1>
            <p className="text-gray-400 text-lg">Ajustada a las tablas de depreciación del BOE y tramos de CO2 2026.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* PANEL DE CONTROL */}
            <div className="lg:col-span-7 space-y-8 bg-metallic-900/50 p-8 rounded-3xl border border-white/5">
              
              {/* INPUT PRECIO */}
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-gold-400 flex items-center gap-2">
                    <Euro size={14}/> Valor de Mercado / Tablas BOE
                  </label>
                  <span className="font-mono text-xl text-white">{precio.toLocaleString()} €</span>
                </div>
                <input 
                  type="range" min="5000" max="200000" step="1000"
                  value={precio} onChange={(e) => setPrecio(Number(e.target.value))}
                  className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-gold-500"
                />
              </div>

              {/* INPUT EMISIONES */}
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-gold-400 flex items-center gap-2">
                    <Gauge size={14}/> Emisiones CO2 (WLTP)
                  </label>
                  <span className="font-mono text-xl text-white">{emisiones} g/km</span>
                </div>
                <input 
                  type="range" min="0" max="400" step="1"
                  value={emisiones} onChange={(e) => setEmisiones(Number(e.target.value))}
                  className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-gold-500"
                />
                <div className="flex gap-2 mt-3">
                  {[95, 120, 155, 195, 250].map(val => (
                    <button key={val} onClick={() => setEmisiones(val)} className="text-[10px] bg-white/5 px-2 py-1 rounded hover:bg-gold-400/20">
                      {val}g
                    </button>
                  ))}
                </div>
              </div>

              {/* INPUT ANTIGÜEDAD */}
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-gold-400 flex items-center gap-2">
                    <Calendar size={14}/> Antigüedad del vehículo
                  </label>
                  <span className="font-mono text-xl text-white">
                    {meses < 12 ? `${meses} meses` : `${(meses/12).toFixed(1)} años`}
                  </span>
                </div>
                <input 
                  type="range" min="1" max="120" step="1"
                  value={meses} onChange={(e) => setMeses(Number(e.target.value))}
                  className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-gold-500"
                />
                <p className="text-[10px] text-gray-500 mt-2 uppercase">A mayor antigüedad, menor base imponible (Tablas BOE)</p>
              </div>
            </div>

            {/* RESULTADO RESUMEN */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gold-500 p-1 text-black rounded-3xl">
                <div className="bg-black rounded-[calc(1.5rem-1px)] p-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Resultado Estimado</h3>
                  
                  <div className="mb-6">
                    <span className="text-xs text-gray-500 block mb-1 uppercase">Impuesto de Matriculación ({resultado.tramo}%)</span>
                    <span className="text-5xl font-serif font-bold text-white">
                      {resultado.matriculacion.toLocaleString(undefined, { maximumFractionDigits: 0 })}€
                    </span>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Tramo de Emisiones:</span>
                      <span className="text-gold-400 font-bold">{resultado.tramo}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Reducción por años:</span>
                      <span className="text-white">-{((1 - (resultado.matriculacion/(precio*(resultado.tramo/100))))*100).toFixed(0)}%</span>
                    </div>
                  </div>

                  <a 
                    href={`https://wa.me/34603743608?text=Hola! He calculado el impuesto para un coche de ${emisiones}g/km con un valor de ${precio}€ y me sale un total de ${resultado.matriculacion.toFixed(0)}€. ¿Podéis verificar si es correcto?`}
                    className="mt-8 flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gold-400 transition-all uppercase text-xs tracking-widest"
                  >
                    Confirmar con Premium German Cars <ArrowRight size={16}/>
                  </a>
                </div>
              </div>

              <div className="bg-red-900/10 border border-red-900/20 p-6 rounded-2xl flex gap-4">
                <AlertTriangle className="text-red-500 shrink-0" size={20} />
                <p className="text-xs text-gray-400 leading-relaxed">
                  <strong>Aviso para clientes en Cataluña:</strong> Además de este impuesto, los vehículos que emitan más de 95g/km están sujetos al <strong>Impuesto sobre las Emisiones de CO2</strong> (anual). Consúltanos para el cálculo exacto.
                </p>
              </div>
            </div>
          </div>

          {/* EXPLICACIÓN TÉCNICA SEO */}
          <footer className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-gray-400 text-sm border-t border-white/5 pt-12">
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-tighter">¿Cómo calculamos esto?</h4>
              <p>Aplicamos el porcentaje del impuesto sobre el valor neto del coche una vez aplicada la depreciación por meses de uso que marca el BOE para 2026.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-tighter">¿Qué es el valor de Tablas?</h4>
              <p>Es el valor que Hacienda asigna a cada modelo. Si el precio de compra es superior, se suele usar el de tablas; si es inferior, Hacienda podría reclamar la diferencia.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-tighter">Precisión WLTP</h4>
              <p>Asegúrate de mirar la cifra de emisiones combinadas WLTP en la ficha técnica alemana (Teil I), ya que es la que determina el tramo impositivo en España.</p>
            </div>
          </footer>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};
