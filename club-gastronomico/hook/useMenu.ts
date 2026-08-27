// hook/useMenu.ts
import { getMenu } from "@/services/menu.service";
import { getItemsParams, Menu } from "@/types/menu.types";
import { useCallback, useState } from "react";

export const useMenu = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [menu, setMenu] = useState<Menu[]>([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const fetchMenu = useCallback(async (params?: getItemsParams, pageChange = false) => {
    if (pageChange) {
      setPageLoading(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const response = await getMenu(params);
      setMenu(response.items.data);

      if (response) {
        setPagination({
          page: response.items.page || 1,
          limit: response.items.limit || 10,
          total: response.items.total || 0,
          totalPages: response.items.totalPages || 1,
        });
      }

      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error al obtener el menú");
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  }, []);

  const goToPage = useCallback(
    (page: number, params?: getItemsParams) => {
      fetchMenu({ ...params, page }, true);
    },
    [fetchMenu],
  );

  return {
    error,
    loading,
    menu,
    pageLoading,
    pagination,
    fetchMenu,
    goToPage,
  };
};
