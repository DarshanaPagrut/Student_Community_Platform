"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Sparkles, Users, ShieldCheck, ArrowRight } from "lucide-react";
import PageWrapper from "@/src/components/layout/PageWrapper";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/module-selection");
    }
  }, [user, loading, router]);

  // While checking user state, don't show the full page
  if (loading || user) {
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
    <main className="min-h-screen scroll-smooth  scrollbar-hide bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white">
      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            All-in-One Platform for Student Communities & Clubs
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage tech communities or coding clubs with ease. Track goals,
            manage members, solve doubts with AI, and grow smarter — all in one
            place.
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

      {/* Features Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <FeatureCard
            title="Admin Control"
            description="Join your community or club, invite members, and monitor performance in one place."
            icon={<ShieldCheck className="h-7 w-7 text-white" />}
            gradient="from-blue-600 to-indigo-600"
          />
          <FeatureCard
            title="Collaborative Growth"
            description="Bring your team together through structured goals, activities, and shared learning."
            icon={<Users className="h-7 w-7 text-white" />}
            gradient="from-green-500 to-blue-500"
          />
          <FeatureCard
            title="AI Assistance"
            description="Built-in AI Doubt Solver to support members anytime, anywhere — with intelligent suggestions."
            icon={<Sparkles className="h-7 w-7 text-white" />}
            gradient="from-purple-600 to-pink-500"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Designed for Tech-First Students
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            From Google Developer Groups to coding collectives — our platform
            adapts to your structure, style, and vision.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Launch your journey today
          </h2>
          <p className="text-lg mb-6">
            It takes just a minute to choose your module and start organizing
            your dream community or club.
          </p>
          <Link href="/login">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-700 hover:bg-blue-100"
            >
              Continue to Platform <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 border-t dark:border-gray-800">
        © {new Date().getFullYear()} YourCommunityPlatform. All rights reserved.
      </footer>
    </main>
    </PageWrapper>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  gradient,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6">
      <div
        className={`w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
