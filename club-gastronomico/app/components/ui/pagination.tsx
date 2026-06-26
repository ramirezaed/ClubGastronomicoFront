"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  className = "",
}: PaginationProps) {
  // Mostrar siempre si hay datos, aunque sea 1 página
  // Si totalPages es 0 o undefined, no mostrar
  if (!totalPages || totalPages === 0) return null;

  const handlePrev = () => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <button
        onClick={handlePrev}
        disabled={isLoading || currentPage <= 1}
        className="
          px-4 py-2 rounded-lg text-sm font-medium
          bg-white border border-gray-200
          text-gray-600
          hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600
          disabled:opacity-40 disabled:cursor-not-allowed
          disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600
          transition-all duration-200
          cursor-pointer
          flex items-center gap-1.5
        "
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </button>

      <span className="text-sm text-gray-500">
        <span className="font-medium text-gray-700">{currentPage}</span>
        <span className="text-gray-300 mx-1">/</span>
        <span className="font-medium text-gray-700">{totalPages}</span>
      </span>

      <button
        onClick={handleNext}
        disabled={isLoading || currentPage >= totalPages}
        className="
          px-4 py-2 rounded-lg text-sm font-medium
          bg-orange-500 text-white
          hover:bg-orange-600
          disabled:opacity-40 disabled:cursor-not-allowed
          disabled:hover:bg-orange-500
          transition-all duration-200
          cursor-pointer
          flex items-center gap-1.5
        "
      >
        Siguiente
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
