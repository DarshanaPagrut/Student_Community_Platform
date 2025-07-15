"use client";

import ModuleSelection from "@/src/components/auth/ModuleSelection";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function ModuleSelectionPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleModuleSelected = (module: string) => {
    if (module === "coding-club") {
      router.push("/coding-club"); // your defined route
    } else if (module === "gdg-community") {
      router.push("/gdg-community");
    }
  };

  return <ModuleSelection onModuleSelected={handleModuleSelected} />;
}
