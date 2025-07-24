// src/components/auth/Register.tsx
"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Code,
  ArrowLeft,
  ArrowRight,
  Users as UsersIcon,
  Plus,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebase";

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
}

export default function Register({
  onSwitchToLogin,
  onBack,
}: {
  onSwitchToLogin: () => void;
  onBack?: () => void;
}) {
  const { register, error, clearError } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    leetcodeUsername: "",
  });
  const [loadingAccount, setLoadingAccount] = useState(false);
  const [loadingFinish, setLoadingFinish] = useState(false);

  const allGroups: Group[] = [
    {
      id: "java-dsa",
      name: "DSA Masters - Java",
      description: "Data Structures and Algorithms using Java",
      members: 245,
    },
    {
      id: "cpp-cp",
      name: "C++ Competitive Programming",
      description: "Advanced C++ for competitive programming",
      members: 189,
    },
    {
      id: "python-dsa",
      name: "Python DSA Beginners",
      description: "Learn DSA concepts with Python",
      members: 312,
    },
  ];
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) clearError();
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinish = async () => {
    if (!selectedGroup) return;
    setLoadingFinish(true);
    try {
      const cred = await register(
        form.email,
        form.password,
        form.username,
        form.leetcodeUsername
      );
      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        email: form.email,
        username: form.username,
        leetcodeUsername: form.leetcodeUsername,
        group: selectedGroup,
        createdAt: new Date(),
        groupSelectedAt: new Date(),
      });
      router.push("/module-selection");
    } catch {
      // error shown by context
    } finally {
      setLoadingFinish(false);
    }
  };

  const filtered = allGroups.filter((g) =>
    g.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-900">
      <div className="w-full max-w-lg overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="account"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gray-800 text-gray-100">
                <CardHeader className="text-center relative py-6">
                  {onBack && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onBack}
                      className="absolute left-4 top-4 text-gray-300"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" /> Back
                    </Button>
                  )}
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto">
                    <Code className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="mt-4 text-2xl">
                    Create Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <form onSubmit={handleNext} className="space-y-4">
                    {error && (
                      <div className="p-3 text-red-300 bg-red-900 rounded">
                        {error}
                      </div>
                    )}
                    <Input
                      name="username"
                      placeholder="Username"
                      value={form.username}
                      onChange={handleChange}
                      required
                      disabled={loadingAccount}
                      className="bg-gray-700 text-gray-100"
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      disabled={loadingAccount}
                      className="bg-gray-700 text-gray-100"
                    />
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      disabled={loadingAccount}
                      className="bg-gray-700 text-gray-100"
                    />
                    <Input
                      name="leetcodeUsername"
                      placeholder="LeetCode Username"
                      value={form.leetcodeUsername}
                      onChange={handleChange}
                      required
                      disabled={loadingAccount}
                      className="bg-gray-700 text-gray-100"
                    />
                    <Button
                      type="submit"
                      className="w-full mt-2"
                      disabled={loadingAccount}
                    >
                      Next
                    </Button>
                  </form>
                  <p className="mt-4 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <button
                      onClick={onSwitchToLogin}
                      className="text-blue-400 font-medium"
                      disabled={loadingAccount}
                    >
                      Sign In
                    </button>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="group"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gray-800 text-gray-100">
                <CardHeader className="text-center py-6">
                  <CardTitle className="text-2xl">
                    Join or Create a Study Group
                  </CardTitle>
                  <p className="mt-1 text-gray-400">
                    Connect with peers who share your learning interests
                  </p>
                </CardHeader>
                <CardContent className="px-6 pb-4">
                  <Input
                    placeholder="Search groups by language or topic..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-gray-700 text-gray-100 mb-4"
                  />

                  <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
                    {filtered.map((g) => (
                      <div
                        key={g.id}
                        className={`flex items-start justify-between p-4 bg-gray-700 rounded-lg ${
                          selectedGroup === g.id ? "ring-2 ring-blue-500" : ""
                        }`}
                        onClick={() => setSelectedGroup(g.id)}
                      >
                        <div>
                          <h3 className="font-semibold text-lg">{g.name}</h3>
                          <p className="text-gray-400 text-sm">
                            {g.description}
                          </p>
                          <div className="flex items-center text-gray-400 text-xs mt-1">
                            <UsersIcon className="h-4 w-4 mr-1" />
                            {g.members} members
                          </div>
                        </div>
                        <Button
                          variant={
                            selectedGroup === g.id ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedGroup(g.id)}
                        >
                          Join
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4 border-gray-600 text-gray-300 hover:border-gray-500"
                    onClick={() => {
                      /* open your create‑group modal here */
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Create New Group
                  </Button>

                  <Button
                    onClick={handleFinish}
                    disabled={!selectedGroup || loadingFinish}
                    className="w-full mt-4"
                  >
                    {loadingFinish ? "Signing Up…" : "Finish & Continue"}{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
