import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

import { loginRequest } from "@/services/auth.service";

function getTokenExpiration(accessToken: string): number {
  const payload = JSON.parse(Buffer.from(accessToken.split(".")[1], "base64").toString());

  return payload.exp * 1000;
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const { data } = await axios.post<{ accessToken: string }>(`${process.env.NEXT_PUBLIC_API_URL}/auth/refreshToken`, {
      refreshToken: token.refreshToken,
    });
    const expiration = getTokenExpiration(data.accessToken);
    return {
      ...token,
      accessToken: data.accessToken,
      accessTokenExpires: expiration,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const response = await loginRequest({
          email: credentials?.email ?? "",
          password: credentials?.password ?? "",
        });

        if (!response) {
          return null;
        }

        return {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          role_name: response.user.role_name,
          company_id: response.user.company_id,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const expiration = getTokenExpiration(user.accessToken);
        token.user = {
          id: user.id,
          email: user.email ?? "",
          name: user.name ?? "",
          role_name: user.role_name,
          company_id: user.company_id,
        };

        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = expiration;

        return token;
      }
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
      return await refreshAccessToken(token);
    },

    session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.error = token.error;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
