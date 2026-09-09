// "use client";

// import { AlertTriangle } from "lucide-react";
// import { AuthBackground } from "@/app/components/auth/authBackground";
// import { AuthCard } from "@/app/components/auth/authcard";

// interface ErrorStateProps {
//   title: string;
//   subtitle?: string;
//   message?: string;
//   description?: string;
//   retryText?: string;
//   onRetry?: () => void;
// }

// export function ErrorState({
//   title,
//   subtitle,
//   message,
//   description,
//   retryText = "Reintentar",
//   onRetry,
// }: ErrorStateProps) {
//   return (
//     <AuthBackground>
//       <AuthCard icon={AlertTriangle} title={title} subtitle={subtitle}>
//         <div className="space-y-6 text-center">
//           {(message || description) && (
//             <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
//               {message && <p className="text-red-600 font-medium">{message}</p>}

//               {description && <p className="text-sm text-gray-500 mt-2">{description}</p>}
//             </div>
//           )}

//           {onRetry && (
//             <button
//               onClick={onRetry}
//               className="
//                 w-full
//                 bg-linear-to-r
//                 from-orange-500
//                 to-orange-600
//                 text-white
//                 py-2.5
//                 rounded-xl
//                 font-semibold
//                 hover:from-orange-600
//                 hover:to-orange-700
//                 transition
//                 transform
//                 hover:scale-[1.02]
//                 shadow-md
//                 cursor-pointer
//               "
//             >
//               {retryText}
//             </button>
//           )}
//         </div>
//       </AuthCard>
//     </AuthBackground>
//   );
// }

"use client";

import { AlertTriangle } from "lucide-react";
import { AuthBackground } from "@/app/components/auth/authBackground";
import { AuthCard } from "@/app/components/auth/authcard";

interface ErrorStateProps {
  title: string;
  subtitle?: string;
  message?: string;
  description?: string;
  retryText?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title,
  subtitle,
  message,
  description,
  retryText = "Reintentar",
  onRetry,
}: ErrorStateProps) {
  return (
    <AuthBackground>
      <AuthCard icon={AlertTriangle} title={title} subtitle={subtitle}>
        <div className="space-y-6 text-center">
          {(message || description) && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              {message && <p className="text-amber-800 font-medium">{message}</p>}

              {description && <p className="text-sm text-amber-700/70 mt-2">{description}</p>}
            </div>
          )}

          {onRetry && (
            <button
              onClick={onRetry}
              className="
                w-full
                bg-gray-900
                text-white
                py-3
                rounded-2xl
                font-semibold
                hover:bg-gray-800
                transition-all
                duration-200
                transform
                hover:scale-[1.02]
                hover:shadow-lg
                cursor-pointer
                text-sm
                tracking-wide
              "
            >
              {retryText}
            </button>
          )}
        </div>
      </AuthCard>
    </AuthBackground>
  );
}
