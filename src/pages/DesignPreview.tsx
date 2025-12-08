import { Minus, Plus, MapPin, Calendar, Users, Luggage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DesignPreview() {
  const [passengersBefore, setPassengersBefore] = useState(2);
  const [passengersAfter, setPassengersAfter] = useState(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-display text-primary mb-2 text-center">
          🎨 Design Preview - Paris Elite Services
        </h1>
        <p className="text-center text-slate-600 mb-12">
          Comparación lado a lado: Antes vs. Después
        </p>

        {/* 1. HERO OVERLAY */}
        <section className="mb-16">
          <h2 className="text-2xl font-display text-primary mb-6">1. Hero Overlay</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* ANTES */}
            <div>
              <p className="text-sm font-semibold text-red-600 mb-3">❌ ANTES (Plano)</p>
              <div className="relative h-64 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80" 
                  alt="Paris" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <p className="text-white text-xl font-display">Overlay plano sin profundidad</p>
                </div>
              </div>
            </div>

            {/* DESPUÉS */}
            <div>
              <p className="text-sm font-semibold text-green-600 mb-3">✅ DESPUÉS (Gradiente)</p>
              <div className="relative h-64 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80" 
                  alt="Paris" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-black/60 to-primary-dark/80 flex items-center justify-center">
                  <p className="text-white text-xl font-display">Gradiente con profundidad</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. FORMULARIO SOMBRA */}
        <section className="mb-16">
          <h2 className="text-2xl font-display text-primary mb-6">2. Sombra del Formulario</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* ANTES */}
            <div>
              <p className="text-sm font-semibold text-red-600 mb-3">❌ ANTES (Sombra débil)</p>
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-xl font-display text-primary mb-4">Book Your Journey</h3>
                <p className="text-slate-600">Sombra casi imperceptible</p>
              </div>
            </div>

            {/* DESPUÉS */}
            <div>
              <p className="text-sm font-semibold text-green-600 mb-3">✅ DESPUÉS (Sombra dramática)</p>
              <div className="bg-white rounded-3xl shadow-2xl ring-1 ring-primary/10 hover:shadow-[0_25px_50px_-12px_rgba(11,37,69,0.25)] transition-shadow duration-300 p-8">
                <h3 className="text-xl font-display text-primary mb-4">Book Your Journey</h3>
                <p className="text-slate-600">Sombra pronunciada + ring + hover effect</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. INPUTS */}
        <section className="mb-16">
          <h2 className="text-2xl font-display text-primary mb-6">3. Input Fields</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* ANTES */}
            <div>
              <p className="text-sm font-semibold text-red-600 mb-3">❌ ANTES (Sin hover)</p>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <label className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                  <MapPin className="h-3.5 w-3.5" />
                  Pickup Location
                </label>
                <input 
                  type="text" 
                  placeholder="Enter pickup location"
                  className="w-full h-9 px-3 text-sm border border-slate-300 rounded-md"
                />
              </div>
            </div>

            {/* DESPUÉS */}
            <div>
              <p className="text-sm font-semibold text-green-600 mb-3">✅ DESPUÉS (Con hover + focus)</p>
              <div className="bg-white rounded-xl p-6 shadow-lg group">
                <label className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                  <MapPin className="h-4 w-4 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5" />
                  Pickup Location
                </label>
                <input 
                  type="text" 
                  placeholder="CDG Terminal 1, 2, 3 or Paris address"
                  className="w-full h-10 px-3 text-sm border-2 border-metallic/30 rounded-md
                           hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20
                           transition-all duration-200 outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. CONTADORES */}
        <section className="mb-16">
          <h2 className="text-2xl font-display text-primary mb-6">4. Passenger Counter</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* ANTES */}
            <div>
              <p className="text-sm font-semibold text-red-600 mb-3">❌ ANTES (Botones rectangulares)</p>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <label className="flex items-center gap-2 text-sm font-medium text-primary mb-3">
                  <Users className="h-4 w-4" />
                  Passengers
                </label>
                <div className="flex items-center justify-center gap-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setPassengersBefore(Math.max(1, passengersBefore - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold min-w-[3rem] text-center">{passengersBefore}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setPassengersAfter(Math.min(8, passengersAfter + 1))}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* DESPUÉS */}
            <div>
              <p className="text-sm font-semibold text-green-600 mb-3">✅ DESPUÉS (Botones circulares dorados)</p>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <label className="flex items-center gap-2 text-sm font-medium text-primary mb-3">
                  <Users className="h-4 w-4" />
                  Passengers
                </label>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setPassengersAfter(Math.max(1, passengersAfter - 1))}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary to-secondary-dark
                             text-white shadow-md hover:shadow-lg hover:scale-110
                             transition-all duration-200 flex items-center justify-center group"
                  >
                    <Minus className="h-4 w-4 group-hover:scale-90 transition-transform" />
                  </button>
                  <span className="text-xl font-display font-semibold text-primary min-w-[3rem] text-center">
                    {passengersAfter}
                  </span>
                  <button
                    onClick={() => setPassengersAfter(Math.min(8, passengersAfter + 1))}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary to-secondary-dark
                             text-white shadow-md hover:shadow-lg hover:scale-110
                             transition-all duration-200 flex items-center justify-center group"
                  >
                    <Plus className="h-4 w-4 group-hover:scale-90 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

