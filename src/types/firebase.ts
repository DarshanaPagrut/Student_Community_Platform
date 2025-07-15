import { Timestamp } from 'firebase/firestore';

export interface FirebaseUser {
  uid: string;
  email: string;
  username: string;
  leetcodeUsername?: string;
  groupId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  profile: {
    name: string;
    learningTopic: string;
    maxStreak: number;
    currentStreak: number;
    totalSolved: number;
    weeklySolved: number;
    badges: string[];
    lastActiveDate: string;
  };
}

export interface Group {
  id: string;
  name: string;
  description: string;
  language: string;
  goal: string;
  createdBy: string;
  members: string[];
  memberCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Problem {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  leetcodeLink: string;
  tags: string[];
  category: string;
}

export interface UserProblem {
  id: string;
  userId: string;
  problemId: string;
  status: 'Unsolved' | 'Solving' | 'Solved';
  solvedAt?: Timestamp;
  attempts: number;
  notes?: string;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string;
  targetNumber: number;
  currentProgress: number;
  type: 'daily' | 'weekly';
  status: 'active' | 'completed' | 'paused';
  createdAt: Timestamp;
  deadline?: Timestamp;
}

export interface Contest {
  id: string;
  name: string;
  platform: string;
  date: Timestamp;
  time: string;
  duration: string;
  link: string;
  participants?: number;
  prizes?: string;
}

export interface UserContest {
  id: string;
  userId: string;
  contestId: string;
  rank?: number;
  participated: boolean;
  registeredAt: Timestamp;
}

export interface Discussion {
  id: string;
  groupId: string;
  userId: string;
  username: string;
  title: string;
  content: string;
  tags: string[];
  replies: Reply[];
  likes: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Reply {
  id: string;
  userId: string;
  username: string;
  content: string;
  likes: string[];
  createdAt: Timestamp;
}

export interface CollegeUpdate {
  id: string;
  title: string;
  description: string;
  type: 'event' | 'workshop' | 'competition' | 'announcement';
  date: Timestamp;
  deadline?: Timestamp;
  link?: string;
  priority: 'high' | 'medium' | 'low';
  createdBy: string;
  createdAt: Timestamp;
}

export interface ChatMessage {
  id: string;
  userId: string;
  message: string;
  response: string;
  timestamp: Timestamp;
  category?: string;
}

export interface ChatHistory {
  id: string;
  userId: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}