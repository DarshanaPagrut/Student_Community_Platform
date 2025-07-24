"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  TrendingUp,
  BookOpen,
  Users,
  Calendar,
  Target,
  Trophy,
  MessageSquare,
  GraduationCap,
  Clock,
  ExternalLink,
  Plus,
  X,
  Send,
  ThumbsUp,
  Reply,
  Star,
  Award,
  Zap,
} from "lucide-react";
import LeetCodeProblems from "./LeetCodeSheet";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useDiscussions } from "@/hooks/useDiscussions";
import { useCollegeUpdates } from "@/hooks/useCollegeUpdates";
import { useContests } from "@/hooks/useContests";
import { useLeetCodeProgress } from "@/hooks/useLeetCodeProgress";

export default function Dashboard() {
  const { user, userProfile } = useAuth();
  const { stats, loading: statsLoading } = useDashboardStats();
  const { discussions, addDiscussion, addReply } = useDiscussions();
  const { updates } = useCollegeUpdates();
  const { contests, addReminder, isUserReminded } = useContests();
  const { getProgressStats } = useLeetCodeProgress();
  
  const [showUpdatesModal, setShowUpdatesModal] = useState(false);
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);
  const [showContestsModal, setShowContestsModal] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState("");
  const [newDiscussionContent, setNewDiscussionContent] = useState("");
  const [newComment, setNewComment] = useState("");

  const progressStats = getProgressStats();

  // Enhanced stats with real-time data
  const displayStats = [
    {
      title: "Problems Solved",
      value: progressStats.solvedProblems.toString(),
      change: `+${stats?.weeklyProgress || 0} this week`,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Current Streak",
      value: `${stats?.currentStreak || 0} days`,
      change: stats?.currentStreak === stats?.bestStreak ? "Personal best!" : `Best: ${stats?.bestStreak || 0}`,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Group Rank",
      value: stats?.groupRank ? `#${stats.groupRank}` : "N/A",
      change: "↑2 positions",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  const handleAddDiscussion = async () => {
    if (!newDiscussion.trim() || !newDiscussionContent.trim()) return;
    
    try {
      await addDiscussion(newDiscussion, newDiscussionContent);
      setNewDiscussion("");
      setNewDiscussionContent("");
    } catch (error) {
      console.error("Error adding discussion:", error);
    }
  };

  const handleAddReply = async (discussionId: string) => {
    if (!newComment.trim()) return;
    
    try {
      await addReply(discussionId, newComment);
      setNewComment("");
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const handleSetReminder = async (contestId: string) => {
    try {
      await addReminder(contestId);
    } catch (error) {
      console.error("Error setting reminder:", error);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
          <p className="text-gray-600">You need to sign in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back, {userProfile?.displayName || user.email}! Here&apos;s your learning progress overview.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium">{stats?.currentStreak || 0} day streak</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-purple-500" />
            <span className="text-sm font-medium">Level {Math.floor((progressStats.solvedProblems / 10) + 1)}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {statsLoading ? "..." : stat.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Weekly Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Weekly Goal</span>
                <span className="text-sm text-gray-500">
                  {stats?.weeklyProgress || 0}/{stats?.weeklyGoal || 10}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(((stats?.weeklyProgress || 0) / (stats?.weeklyGoal || 10)) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Difficulty Distribution</span>
                <span className="text-sm text-gray-500">
                  {progressStats.difficulty.easy.solved}E / {progressStats.difficulty.medium.solved}M / {progressStats.difficulty.hard.solved}H
                </span>
              </div>
              <div className="flex space-x-1">
                <div className="flex-1 bg-green-500 h-2 rounded-l-full" />
                <div className="flex-1 bg-yellow-500 h-2" />
                <div className="flex-1 bg-red-500 h-2 rounded-r-full" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Study Time</span>
                <span className="text-sm text-gray-500">
                  {Math.round((stats?.studyTimeWeek || 0) / 60)}h this week
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((stats?.studyTimeWeek || 0) / 600 * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Challenge */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-orange-600" />
            Todays Challenge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Valid Parentheses
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Given a string s containing just the characters determine if the input string is valid.
              </p>
              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Easy
              </span>
            </div>
            <div className="ml-4 space-y-2">
              <Button size="sm" className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Solve Now
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                Mark Complete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Discussion Board */}
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setShowDiscussionModal(true)}
        >
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
              Discussion Board
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Latest Discussion
                </p>
                {discussions.length > 0 ? (
                  <>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {discussions[0].title} - {discussions[0].authorName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {discussions[0].replies} replies • {discussions[0].likes} likes
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    No discussions yet. Start the conversation!
                  </p>
                )}
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View All Discussions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* College Updates */}
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setShowUpdatesModal(true)}
        >
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-green-600" />
              College Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                {updates.length > 0 ? (
                  <>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      🎓 {updates[0].title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {updates[0].description.substring(0, 50)}...
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {updates[0].date}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    No updates available
                  </p>
                )}
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View All Updates
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Contests */}
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setShowContestsModal(true)}
        >
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-orange-600" />
              Weekly Contests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg">
                {contests.length > 0 ? (
                  <>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      🏆 {contests[0].name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {contests[0].date} - {contests[0].time}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {contests[0].participants} participants
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    No contests scheduled
                  </p>
                )}
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View All Contests
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {showDiscussionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Discussion Board
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDiscussionModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* New Discussion */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Start New Discussion
              </h3>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Discussion title..."
                  value={newDiscussion}
                  onChange={(e) => setNewDiscussion(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <textarea
                  placeholder="Discussion content..."
                  value={newDiscussionContent}
                  onChange={(e) => setNewDiscussionContent(e.target.value)}
                  rows={3}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    disabled={!newDiscussion.trim() || !newDiscussionContent.trim()}
                    onClick={handleAddDiscussion}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Post Discussion
                  </Button>
                </div>
              </div>
            </div>

            {/* Discussions List */}
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {discussion.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {discussion.content}
                      </p>
                      {discussion.tags.length > 0 && (
                        <div className="flex items-center space-x-1 mt-2">
                          {discussion.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
                      <span>{discussion.authorName}</span>
                      <span>{discussion.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently'}</span>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {discussion.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{discussion.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600">
                        <Reply className="h-4 w-4" />
                        <span>{discussion.replies}</span>
                      </button>
                    </div>
                  </div>

                  {/* Comment Section */}
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                      <Button 
                        size="sm" 
                        disabled={!newComment.trim()}
                        onClick={() => handleAddReply(discussion.id)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => setShowDiscussionModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* College Updates Modal */}
      {showUpdatesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                College Updates
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUpdatesModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {updates.map((update) => (
                <div
                  key={update.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {update.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            update.priority === "high"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              : update.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          }`}
                        >
                          {update.priority}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                          {update.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {update.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {update.date}
                        </span>
                        {update.location && (
                          <span>{update.location}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setShowUpdatesModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Contests Modal */}
      {showContestsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Weekly Contests
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowContestsModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {contests.map((contest) => (
                <div
                  key={contest.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {contest.name}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            contest.status === "ongoing"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : contest.status === "upcoming"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                          }`}
                        >
                          {contest.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Platform: {contest.platform}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-500">
                        Date & Time
                      </p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {contest.date}
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {contest.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-500">
                        Duration
                      </p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {contest.duration}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-500">
                        Participants
                      </p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {contest.participants}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-500">Prizes</p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {contest.prizes}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Contest
                    </Button>
                    {contest.status === "upcoming" && (
                      <Button 
                        size="sm" 
                        variant={isUserReminded(contest.id) ? "secondary" : "default"}
                        onClick={() => handleSetReminder(contest.id)}
                        disabled={isUserReminded(contest.id)}
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        {isUserReminded(contest.id) ? "Reminder Set" : "Set Reminder"}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setShowContestsModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      <LeetCodeProblems />
    </div>
  );
}
