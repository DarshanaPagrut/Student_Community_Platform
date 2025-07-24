"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Sparkles, Users, ShieldCheck, ArrowRight } from "lucide-react";
import PageWrapper from "@/src/components/layout/PageWrapper";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkUserGroup = async () => {
      if (loading) return;

      const isNewUser = localStorage.getItem("newUser");

      if (user) {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          const data = snap.data();

          // Skip auto-redirect after fresh registration
          if (isNewUser === "true") {
            setChecking(false);
            return;
          }

    

          if (data.group && pathname !== "/module-selection") {
            router.replace("/module-selection");
            return;
          }
        }
      }

      setChecking(false);
    };

    checkUserGroup();
  }, [user, loading, router, pathname]);

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Redirecting...
          </p>
        </div>
      </div>
    );
  }

  return (
    <PageWrapper>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white">
        {/* Hero Section */}
        <section className="text-center py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              All-in-One Platform for Student Communities & Clubs
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Manage tech communities or coding clubs with ease. Track goals,
              manage members, solve doubts with AI, and grow smarter — all in
              one place.
            </p>
            <div className="mt-10">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        {/* Other sections unchanged... */}
      </main>
    </PageWrapper>
  );
}
