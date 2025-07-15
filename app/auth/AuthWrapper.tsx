"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthState } from "@/src/types";
import { useRouter } from "next/navigation";

interface AuthWrapperProps {
  children: React.ReactNode;
  pageType: "login" | "register";
}

export default function AuthWrapper({ children, pageType }: AuthWrapperProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    currentStep: pageType,
  });

  useEffect(() => {
    if (user) {
      setAuthState((prev) => ({
        ...prev,
        isAuthenticated: true,
        user: {
          id: user.uid,
          email: user.email || "",
          leetcodeUsername: user.displayName || "",
          groupId: "1",
        },
      }));
      router.push("/module-selection");
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        currentStep: pageType,
      });
    }
  }, [user, pageType, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
