import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { IAuthUser } from "./models/user.model";

// interface IAuthUser {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
//   access_token: string;
// }
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    access_token: string;
    refresh_token: string;
    user: IAuthUser;
    access_expire: number;
    error: string;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: IAuthUser;
    access_token: string;
    refresh_token: string;
    access_expire: number;
    error: string;
  }

  interface User extends DefaultUser {
    _id: string;
    role: string;
    access_token: string;
  }
}
