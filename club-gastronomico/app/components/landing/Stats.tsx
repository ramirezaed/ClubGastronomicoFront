// app/components/landing/Stats.tsx
export default function Stats() {
  const stats = [
    { number: "500+", label: "Locales activos" },
    { number: "50K+", label: "Pedidos/mes" },
    { number: "98%", label: "Satisfacción" },
    { number: "24/7", label: "Soporte" },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
