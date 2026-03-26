"use client";
import { signIn } from "next-auth/react";

export default function LoginGoogle() {
  return (
    <>
      <button onClick={() => signIn("google", { redirectTo: "/" })}>
        Login với Google
      </button>
    </>
  );
}
