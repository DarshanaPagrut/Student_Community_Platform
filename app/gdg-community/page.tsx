// app/gdg-community/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import CommunityTypeSelection from "@/src/components/community/CommunityTypeSelection";
import AdminDashboard from "@/src/components/community/admin/AdminDashboard";
import MemberDashboard from "@/src/components/community/member/MemberDashboard";
import { CommunityAuthState } from "@/src/types";
import { useAuth } from "@/contexts/AuthContext";

export default function GDGCommunityPage() {
  const { user, loading } = useAuth();

  const [communityAuthState, setCommunityAuthState] =
    useState<CommunityAuthState>({
      user: null,
      community: null,
      isAuthenticated: false,
      currentStep: "type-selection",
    });

  const handleCommunityRoleSelected = (
    role: "admin" | "member",
    data?: any
  ) => {
    setCommunityAuthState((prev) => ({
      ...prev,
      isAuthenticated: true,
      currentStep: "dashboard",
      user: {
        id: user?.uid || "1",
        email: user?.email || "user@example.com",
        name: user?.displayName || "John Doe",
        role,
        communityId: "1",
        joinedAt: new Date(),
      },
      community: {
        id: "1",
        name: data?.communityName || "GDG IIIT Delhi",
        type: data?.communityType || "GDG",
        description: data?.description || "",
        college: data?.college || "IIIT Delhi",
        adminId: role === "admin" ? user?.uid || "1" : "admin-id",
        inviteCode: "GDG-IIIT-2025",
        createdAt: new Date(),
      },
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!communityAuthState.isAuthenticated) {
    if (communityAuthState.currentStep === "type-selection") {
      return (
        <CommunityTypeSelection
          onRoleSelected={handleCommunityRoleSelected}
        />
      );
    }
  } else {
    if (communityAuthState.user?.role === "admin") {
      return <AdminDashboard />;
    } else {
      return <MemberDashboard />;
    }
  }

  return null; // fallback
}
