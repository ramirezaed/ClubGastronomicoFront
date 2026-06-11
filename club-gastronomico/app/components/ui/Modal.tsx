// components/ui/Modal.tsx
"use client";

import { CheckCircle, X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function Modal({ isOpen, onClose, title, message }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-300">
        <div className="relative p-6">
          {/* Botón cerrar */}
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
            <X size={20} />
          </button>

          {/* Icono de éxito */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          {/* Título */}
          <h2 className="text-xl font-bold text-center text-gray-800 mb-2">{title}</h2>

          {/* Mensaje */}
          <p className="text-center text-gray-600 mb-6">{message}</p>

          {/* Botón */}
          <button
            onClick={onClose}
            className="w-full bg-linear-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 cursor-pointer transition"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
