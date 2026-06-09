"use client";

import { CheckCircle, Crown, Star } from "lucide-react";
import Link from "next/link";

export default function Planes() {
  return (
    <section id="planes" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Elige el plan perfecto para tu negocio</h2>
          <p className="text-xl text-gray-600">Sin sorpresas, sin costos ocultos</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Plan Free */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-orange-200 transition-all flex flex-col h-full">
            <div className="p-8 flex flex-col h-full">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">Plan Free</h3>
                <p className="text-gray-500 mt-2">Perfecto para empezar</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-gray-500">/mes</span>
              </div>
              <ul className="space-y-3 mb-8 grow">
                {["Toma de pedidos básica", "Gestión de pedidos", "Reportes básicos", "Soporte por email"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Plan Premiumbg-linear-to-br from-gray-900 via-gray-800 to-gray-900 */}
          <div className="bg-linear-to-br from-orange-700 via-orange-400 to-orange-700 rounded-2xl shadow-2xl overflow-hidden relative flex flex-col h-full">
            <div className="absolute top-4 right-4 bg-yellow-400 text-orange-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 z-10">
              <Star className="w-4 h-4" />
              Más popular
            </div>
            <div className="p-8 text-white flex flex-col h-full">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-2">
                  <Crown className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold">Plan Premium</h3>
                <p className="text-orange-100 mt-2">Para negocios en crecimiento</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-5xl font-bold">$49.000</span>
                <span className="text-orange-100">/mes</span>
              </div>
              <ul className="space-y-3 mb-8 grow">
                {[
                  "Toma de pedidos con IA",
                  // "Empleados ilimitados",
                  "Reportes Enfocados",
                  "Agente IA en Telegram",
                  "Soporte prioritario 24/7",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-white shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Botón centrado debajo */}
        <div className="flex justify-center">
          <Link
            href="/auth/register"
            className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-md inline-block text-center"
          >
            Comenzar Ahora
          </Link>
        </div>
      </div>
    </section>
  );
}
