// "use client";

// import { ChevronLeft, ChevronRight } from "lucide-react";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
//   isLoading?: boolean;
//   className?: string;
// }

// export default function Pagination({
//   currentPage,
//   totalPages,
//   onPageChange,
//   isLoading = false,
//   className = "",
// }: PaginationProps) {
//   if (!totalPages || totalPages === 0) return null;

//   const handlePrev = () => {
//     if (currentPage > 1 && !isLoading) {
//       onPageChange(currentPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages && !isLoading) {
//       onPageChange(currentPage + 1);
//     }
//   };

//   // Generar array de números de página para mostrar
//   const getPageNumbers = () => {
//     const pages: (number | string)[] = [];
//     const maxVisible = 5; // Número máximo de páginas visibles
//     const halfVisible = Math.floor(maxVisible / 2);

//     if (totalPages <= maxVisible) {
//       // Si hay pocas páginas, mostrar todas
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       // Siempre mostrar primera página
//       pages.push(1);

//       let startPage = Math.max(2, currentPage - halfVisible);
//       let endPage = Math.min(totalPages - 1, currentPage + halfVisible);

//       // Ajustar si estamos cerca del inicio
//       if (currentPage <= halfVisible + 1) {
//         endPage = maxVisible;
//       }

//       // Ajustar si estamos cerca del final
//       if (currentPage >= totalPages - halfVisible) {
//         startPage = totalPages - maxVisible + 1;
//       }

//       // Agregar elipsis si es necesario
//       if (startPage > 2) {
//         pages.push("...");
//       }

//       // Agregar páginas del rango
//       for (let i = startPage; i <= endPage; i++) {
//         if (i > 1 && i < totalPages) {
//           pages.push(i);
//         }
//       }

//       // Agregar elipsis si es necesario
//       if (endPage < totalPages - 1) {
//         pages.push("...");
//       }

//       // Siempre mostrar última página
//       pages.push(totalPages);
//     }

//     return pages;
//   };

//   const pageNumbers = getPageNumbers();

//   return (
//     <div className={`flex items-center justify-center gap-2 ${className}`}>
//       <button
//         onClick={handlePrev}
//         disabled={isLoading || currentPage <= 1}
//         className="
//           px-3 py-2 rounded-lg text-sm font-medium
//           bg-white border border-gray-200
//           text-gray-600
//            hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600
//           disabled:opacity-40 disabled:cursor-not-allowed
//           disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600
//           transition-all duration-200
//           cursor-pointer
//           flex items-center gap-1.5
//         "
//       >
//         <ChevronLeft className="w-4 h-4" />
//         Anterior
//       </button>

//       <div className="flex items-center gap-1">
//         {pageNumbers.map((page, index) => {
//           if (page === "...") {
//             return (
//               <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm text-gray-400">
//                 …
//               </span>
//             );
//           }

//           const pageNum = page as number;
//           const isActive = pageNum === currentPage;

//           return (
//             <button
//               key={pageNum}
//               onClick={() => !isLoading && onPageChange(pageNum)}
//               disabled={isLoading}
//               className={`
//                 px-3 py-2 rounded-lg text-sm font-medium
//                 transition-all duration-200
//                 ${
//                   isActive
//                     ? "bg-orange-500 text-white hover:bg-orange-600"
//                     : "bg-white border border-gray-200 text-gray-600 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600"
//                 }
//                 disabled:opacity-40 disabled:cursor-not-allowed
//                 cursor-pointer
//                 min-w-9
//               `}
//             >
//               {pageNum}
//             </button>
//           );
//         })}
//       </div>

//       <button
//         onClick={handleNext}
//         disabled={isLoading || currentPage >= totalPages}
//         className="
//           px-3 py-2 rounded-lg text-sm font-medium
//           bg-orange-500 text-white
//           hover:bg-orange-600
//           disabled:opacity-40 disabled:cursor-not-allowed
//           disabled:hover:bg-orange-500
//           transition-all duration-200
//           cursor-pointer
//           flex items-center gap-1.5
//         "
//       >
//         Siguiente
//         <ChevronRight className="w-4 h-4" />
//       </button>
//     </div>
//   );
// }

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

  // Generar array de números de página para mostrar
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    const halfVisible = Math.floor(maxVisible / 2);

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - halfVisible);
      let endPage = Math.min(totalPages - 1, currentPage + halfVisible);

      if (currentPage <= halfVisible + 1) {
        endPage = maxVisible;
      }

      if (currentPage >= totalPages - halfVisible) {
        startPage = totalPages - maxVisible + 1;
      }

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <button
        onClick={handlePrev}
        disabled={isLoading || currentPage <= 1}
        className="
          px-3 py-2 rounded-lg text-sm font-medium
          bg-white border border-gray-300
          text-gray-700
          hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900
          disabled:opacity-40 disabled:cursor-not-allowed
          disabled:hover:bg-white disabled:hover:border-gray-300 disabled:hover:text-gray-700
          transition-all duration-200
          cursor-pointer
          flex items-center gap-1.5
        "
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </button>

      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm text-gray-400">
                …
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => !isLoading && onPageChange(pageNum)}
              disabled={isLoading}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium
                transition-all duration-200
                ${
                  isActive
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900"
                }
                disabled:opacity-40 disabled:cursor-not-allowed
                cursor-pointer
                min-w-9
              `}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={isLoading || currentPage >= totalPages}
        className="
          px-3 py-2 rounded-lg text-sm font-medium
          bg-white border border-gray-300
          text-gray-700
          hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900
          disabled:opacity-40 disabled:cursor-not-allowed
          disabled:hover:bg-white disabled:hover:border-gray-300 disabled:hover:text-gray-700
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
