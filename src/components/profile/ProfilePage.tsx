"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  User as UserIcon,
  Mail,
  Code,
  Users,
  Trophy,
  Calendar,
  LogOut,
  Edit,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { useRouter } from "next/navigation";

interface ProfilePageProps {
  onBack?: () => void;
  onSignOut?: () => void;   
}

interface UserProfile {
  username: string;
  email: string;
  leetcodeUsername: string;
  group: string;
}

export default function ProfilePage({ onBack }: ProfilePageProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // fetch Firestore profile
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const fetchProfile = async () => {
      setLoading(true);
      const docRef = doc(db, "users", user.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as any;
        setProfile({
          username: data.username,
          email: data.email,
          leetcodeUsername: data.leetcodeUsername,
          group: data.group,
        });
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleSignOut = async () => {
    await logout();
    router.push("/login");
  };

  const handleBack = () => {
    if (onBack) return onBack();
    router.push("/dashboard");
  };

  const userStats = [
    { label: "Problems Solved", value: "127", icon: Code },
    { label: "Current Streak", value: "15 days", icon: Calendar },
    { label: "Group Rank", value: "#8", icon: Trophy },
    { label: "Groups Joined", value: "1", icon: Users },
  ];

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your account and view your progress
            </p>
          </div>
        </div>
        <Button
          onClick={handleSignOut}
          variant="outline"
          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Personal Information
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <UserIcon className="h-10 w-10 text-blue-600 dark:text-blue-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {profile?.username}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">Student</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <Input value={profile?.email} disabled />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    LeetCode Username
                  </label>
                  <div className="flex items-center space-x-2">
                    <Code className="h-4 w-4 text-gray-400" />
                    <Input value={profile?.leetcodeUsername} disabled />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Group */}
          <Card>
            <CardHeader>
              <CardTitle>Current Group</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {profile?.group}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {/* You can fetch and display group description */}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {/* e.g. 245 members */}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Group
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    action: "Solved 'Two Sum' problem",
                    time: "2 hours ago",
                    type: "success",
                  },
                  {
                    action: "Started 'Binary Tree Inorder' problem",
                    time: "4 hours ago",
                    type: "info",
                  },
                  {
                    action: "Completed daily goal",
                    time: "1 day ago",
                    type: "success",
                  },
                  {
                    action: "Joined DSA Masters group",
                    time: "3 days ago",
                    type: "info",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "success"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {stat.value}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  title: "First Solve",
                  description: "Solved your first problem",
                  icon: "🎉",
                },
                {
                  title: "Week Warrior",
                  description: "7-day solving streak",
                  icon: "🔥",
                },
                {
                  title: "Array Master",
                  description: "Solved 25 array problems",
                  icon: "🏆",
                },
              ].map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg"
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {achievement.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Change Group
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Trophy className="h-4 w-4 mr-2" />
                View Achievements
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
