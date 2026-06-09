"use client";

import { Zap, TrendingUp, Smartphone } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  return (
    <section id="hero" className="pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            {/* Mismo contenido de texto que antes */}
            <div className="inline-flex items-center bg-orange-100 px-4 py-2 rounded-full mb-6">
              <Zap className="w-4 h-4 text-orange-600 mr-2" />
              <span className="text-orange-600 text-sm font-semibold">Gestión inteligente para tu negocio</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              La plataforma completa para{" "}
              <span className="bg-linear-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
                locales de comida
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Administra tu local, crea menús digitales, gestiona pedidos. Todo desde una sola plataforma.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth/register"
                className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 text-center shadow-lg"
              >
                Prueba gratis
              </Link>
              <button
                onClick={() => scrollToSection("planes")}
                className="bg-linear-to-r from-gray-50 to-gray-50 text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 cursor-pointer transition-all transform hover:scale-105 text-center shadow-lg"
              >
                Ver Planes
              </button>
            </div>
          </div>

          <div className="relative flex justify-center">
            {/* Mockup de teléfono */}
            <div className="relative w-72 h-125 bg-gray-900 rounded-3xl shadow-2xl p-3">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl"></div>
              <div className="bg-white rounded-2xl h-full overflow-hidden">
                <div className="bg-orange-500 p-3">
                  <p className="text-white text-sm font-bold">Club Gastronómico</p>
                </div>
                <div className="p-3 space-y-3">
                  <div className="bg-gray-100 rounded-lg p-2">
                    <p className="text-xs font-bold">🍕 Pizza Muzzarella</p>
                    <p className="text-xs text-gray-500">$11.500</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-2">
                    <p className="text-xs font-bold">🍔 Hamburgesa</p>
                    <p className="text-xs text-gray-500">$8.500</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-2">
                    <p className="text-xs font-bold">🥤 Gaseosa</p>
                    <p className="text-xs text-gray-500">$5.000</p>
                  </div>
                  <div className="bg-orange-100 rounded-lg p-2 mt-4">
                    <p className="text-xs font-bold text-orange-600">Total: $25.000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge flotante */}
            <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-lg">+245%</p>
                  <p className="text-xs text-gray-500">Crecimiento en ventas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
