// "use client";

// import { useState, useEffect } from "react";
// import { Store } from "lucide-react";
// import Link from "next/link";

// interface NavbarProps {
//   scrollToSection: (id: string) => void;
// }

// export default function Navbar({ scrollToSection }: NavbarProps) {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`fixed top-0 w-full z-50 transition-all duration-300 ${
//         isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
//       }`}
//     >
//       <div className="container mx-auto px-6 flex justify-between items-center">
//         <div className="flex items-center space-x-2">
//           <div className="bg-orange-500 p-1.5 rounded-lg">
//             <Store className="w-6 h-6 text-white" />
//           </div>
//           <span className="text-2xl font-bold bg-linear-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
//             Club Gastronómico
//           </span>
//         </div>

//         <div className="hidden md:flex space-x-8 ">
//           {["Inicio", "Servicios", "Planes"].map((item) => (
//             <button
//               key={item}
//               onClick={() => scrollToSection(item === "Inicio" ? "hero" : item.toLowerCase())}
//               className="text-gray-700 hover:text-orange-500 transition-colors font-medium cursor-pointer"
//             >
//               {item}
//             </button>
//           ))}
//         </div>

//         <Link
//           href="/auth/register"
//           className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-md"
//         >
//           Comenzar Ahora
//         </Link>
//       </div>
//     </nav>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Store } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  scrollToSection: (id: string) => void;
}

export default function Navbar({ scrollToSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-2" : "bg-white/90 backdrop-blur-sm py-3"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center gap-2">
        {/* Logo */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <div className="bg-orange-500 p-1 rounded-lg">
            <Store className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold bg-linear-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent text-lg md:text-xl whitespace-nowrap">
            Club Gastronómico
          </span>
        </div>

        {/* Menú Desktop */}
        <div className="hidden md:flex space-x-6">
          {["Inicio", "Servicios", "Planes"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item === "Inicio" ? "hero" : item.toLowerCase())}
              className="text-gray-700 hover:text-orange-500 transition-colors font-medium cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Botón CTA */}
        <Link
          href="/auth/register"
          className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-4 py-1.5 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md text-sm whitespace-nowrap flex-shrink-0"
        >
          Comenzar
        </Link>
      </div>
    </nav>
  );
}
