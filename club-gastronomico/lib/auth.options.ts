import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginRequest } from "@/services/auth.service";

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
    jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email ?? "",
          name: user.name ?? "",
          role_name: user.role_name,
          company_id: user.company_id,
        };

        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      return token;
    },

    session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

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
