import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AccountNotActived, InvalidEmailPasswordError } from "./utils/error";
import { sendRequest } from "./utils/api";
import { IUser } from "./types/next-auth";
import { UserRole } from "./utils/roles";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.

      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {

        // check credentials
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

        // console.log(">>> check res: ", res);
        if (res.statusCode === 200) {
          // fix return undefined
          const user = res?.data?.user;
          const data = res?.data;
          if (!user || !data?.access_token) {
            return null;
          } else
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
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const userRole = user.role;
        if (!Object.values(UserRole).includes(userRole as UserRole)) {
          throw new Error("Invalid role from backend");
        }
        token.user = user as IUser;
      }
      return token;
    },
    session({ session, token }) {
      (session.user as IUser) = token.user;
      return session;
    },
    // authorized: async ({ auth }) => {
    //   // Logged in users are authenticated, otherwise redirect to login page
    //   return !!auth;
    // },
  },
});
