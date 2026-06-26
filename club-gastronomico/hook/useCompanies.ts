import { getAllCompany } from "@/services/company.service";
import { company, getCompaniesParams } from "@/types/company.types";
import { useCallback, useState } from "react";

export const useCompanies = () => {
  const [companies, setCompanies] = useState<company[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const fetchCompanies = useCallback(async (params?: getCompaniesParams, pageChange = false) => {
    if (pageChange) {
      setPageLoading(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const response = await getAllCompany(params);
      setCompanies(response.company.data);
      if (response.company.page) {
        setPagination({
          page: response.company.page,
          limit: response.company.limit || 10,
          total: response.company.total || 0,
          totalPages: response.company.totalPages || 1,
        });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error al cargar lista de empresas");
    } finally {
      if (pageChange) {
        setPageLoading(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  const goToPageCompanies = useCallback(
    (page: number, params?: getCompaniesParams) => {
      fetchCompanies({ ...params, page }, true);
    },
    [fetchCompanies],
  );

  return { companies, loading, pageLoading, error, pagination, goToPageCompanies, fetchCompanies };
};
