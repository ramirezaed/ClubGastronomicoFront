import { activate, changePlan, deacticate, getCompanyById } from "@/services/company.service";
import { Company } from "@/types/company.types";
import { useState } from "react";

export const useCompany = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanyId = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCompanyById(id);
      setCompany(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al obtener datos de la empresa");
    } finally {
      setLoading(false);
    }
  };

  const changePlanCompany = async (id: string, namePlan: string) => {
    setError(null);
    setLoading(true);
    try {
      const response = await changePlan(id, namePlan);
      setCompany(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al intentar cambiar el plan");
    } finally {
      setLoading(false);
    }
  };

  const activateCompany = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await activate(id);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al intentar activar la empresa");
    } finally {
      setLoading(false);
    }
  };
  const deacticateCompany = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deacticate(id);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al intentar desactivar la empresa");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    company,
    error,
    fetchCompanyId,
    changePlanCompany,
    activateCompany,
  };
};
