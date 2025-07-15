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
  ChevronRight,
  ChevronDown,
} from "lucide-react";

export default function Dashboard() {
  const [showUpdatesModal, setShowUpdatesModal] = useState(false);
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);
  const [showContestsModal, setShowContestsModal] = useState(false);
  const [showProblemsModal, setShowProblemsModal] = useState(false);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [newDiscussion, setNewDiscussion] = useState("");
  const [newComment, setNewComment] = useState("");
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
  const [problemStatus, setProblemStatus] = useState<Record<string, string>>(
    {}
  );

  const stats = [
    {
      title: "Problems Solved",
      value: "127",
      change: "+12 this week",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Current Streak",
      value: "15 days",
      change: "Personal best!",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Group Rank",
      value: "#8",
      change: "↑2 positions",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Contest Rank",
      value: "#142",
      change: "Last contest",
      icon: Trophy,
      color: "text-orange-600",
    },
    {
      title: "Weekly Goal",
      value: "8/10",
      change: "80% complete",
      icon: Target,
      color: "text-indigo-600",
    },
    {
      title: "Study Time",
      value: "4.2h",
      change: "Today",
      icon: Calendar,
      color: "text-pink-600",
    },
  ];

  const topicProblems = {
    Arrays: [
      {
        name: "Two Sum",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/two-sum/",
      },
      {
        name: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      },
      {
        name: "Contains Duplicate",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/contains-duplicate/",
      },
    ],
    "Linked List": [
      {
        name: "Reverse Linked List",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/reverse-linked-list/",
      },
      {
        name: "Merge Two Sorted Lists",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/merge-two-sorted-lists/",
      },
    ],
    Stack: [],
    Queue: [],
    Hashing: [],
    Graphs: [],
    Trees: [],
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const toggleStatus = (problemName: string) => {
    setProblemStatus((prev) => ({
      ...prev,
      [problemName]: prev[problemName] === "Solved" ? "Unsolved" : "Solved",
    }));
  };

  const getBadgeStyle = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const dailyChallenge = {
    title: "Valid Parentheses",
    difficulty: "Easy",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    link: "https://leetcode.com/problems/valid-parentheses/",
    completed: false,
  };

  const discussions = [
    {
      id: 1,
      author: "Alex Chen",
      title: "How to optimize Dijkstra's algorithm?",
      content:
        "I'm working on a graph problem and wondering about the best ways to optimize Dijkstra's algorithm for large graphs.",
      timestamp: "2 hours ago",
      replies: 5,
      likes: 12,
    },
    {
      id: 2,
      author: "Sarah Kim",
      title: "Dynamic Programming vs Greedy approach",
      content:
        "When should I choose DP over greedy algorithms? Looking for practical examples.",
      timestamp: "4 hours ago",
      replies: 8,
      likes: 15,
    },
    {
      id: 3,
      author: "Mike Johnson",
      title: "Best resources for system design",
      content:
        "Can anyone recommend good resources for learning system design concepts?",
      timestamp: "1 day ago",
      replies: 12,
      likes: 23,
    },
  ];

  const collegeUpdates = [
    {
      id: 1,
      title: "Tech Fest 2025 Registration Open",
      description:
        "Annual technical festival with coding competitions, hackathons, and tech talks. Register before March 1st.",
      date: "March 15-17, 2025",
      type: "event",
      priority: "high",
    },
    {
      id: 2,
      title: "Machine Learning Workshop",
      description:
        "Hands-on workshop covering ML fundamentals, supervised learning, and practical implementation using Python.",
      date: "February 20, 2025",
      type: "workshop",
      priority: "medium",
    },
    {
      id: 3,
      title: "Google Summer of Code Info Session",
      description:
        "Learn about GSoC application process, project selection, and tips from previous participants.",
      date: "February 10, 2025",
      type: "info-session",
      priority: "high",
    },
    {
      id: 4,
      title: "Career Fair - Tech Companies",
      description:
        "Major tech companies including Google, Microsoft, Amazon will be recruiting for internships and full-time positions.",
      date: "March 5, 2025",
      type: "career",
      priority: "high",
    },
  ];

  const contests = [
    {
      id: 1,
      name: "LeetCode Weekly Contest 403",
      platform: "LeetCode",
      date: "Sunday, July 14",
      time: "10:00 AM IST",
      duration: "1.5 hours",
      participants: "25,000+",
      prizes: "T-shirts, LeetCode Premium",
      status: "upcoming",
    },
    {
      id: 2,
      name: "CodeChef July Long Challenge",
      platform: "CodeChef",
      date: "July 1-31",
      time: "Ongoing",
      duration: "10 days",
      participants: "50,000+",
      prizes: "Cash prizes up to $1000",
      status: "ongoing",
    },
    {
      id: 3,
      name: "Codeforces Round #897",
      platform: "Codeforces",
      date: "Friday, July 12",
      time: "8:00 PM IST",
      duration: "2 hours",
      participants: "15,000+",
      prizes: "Rating points",
      status: "upcoming",
    },
    {
      id: 4,
      name: "Google Kickstart Round H",
      platform: "Google",
      date: "Saturday, July 20",
      time: "2:30 PM IST",
      duration: "3 hours",
      participants: "10,000+",
      prizes: "Google swag, interview opportunities",
      status: "upcoming",
    },
  ];

  // Generate problemTopics array for use in the modal
  const problemTopics = Object.entries(topicProblems).map(
    ([name, problems]) => ({
      name,
      solved: problems.filter((p) => problemStatus[p.name] === "Solved").length,
      total: problems.length,
    })
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back! Here&apos;s your learning progress overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {stat.change}
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Daily Challenge */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-orange-600" />
            Today&apos;s Challenge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {dailyChallenge.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {dailyChallenge.description}
              </p>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                  dailyChallenge.difficulty === "Easy"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : dailyChallenge.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                }`}
              >
                {dailyChallenge.difficulty}
              </span>
            </div>
            <div className="ml-4 space-y-2">
              <Button size="sm" className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Solve Now
              </Button>
              {!dailyChallenge.completed && (
                <Button size="sm" variant="outline" className="w-full">
                  Mark Complete
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Cards Row */}
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
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  &quot;How to optimize Dijkstra&apos;s algorithm?&quot; - Alex
                  Chen
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  5 replies • 2 hours ago
                </p>
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
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  🎓 Tech Fest 2025
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Registration open until March 1st
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  March 15-17, 2025
                </p>
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
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  🏆 LeetCode Weekly
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Contest 403 - Sunday 10AM
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  25,000+ participants
                </p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View All Contests
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
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
              {collegeUpdates.map((update) => (
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
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}
                        >
                          {update.priority}
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
                        <span className="capitalize">
                          {update.type.replace("-", " ")}
                        </span>
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
                <div className="flex space-x-2">
                  <Button size="sm" disabled={!newDiscussion.trim()}>
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
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
                      <span>{discussion.author}</span>
                      <span>{discussion.timestamp}</span>
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
                      <Button size="sm" disabled={!newComment.trim()}>
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
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
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
                      <Button size="sm">
                        <Clock className="h-4 w-4 mr-2" />
                        Set Reminder
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

      {showProblemsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                LeetCode Problems by Topic
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowProblemsModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {problemTopics.map((topic) => (
                <Card key={topic.name}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{topic.name}</CardTitle>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {topic.solved}/{topic.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(topic.solved / topic.total) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                  {(topicProblems[topic.name as keyof typeof topicProblems] || []).map(
  (problem, idx) => {
    const safeProblem = {
      ...problem,
      status: (problem as any).status ?? "Unsolved", // 👈 fallback
    };

    return (
      <div
        key={idx}
        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
      >
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {safeProblem.name}
            </p>
            <a
              href={safeProblem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
              safeProblem.difficulty === "Easy"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : safeProblem.difficulty === "Medium"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            }`}
          >
            {safeProblem.difficulty}
          </span>
        </div>
        <Button
          size="sm"
          variant={safeProblem.status === "Solved" ? "default" : "outline"}
          className={
            safeProblem.status === "Solved"
              ? "bg-green-600 hover:bg-green-700"
              : ""
          }
        >
          {safeProblem.status}
        </Button>
      </div>
    );
  }
)}

                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => setShowProblemsModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Leetcode problem sheet */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>LeetCode Problems Sheet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(topicProblems).map(([topic, problems]) => (
              <div key={topic}>
                <button
                  onClick={() => toggleTopic(topic)}
                  className="w-full flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {topic}
                  </span>
                  {expandedTopics.includes(topic) ? (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  )}
                </button>
                {expandedTopics.includes(topic) && (
                  <div className="mt-2 space-y-2 ml-4">
                    {problems.length > 0 ? (
                      problems.map((problem, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex flex-col">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900 dark:text-white">
                                {problem.name}
                              </span>
                              <a
                                href={problem.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                            <span
                              className={`mt-1 text-xs font-medium px-2 py-0.5 rounded-full w-max ${getBadgeStyle(
                                problem.difficulty
                              )}`}
                            >
                              {problem.difficulty}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            variant={
                              problemStatus[problem.name] === "Solved"
                                ? "default"
                                : "outline"
                            }
                            className={
                              problemStatus[problem.name] === "Solved"
                                ? "bg-green-600 hover:bg-green-700"
                                : ""
                            }
                            onClick={() => toggleStatus(problem.name)}
                          >
                            {problemStatus[problem.name] || "Unsolved"}
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                        No problems added in this topic yet.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
