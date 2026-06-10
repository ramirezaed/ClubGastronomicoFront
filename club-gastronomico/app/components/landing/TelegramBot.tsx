import { Bot, CheckCircle } from "lucide-react";

export default function TelegramBot() {
  return (
    <section className="relative py-20  bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6">
      {/* Efecto decorativo superior */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-orange-600 to-transparent"></div>

      {/* Efecto decorativo inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-orange-600 to-transparent"></div>

      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center bg-orange-500/20 px-4 py-2 rounded-full mb-6">
              <Bot className="w-5 h-5 text-orange-400 mr-2" />
              <span className="text-orange-400 font-semibold">Innovación en IA</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Tu asistente IA en Telegram</h2>
            <p className="text-xl text-gray-300 mb-6">Un empleado virtual disponible 24/7 para tomar pedidos.</p>
            <ul className="space-y-3 mb-8">
              {[
                "Toma pedidos automáticamente",
                "Responde preguntas frecuentes",
                "Recomienda productos",
                "Integración total con tu sistema",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="bg-gray-700 rounded-3xl p-4 shadow-2xl">
              <div className="bg-white rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">ClubGastronomicoBot</p>
                    <p className="text-xs text-gray-500">online</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-sm text-gray-800">🍕 Hola! ¿Qué te gustaría pedir hoy?</p>
                  </div>
                  <div className="bg-orange-100 rounded-lg p-3 ml-auto max-w-[80%]">
                    <p className="text-sm text-gray-800">Quiero 2 pizzas muzzarella</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-sm text-gray-800">✅ Perfecto! Son $20.000. ¿Confirmas el pedido?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
