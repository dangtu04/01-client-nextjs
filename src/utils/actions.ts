"use server";
import { signIn } from "@/auth";

export async function authenticate(email: string, password: string) {
  try {
    const res = await signIn("credentials", {
      email,
      password,
      // callbackUrl: "/",
      redirect: false,
    });
    return res;
  } catch (error: any) {

    if (error.name === "InvalidEmailPasswordError") {
      return {
        error: error.type,
        errCode: 1,
      };
    } else if (error.name === "AccountNotActived") {
      return {
        error: error.type,
        errCode: 2,
      };
    } else {
      return {
        error: "Internal server error",
        errCode: 3,
      };
    }
  }
}

