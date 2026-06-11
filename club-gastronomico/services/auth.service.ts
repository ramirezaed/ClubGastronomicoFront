import { AuthResponse, IRegisterUserResponse, IRegisterUser } from "@/types/auth.types";
import axios from "axios";
export const loginRequest = async (credentials: { email: string; password: string }): Promise<AuthResponse | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
      return null;
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role_name: data.user.role_name,
        company_id: data.user.company_id,
      },
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  } catch {
    return null;
  }
};

export async function registerUser(data: IRegisterUser): Promise<IRegisterUserResponse> {
  try {
    const response = await axios.post<IRegisterUserResponse>(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message ?? "error al registrar usuario");
    }
  }
  throw new Error("Error inesperado");
}
