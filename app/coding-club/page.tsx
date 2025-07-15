"use client";

import React, { useState, useEffect } from "react";
import GroupSelection from "@/src/components/auth/GroupSelection";
import Dashboard from "@/src/components/dashboard/Dashboard";
import Goals from "@/src/components/dashboard/Goals";
import Leaderboard from "@/src/components/dashboard/Leaderboard";
import AiDoubtSolver from "@/src/components/dashboard/AiDoubtSolver";
import ProfilePage from "@/src/components/profile/ProfilePage";
import Navbar from "@/src/components/layout/Navbar";
import Sidebar from "@/src/components/layout/Sidebar";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AuthState } from "@/src/types";

// Define User and AuthUser interfaces if not already defined
interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

type ProfilePageProps = {
  onSignOut: () => void;
};

interface AuthUser {
  id: string;
  email: string;
  leetcodeUsername: string;
  groupId: string;
}

function CodingClubContent() {
  const { user, loading }: { user: User | null; loading: boolean } = useAuth();

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    currentStep: "group-selection",
  });

  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [showProfile, setShowProfile] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const authUser: AuthUser = {
        id: user.uid,
        email: user.email || "",
        leetcodeUsername: user.displayName || "",
        groupId: "1",
      };
      setAuthState((prev) => ({
        ...prev,
        isAuthenticated: true,
        user: authUser,
      }));
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        currentStep: "group-selection",
      });
    }
  }, [user]);

  useEffect(() => {
    if (activeSection !== "profile") {
      setShowProfile(false);
    }
  }, [activeSection]);

  const handleGroupSelected = (): void => {
    setAuthState((prev) => ({
      ...prev,
      isAuthenticated: true,
      currentStep: "dashboard",
    }));
  };

  const handleProfileClick = (): void => {
    setShowProfile(true);
    setActiveSection("profile");
  };

  const handleSignOut = (): void => {
    setActiveSection("dashboard");
    setShowProfile(false);
    setAuthState({
      user: null,
      isAuthenticated: false,
      currentStep: "group-selection",
    });
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

  if (!authState.isAuthenticated) {
    if (authState.currentStep === "group-selection") {
      return <GroupSelection onGroupSelected={handleGroupSelected} />;
    }
  }

  const renderMainContent = (): JSX.Element => {
    if (showProfile) {
      return <ProfilePage onSignOut={handleSignOut} />;
    }
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "goals":
        return <Goals />;
      case "leaderboard":
        return <Leaderboard />;
      case "ai-doubt-solver":
        return <AiDoubtSolver />;
      case "profile":
        return <ProfilePage onSignOut={handleSignOut} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar onProfileClick={handleProfileClick} />
      <div className="flex h-[calc(100vh-73px)]">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <main className="flex-1 overflow-y-auto p-6">{renderMainContent()}</main>
      </div>
    </div>
  );
}

export default function CodingClubPage() {
  return (
    <AuthProvider>
      <CodingClubContent />
    </AuthProvider>
  );
}
