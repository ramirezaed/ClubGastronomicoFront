"use client";

import { Store, Mail, Phone, MapPin, ArrowUp, Clock } from "lucide-react";

export default function Footer() {
  // función para volver arriba
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear(); // el año se actualiza solo

  return (
    <footer className="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Efecto decorativo superior */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-orange-600 to-transparent"></div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Todo centrado */}
        <div className="flex flex-col items-center text-center">
          {/* Club Gastronomico - Centrado */}
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Store className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Club Gastronómico
            </h2>
          </div>

          {/* Descripción debajo */}
          <p className="text-gray-300 text-sm leading-relaxed max-w-2xl mx-auto mb-12">
            Solución integral para la gestión de locales de comida. Optimiza tus operaciones, controla inventarios y aumenta tus
            ventas con nuestra plataforma inteligente.
          </p>

          {/* Título Contacto */}
          <h3 className="text-lg font-semibold text-orange-400 relative inline-block mb-6">
            Contacto
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-orange-500 rounded-full"></div>
          </h3>

          {/* Datos de contacto - uno al lado del otro */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12">
            <div className="flex items-center gap-2 group">
              <MapPin className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
              <span className="text-gray-300 text-sm">Corrientes, Argentina</span>
            </div>
            <div className="flex items-center gap-2 group">
              <Phone className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
              <span className="text-gray-300 text-sm">+54 379 4768775 </span>
              <span className="text-gray-300 text-sm"> +54 379 5001461</span>
            </div>
            {/* <div className="flex items-center gap-2 group">
              <Mail className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
              <span className="text-gray-300 text-sm">contacto@clubgastronomico.com</span>
            </div> */}
            <div className="flex items-center gap-2 group">
              <Clock className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
              <span className="text-gray-300 text-sm">Lun - Vie: 9:00 - 18:00</span>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-400">
          <div>&copy; {currentYear} Club Gastronómico. Todos los derechos reservados.</div>
        </div>
      </div>

      {/* Botón para volver arriba */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-orange-500 p-3 rounded-full shadow-lg
         hover:bg-orange-600 transition-all duration-300 hover:scale-110 group z-50 cursor-pointer"
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
      </button>
    </footer>
  );
}
