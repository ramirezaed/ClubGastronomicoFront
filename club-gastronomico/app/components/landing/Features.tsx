// app/components/landing/Features.tsx
import { Menu, ClipboardList, Users, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Menu,
    title: "Menús Digitales",
    description: "Crea y actualiza menús fácilmente.",
  },
  {
    icon: ClipboardList,
    title: "Toma de Pedidos",
    description: "Sistema de pedidos intuitivo.",
  },
  {
    icon: Users,
    title: "Gestión de Empleados",
    description: "Crea cuentas para empleados. Define roles.",
  },

  {
    icon: BarChart3,
    title: "Reportes Avanzados",
    description: "Análisis detallados de ventas, productos más vendidos y métricas clave.",
  },
];

export default function Features() {
  return (
    <section id="servicios" className="py-20 bg-gray-50 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Todo lo que necesitas para <span className="text-orange-500">gestionar tu negocio</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Herramientas poderosas para optimizar cada aspecto de tu operación
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-5">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
