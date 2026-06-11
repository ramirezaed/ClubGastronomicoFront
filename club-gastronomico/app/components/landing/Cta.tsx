// app/components/landing/CTA.tsx
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 px-6 bg-linear-to-r from-gray-50 to-gray-100">
      <div className="container mx-auto text-center text-black">
        <h2 className="text-4xl font-bold mb-4">¿Listo para transformar tu negocio?</h2>
        <p className="text-xl mb-8 opacity-90">Únete a cientos de locales que ya confían en Club Gastronómico</p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 text-lg shadow-xl"
        >
          Comenzar ahora
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
