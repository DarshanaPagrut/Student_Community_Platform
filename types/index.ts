import { Timestamp } from "firebase/firestore";

// User and Authentication Types
export interface UserProfile {
  uid: string;
  email: string;
  username: string;
  displayName?: string;
  leetcodeUsername: string;
  photoURL?: string;
  group: string | null;
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  theme: "light" | "dark";
  notifications: boolean;
  publicProfile: boolean;
}

export interface UserStats {
  totalProblems: number;
  solvedProblems: number;
  currentStreak: number;
  bestStreak: number;
  rank: number;
}

// Dashboard Types
export interface DashboardStats {
  problemsSolved: number;
  currentStreak: number;
  bestStreak: number;
  groupRank: number;
  contestRank: number;
  weeklyGoal: number;
  weeklyProgress: number;
  studyTimeToday: number;
  studyTimeWeek: number;
  lastUpdated: Timestamp;
}

// LeetCode Problem Types
export interface LeetCodeProblem {
  id: string;
  problemName: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  link: string;
  status: "Solved" | "Unsolved" | "Attempted";
  attempts: number;
  timeSpent: number; // in minutes
  solvedAt?: Timestamp;
  notes: string;
  rating: number; // 1-5 stars
  tags: string[];
  lastAttemptedAt: Timestamp;
  createdAt: Timestamp;
}

export interface TopicProgress {
  topic: string;
  totalProblems: number;
  solvedProblems: number;
  completionRate: number;
  averageRating: number;
  lastUpdated: Timestamp;
}

// Discussion Types
export interface Discussion {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string | null;

  title: string;
  content: string;
  tags: string[];
  likes: number;
  replies: number;
  views: number;
  isResolved: boolean;
  isPinned: boolean;
  category:
    | "general"
    | "algorithms"
    | "data-structures"
    | "interview"
    | "career";
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastReplyAt?: Timestamp;
  lastReplyBy?: string;
}

export interface DiscussionReply {
  id: string;
  discussionId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string | null;
  content: string;
  likes: number;
  isAccepted: boolean;
  parentReplyId?: string; // for nested replies
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// College Updates Types
export interface CollegeUpdate {
  id: string;
  title: string;
  description: string;
  type: "event" | "workshop" | "info-session" | "career" | "announcement";
  priority: "high" | "medium" | "low";
  date: string;
  endDate?: string;
  location?: string;
  link?: string;
  imageUrl?: string;
  isPublic: boolean;
  targetAudience: string[];
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Contest Types
export interface Contest {
  id: string;
  name: string;
  platform:
    | "LeetCode"
    | "CodeChef"
    | "Codeforces"
    | "Google"
    | "AtCoder"
    | "Other";
  date: string;
  time: string;
  duration: string;
  participants: string;
  prizes: string;
  status: "upcoming" | "ongoing" | "completed";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  registrationLink?: string;
  description?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ContestParticipation {
  id: string;
  contestId: string;
  userId: string;
  rank?: number;
  score?: number;
  problemsSolved?: number;
  timeSpent?: number;
  isReminded: boolean;
  participatedAt?: Timestamp;
  createdAt: Timestamp;
}

// Study Session Types
export interface StudySession {
  id: string;
  userId: string;
  problemId?: string;
  topic: string;
  duration: number; // in minutes
  date: string;
  notes?: string;
  mood: "excellent" | "good" | "average" | "poor";
  productivity: number; // 1-10
  createdAt: Timestamp;
}

// Group Types
export interface Group {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  inviteCode?: string;
  adminId: string;
  moderators: string[];
  members: string[];
  memberCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface GroupMember {
  userId: string;
  groupId: string;
  username: string;
  role: "admin" | "moderator" | "member";
  joinedAt: Timestamp;
  problemsSolved: number;
  currentStreak: number;
  rank: number;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: "contest" | "discussion" | "achievement" | "reminder" | "group";
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: Timestamp;
}

// Achievement Types
export interface Achievement {
  id: string;
  userId: string;
  type: "streak" | "problems" | "contest" | "contribution";
  title: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt: Timestamp;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination Types
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// Search and Filter Types
export interface SearchFilters {
  difficulty?: "Easy" | "Medium" | "Hard";
  topic?: string;
  status?: "Solved" | "Unsolved" | "Attempted";
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface SortOptions {
  field: string;
  direction: "asc" | "desc";
}
