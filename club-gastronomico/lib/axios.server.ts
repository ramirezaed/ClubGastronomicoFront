import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.options";

export async function createServerApi() {
  const session = await getServerSession(authOptions);
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      ...(session?.accessToken && {
        Authorization: `Bearer ${session.accessToken}`,
      }),
    },
  });
}
