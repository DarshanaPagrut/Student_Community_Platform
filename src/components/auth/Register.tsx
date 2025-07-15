"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Code, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Register({
  onSwitchToLogin,
  onBack,
}: {
  onSwitchToLogin: () => void;
  onBack?: () => void;
}) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    leetcodeUsername: "",
    group: "",
  });
  const [loading, setLoading] = useState(false);
  const { register, error, clearError } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) clearError();
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(
        form.email,
        form.password,
        form.username,
        form.leetcodeUsername,
        form.group
      );
      router.push("/select-group");
    } catch {
      // error shown by context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="absolute left-4 top-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
            <Code className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="mt-4">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-red-700 bg-red-100 rounded">{error}</div>
            )}
            <Input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <Input
              name="leetcodeUsername"
              placeholder="LeetCode Username"
              value={form.leetcodeUsername}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <Input
              name="group"
              placeholder="Group Name"
              value={form.group}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 font-medium"
              disabled={loading}
            >
              Sign In
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
