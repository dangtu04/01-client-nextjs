import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AccountNotActived, InvalidEmailPasswordError } from "./utils/error";
import { sendRequest } from "./utils/api";
import { IAuthUser } from "./types/models/user.model";
import { UserRole } from "./utils/roles";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const res = await sendRequest<IBackendRes<ILogin>>({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
          body: {
            email: credentials.email,
            password: credentials.password,
          },
        });

        if (res.statusCode === 200) {
          const user = res?.data?.user;
          const data = res?.data;
          if (!user || !data?.access_token) {
            return null;
          }
          return {
            _id: user._id,
            name: user.name ?? "",
            email: user.email,
            role: user.role,
            access_token: data.access_token,
          };
        }

        if (res.statusCode === 401) {
          throw new InvalidEmailPasswordError();
        } else if (res.statusCode === 403) {
          throw new AccountNotActived();
        } else {
          throw new Error("Internal server error");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // đăng nhập với google
      if (account?.provider === "google") {
        const res = await sendRequest<IBackendRes<ILogin>>({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login/google`,
          body: { id_token: account.id_token },
        });

        if (res.statusCode === 200) {
          const data = res.data;
          if (!data?.user || !data?.access_token) {
            throw new Error("Invalid response from server");
          }

          const role = data.user.role;
          if (!Object.values(UserRole).includes(role as UserRole)) {
            throw new Error("Invalid role from backend");
          }

          // lưu user và access_token 
          token.user = {
            _id: data.user._id,
            name: data.user.name ?? "",
            email: data.user.email,
            role: role as UserRole,
            access_token: data.access_token,
          } as IAuthUser;
        } else {
          throw new Error("Google login failed");
        }
      }

      // đăng nhập credentials
      if (account?.provider === "credentials" && user) {
        const userRole = user.role;
        if (!Object.values(UserRole).includes(userRole as UserRole)) {
          throw new Error("Invalid role from backend");
        }
        token.user = user as IAuthUser;
      }

      return token;
    },

    session({ session, token }) {
      // thêm null-check để tránh crash nếu token.user undefined
      if (token.user) {
        (session.user as IAuthUser) = token.user;
      }
      return session;
    },
  },
});