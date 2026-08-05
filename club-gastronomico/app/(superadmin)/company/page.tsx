"use client";
import { ErrorState } from "@/app/components/ui/errorState";
import { LoadingState } from "@/app/components/ui/loandigstate";
import { useCompanies } from "@/hook/useCompanies";
import { Building2, CheckCircle, Eye, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "@/app/components/ui/pagination";
import { getCompaniesParams } from "@/types/company.types";

export default function CompanyPage() {
  const { companies, loading, pageLoading, error, pagination, goToPageCompanies, fetchCompanies, search } =
    useCompanies();

  //seteo el parametro de busqueda searchTrem, por defecto ""
  const [searchTerm, setSearchTerm] = useState("");
  //fncion para obtener la lista de empresas cuando renderiza la pagina
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // Buscador
  useEffect(() => {
    if (searchTerm.trim() === "") return;

    const timer = setTimeout(() => {
      search(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [search, searchTerm]);

  // Si el buscador queda vacío, vuelve a cargar la lista
  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchCompanies();
    }
  }, [fetchCompanies, searchTerm]);

  if (loading) {
    return <LoadingState title="Cargando lista de empresas" description="Espere un momento por favor" />;
  }
  if (error) {
    return <ErrorState title={error} subtitle="Por favor intentelo mas tarde" onRetry={() => fetchCompanies} />;
  }

  return (
    <div className="h-full flex flex-col bg-linear-to-r from-orange-100 via-orange-50 to-orange-100">
      <div className="shrink-0 p-3.5 pb-4">
        <div className="flex items-end justify-between">
          {/* Título */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 shadow-lg flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-[Poppins] font-extrabold text-gray-800">Empresas</h1>
              <p className="text-gray-500 text-sm">Gestiona las empresas del sistema</p>
            </div>
          </div>

          {/* Buscador */}
          <div className="w-full max-w-sm">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Buscar</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nombre de la empresa"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Sección de Tabla (Scrollable) */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {/* Encabezado con fondo naranja */}
              <tr className="bg-linear-to-r from-orange-200 via-orange-200 to-orange-200 text-sm font-semibold text-gray-700 sticky top-0 z-10">
                <th className="py-3.5 px-6">Nombre</th>
                <th className="py-3.5 px-6">Direccion</th>
                <th className="py-3.5 px-6">Plan</th>
                <th className="py-3.5 px-6">Propietario</th>
                <th className="py-3.5 px-6">Estado</th>
                <th className="py-3.5 px-6 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {companies.map((company) => (
                <tr
                  key={company.id}
                  className="bg-white odd:bg-orange-50/60 hover:bg-orange-100/80 transition-colors duration-150 cursor-pointer"
                >
                  {/* Nombre de la Empresa */}
                  <td className="py-3.5 px-6">
                    <span className="font-medium text-gray-800">{company.name}</span>
                  </td>

                  {/* Teléfono */}
                  <td className="py-3.5 px-6 text-sm text-gray-600">{company.phone || "—"}</td>

                  {/* Plan de Suscripción */}
                  <td className="py-3.5 px-6">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                      {company.subscription_plan?.name || "Sin plan"}
                    </span>
                  </td>

                  {/* Propietario */}
                  <td className="py-3.5 px-6 text-sm text-gray-600">{company.owner?.email || "—"}</td>

                  {/* Estado */}
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-2">
                      {company.is_active ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-green-600">Activo</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium text-red-600">Inactivo</span>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Acciones */}
                  <td className="py-3.5 px-6 text-right">
                    <Link
                      href={`/company/${company.id}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-lg shadow-xs hover:scale-[1.02] transition-all duration-200"
                    >
                      <Eye className="w-4 h-4" />
                      Ver detalle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Estado vacío */}
          {companies.length === 0 && (
            <div className="text-center py-16 bg-white">
              <p className="text-sm text-gray-400">No se encontraron empresas en el sistema.</p>
            </div>
          )}
        </div>
      </div>
      {companies.length > 0 && (
        <div className="shrink-0 flex flex-col sm:flex-row items-center justify-center gap-10 px-6 py-5.5 ">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={(page) => {
              const params: getCompaniesParams = {};
              goToPageCompanies(page, params);
            }}
            isLoading={pageLoading}
          />
        </div>
      )}
    </div>
  );
}
