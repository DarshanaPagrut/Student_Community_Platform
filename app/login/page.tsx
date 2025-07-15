"use client";

import Login from "@/src/components/auth/Login";
import AuthWrapper from "../auth/AuthWrapper";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    
    <AuthWrapper pageType="login">
      <Login
        onLoginSuccess={() => router.push("/")}
        onSwitchToRegister={() => router.push("/register")}
      />
    </AuthWrapper>
  );
}
