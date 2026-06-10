import { AuthResponse } from "@/types/auth.types";

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
