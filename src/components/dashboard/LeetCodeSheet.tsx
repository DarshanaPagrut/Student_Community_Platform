"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { 
  ChevronRight, 
  ChevronDown, 
  ExternalLink, 
  Search, 
  Filter,
  Star,
  Clock,
  Target,
  TrendingUp,
  BookOpen,
  Award
} from "lucide-react";
import { useLeetCodeProgress } from "@/hooks/useLeetCodeProgress";
import { useDashboardStats } from "@/hooks/useDashboardStats";

const topicProblems = {
  Arrays: [
    {
      name: "Two Sum",
      difficulty: "Easy" as const,
      link: "https://leetcode.com/problems/two-sum/",
    },
    {
      name: "Best Time to Buy and Sell Stock",
      difficulty: "Easy" as const,
      link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    },
    {
      name: "Contains Duplicate",
      difficulty: "Easy" as const,
      link: "https://leetcode.com/problems/contains-duplicate/",
    },
    {
      name: "Product of Array Except Self",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/product-of-array-except-self/",
    },
    {
      name: "Maximum Subarray",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/maximum-subarray/",
    },
    {
      name: "3Sum",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/3sum/",
    },
  ],
  "Linked List": [
    {
      name: "Reverse Linked List",
      difficulty: "Easy" as const,
      link: "https://leetcode.com/problems/reverse-linked-list/",
    },
    {
      name: "Merge Two Sorted Lists",
      difficulty: "Easy" as const,
      link: "https://leetcode.com/problems/merge-two-sorted-lists/",
    },
    {
      name: "Linked List Cycle",
      difficulty: "Easy" as const,
      link: "https://leetcode.com/problems/linked-list-cycle/",
    },
    {
      name: "Remove Nth Node From End of List",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    },
    {
      name: "Reorder List",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/reorder-list/",
    },
  ],
  Stack: [
    {
      name: "Valid Parentheses",
      difficulty: "Easy" as const,
      link: "https://leetcode.com/problems/valid-parentheses/",
    },
    {
      name: "Min Stack",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/min-stack/",
    },
    {
      name: "Evaluate Reverse Polish Notation",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    },
    {
      name: "Daily Temperatures",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/daily-temperatures/",
    },
  ],
  Queue: [
    {
      name: "Implement Queue using Stacks",
      difficulty: "Easy" as const,
      link: "https://leetcode.com/problems/implement-queue-using-stacks/",
    },
    {
      name: "Design Circular Queue",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/design-circular-queue/",
    },
    {
      name: "Moving Average from Data Stream",
      difficulty: "Easy" as const,
      link: "https://leetcode.com/problems/moving-average-from-data-stream/",
    },
  ],
  Hashing: [
    {
      name: "Two Sum",
      difficulty: "Easy" as const,
      link: "https://leetcode.com/problems/two-sum/",
    },
    {
      name: "Group Anagrams",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/group-anagrams/",
    },
    {
      name: "Top K Frequent Elements",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/top-k-frequent-elements/",
    },
    {
      name: "Valid Anagram",
      difficulty: "Easy" as const,
      link: "https://leetcode.com/problems/valid-anagram/",
    },
  ],
  Graphs: [
    {
      name: "Number of Islands",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/number-of-islands/",
    },
    {
      name: "Clone Graph",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/clone-graph/",
    },
    {
      name: "Pacific Atlantic Water Flow",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
    },
    {
      name: "Course Schedule",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/course-schedule/",
    },
    {
      name: "Graph Valid Tree",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/graph-valid-tree/",
    },
  ],
  Trees: [
    {
      name: "Maximum Depth of Binary Tree",
      difficulty: "Easy" as const,
      link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    },
    {
      name: "Same Tree",
      difficulty: "Easy" as const,
      link: "https://leetcode.com/problems/same-tree/",
    },
    {
      name: "Invert Binary Tree",
      difficulty: "Easy" as const,
      link: "https://leetcode.com/problems/invert-binary-tree/",
    },
    {
      name: "Binary Tree Level Order Traversal",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    },
    {
      name: "Validate Binary Search Tree",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/validate-binary-search-tree/",
    },
    {
      name: "Kth Smallest Element in a BST",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
    },
  ],
  "Dynamic Programming": [
    {
      name: "Climbing Stairs",
      difficulty: "Easy" as const,
      link: "https://leetcode.com/problems/climbing-stairs/",
    },
    {
      name: "House Robber",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/house-robber/",
    },
    {
      name: "House Robber II",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/house-robber-ii/",
    },
    {
      name: "Longest Palindromic Substring",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/longest-palindromic-substring/",
    },
    {
      name: "Coin Change",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/coin-change/",
    },
  ],
  "Binary Search": [
    {
      name: "Binary Search",
      difficulty: "Easy" as const,
      link: "https://leetcode.com/problems/binary-search/",
    },
    {
      name: "Search in Rotated Sorted Array",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    },
    {
      name: "Find Minimum in Rotated Sorted Array",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    },
    {
      name: "Search a 2D Matrix",
      difficulty: "Medium" as const,
      link: "https://leetcode.com/problems/search-a-2d-matrix/",
    },
  ],
};

export default function LeetCodeProblems() {
  const { 
    problems,
    topicProgress,
    loading,
    toggleProblemStatus,
    addProblem,
    getProgressStats,
    updateProblemRating,
    updateProblemNotes,
    getStreakData
  } = useLeetCodeProgress();
  
  const { incrementProblemsSolved } = useDashboardStats();
  
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const toggleTopic = (topic: string) => {
    setExpandedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const getProblemFromFirestore = (problemName: string) => {
    return problems.find(p => p.problemName === problemName);
  };

  const handleToggleStatus = async (problemName: string, topic: string, difficulty: "Easy" | "Medium" | "Hard", link: string) => {
    const existingProblem = getProblemFromFirestore(problemName);
    
    if (existingProblem) {
      const wasUnsolved = existingProblem.status === 'Unsolved';
      await toggleProblemStatus(existingProblem.id, existingProblem.status);
      
      if (wasUnsolved) {
        await incrementProblemsSolved();
      }
    } else {
      await addProblem({
        problemName,
        topic,
        difficulty,
        link,
        status: 'Solved',
        attempts: 1,
        timeSpent: 0,
        notes: '',
        rating: 0,
        tags: []
      });
      
      await incrementProblemsSolved();
    }
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

  const getTopicProgressLocal = (topic: string) => {
    const topicProblemsArray = topicProblems[topic as keyof typeof topicProblems] || [];
    const solved = topicProblemsArray.filter(problem => {
      const firestoreProblem = getProblemFromFirestore(problem.name);
      return firestoreProblem && firestoreProblem.status === 'Solved';
    }).length;
    
    return { solved, total: topicProblemsArray.length };
  };

  const filterProblems = (problems: any[]) => {
    return problems.filter(problem => {
      const matchesSearch = problem.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = selectedDifficulty === "all" || problem.difficulty === selectedDifficulty;
      const firestoreProblem = getProblemFromFirestore(problem.name);
      const status = firestoreProblem ? firestoreProblem.status : "Unsolved";
      const matchesStatus = selectedStatus === "all" || status === selectedStatus;
      
      return matchesSearch && matchesDifficulty && matchesStatus;
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
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
            LeetCode Problems Sheet
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your progress through essential coding problems organized by topics.
          </p>
        </div>
      </div>

      {/* Problems by Topic with inline progress */}
      <Card>
        <CardHeader>
          <CardTitle>Problems by Topic</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(topicProblems).map(([topic, problemsArray]) => {
            const filteredProblems = filterProblems(problemsArray);
            const { solved, total } = getTopicProgressLocal(topic);
            const percentage = total > 0 ? (solved / total) * 100 : 0;

            if (filteredProblems.length === 0 && (searchTerm || selectedDifficulty !== "all" || selectedStatus !== "all")) {
              return null;
            }

            return (
              <div key={topic}>
                <button
                  onClick={() => toggleTopic(topic)}
                  className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                    <span className="font-semibold text-gray-900 dark:text-white">{topic}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({solved}/{total})
                    </span>
                  </div>
                  <div className="flex-grow flex items-center space-x-3">
                    <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.round(percentage)}%` }}
                      />
                    </div>
                    <div className="shrink-0">
                      {expandedTopics.includes(topic) ? (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                </button>

                {expandedTopics.includes(topic) && (
                  <div className="mt-2 space-y-2 ml-4">
                    {filteredProblems.map((problem, idx) => {
                      const firestoreProblem = getProblemFromFirestore(problem.name);
                      const isCompleted = firestoreProblem && firestoreProblem.status === 'Solved';

                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900 dark:text-white">
                                {problem.name}
                              </span>
                              <a
                                href={problem.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 transition-colors"
                              >
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <span
                                className={`text-xs font-medium px-2 py-0.5 rounded-full ${getBadgeStyle(problem.difficulty)}`}
                              >
                                {problem.difficulty}
                              </span>
                              {firestoreProblem && firestoreProblem.rating > 0 && (
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                  <span className="text-xs text-gray-600 dark:text-gray-400">
                                    {firestoreProblem.rating}/5
                                  </span>
                                </div>
                              )}
                              {firestoreProblem && firestoreProblem.attempts > 1 && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {firestoreProblem.attempts} attempts
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant={isCompleted ? "default" : "outline"}
                              className={isCompleted ? "bg-green-600 hover:bg-green-700" : ""}
                              onClick={() =>
                                handleToggleStatus(problem.name, topic, problem.difficulty, problem.link)
                              }
                            >
                              {isCompleted ? "Solved" : "Unsolved"}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}