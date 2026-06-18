import api from "@/lib/axios";
import { Plans } from "@/types/plans.types";

export async function getPlans(): Promise<Plans[]> {
  try {
    const response = await api.get(`/plans`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocurrio un error al buscar los planes");
  }
}
