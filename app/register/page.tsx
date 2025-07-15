"use client";

import Register from "@/src/components/auth/Register";
import AuthWrapper from "../auth/AuthWrapper";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <AuthWrapper pageType="register">
      <Register
      
        onSwitchToLogin={() => router.push("/select-group")}
      />
    </AuthWrapper>
  );
}
