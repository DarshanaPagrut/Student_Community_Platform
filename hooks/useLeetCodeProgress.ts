"use client";

import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  serverTimestamp,
  Timestamp,
  getDocs
} from 'firebase/firestore';
import { db } from '@/src/lib/firebase';

import { LeetCodeProblem, TopicProgress } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export const useLeetCodeProgress = () => {
  const { user } = useAuth();
  const [problems, setProblems] = useState<LeetCodeProblem[]>([]);
  const [topicProgress, setTopicProgress] = useState<TopicProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const problemsRef = collection(db, 'users', user.uid, 'problem_progress');
    const q = query(problemsRef, orderBy('lastAttemptedAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const problemsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as LeetCodeProblem[];
        
        setProblems(problemsData);
        calculateTopicProgress(problemsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching problems:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  const calculateTopicProgress = (problems: LeetCodeProblem[]) => {
    const topicMap = new Map<string, {
      total: number;
      solved: number;
      totalRating: number;
      ratedCount: number;
    }>();

    problems.forEach(problem => {
      const current = topicMap.get(problem.topic) || {
        total: 0,
        solved: 0,
        totalRating: 0,
        ratedCount: 0
      };

      current.total += 1;
      if (problem.status === 'Solved') {
        current.solved += 1;
      }
      if (problem.rating > 0) {
        current.totalRating += problem.rating;
        current.ratedCount += 1;
      }

      topicMap.set(problem.topic, current);
    });

    const progressData: TopicProgress[] = Array.from(topicMap.entries()).map(([topic, data]) => ({
      topic,
      totalProblems: data.total,
      solvedProblems: data.solved,
      completionRate: data.total > 0 ? (data.solved / data.total) * 100 : 0,
      averageRating: data.ratedCount > 0 ? data.totalRating / data.ratedCount : 0,
      lastUpdated: serverTimestamp() as Timestamp
    }));

    setTopicProgress(progressData);
  };

  const addProblem = async (problemData: Omit<LeetCodeProblem, 'id' | 'createdAt' | 'lastAttemptedAt'>) => {
    if (!user) return;

    try {
      const problemsRef = collection(db, 'users', user.uid, 'problem_progress');
      const newProblem: Omit<LeetCodeProblem, 'id'> = {
        ...problemData,
        lastAttemptedAt: serverTimestamp() as Timestamp,
        createdAt: serverTimestamp() as Timestamp
      };
      
      await addDoc(problemsRef, newProblem);
    } catch (error) {
      console.error('Error adding problem:', error);
      setError((error as Error).message);
    }
  };

  const updateProblem = async (problemId: string, updates: Partial<LeetCodeProblem>) => {
    if (!user) return;

    try {
      const problemRef = doc(db, 'users', user.uid, 'problem_progress', problemId);
      await updateDoc(problemRef, {
        ...updates,
        lastAttemptedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating problem:', error);
      setError((error as Error).message);
    }
  };

  const deleteProblem = async (problemId: string) => {
    if (!user) return;

    try {
      const problemRef = doc(db, 'users', user.uid, 'problem_progress', problemId);
      await deleteDoc(problemRef);
    } catch (error) {
      console.error('Error deleting problem:', error);
      setError((error as Error).message);
    }
  };

  const toggleProblemStatus = async (problemId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Solved' ? 'Unsolved' : 'Solved';
    const updates: Partial<LeetCodeProblem> = {
      status: newStatus as "Solved" | "Unsolved" | "Attempted"
    };
    
    if (newStatus === 'Solved') {
      updates.solvedAt = serverTimestamp() as Timestamp;
    }
    
    await updateProblem(problemId, updates);
  };

  const updateProblemRating = async (problemId: string, rating: number) => {
    await updateProblem(problemId, { rating });
  };

  const updateProblemNotes = async (problemId: string, notes: string) => {
    await updateProblem(problemId, { notes });
  };

  const incrementAttempts = async (problemId: string) => {
    const problem = problems.find(p => p.id === problemId);
    if (problem) {
      await updateProblem(problemId, { attempts: problem.attempts + 1 });
    }
  };

  const updateTimeSpent = async (problemId: string, additionalTime: number) => {
    const problem = problems.find(p => p.id === problemId);
    if (problem) {
      await updateProblem(problemId, { timeSpent: problem.timeSpent + additionalTime });
    }
  };

  const getProblemsByTopic = (topic: string) => {
    return problems.filter(problem => problem.topic === topic);
  };

  const getProblemsByDifficulty = (difficulty: "Easy" | "Medium" | "Hard") => {
    return problems.filter(problem => problem.difficulty === difficulty);
  };

  const getProblemsByStatus = (status: "Solved" | "Unsolved" | "Attempted") => {
    return problems.filter(problem => problem.status === status);
  };

  const getSolvedProblems = () => {
    return problems.filter(problem => problem.status === 'Solved');
  };

  const getProgressStats = () => {
    const totalProblems = problems.length;
    const solvedProblems = getSolvedProblems().length;
    const easyProblems = problems.filter(p => p.difficulty === 'Easy').length;
    const mediumProblems = problems.filter(p => p.difficulty === 'Medium').length;
    const hardProblems = problems.filter(p => p.difficulty === 'Hard').length;
    const easySolved = problems.filter(p => p.difficulty === 'Easy' && p.status === 'Solved').length;
    const mediumSolved = problems.filter(p => p.difficulty === 'Medium' && p.status === 'Solved').length;
    const hardSolved = problems.filter(p => p.difficulty === 'Hard' && p.status === 'Solved').length;

    return {
      totalProblems,
      solvedProblems,
      completionRate: totalProblems > 0 ? (solvedProblems / totalProblems) * 100 : 0,
      difficulty: {
        easy: { total: easyProblems, solved: easySolved },
        medium: { total: mediumProblems, solved: mediumSolved },
        hard: { total: hardProblems, solved: hardSolved }
      },
      averageRating: problems.reduce((sum, p) => sum + p.rating, 0) / problems.length || 0,
      totalTimeSpent: problems.reduce((sum, p) => sum + p.timeSpent, 0),
      totalAttempts: problems.reduce((sum, p) => sum + p.attempts, 0)
    };
  };

  const getStreakData = () => {
    const solvedProblems = getSolvedProblems()
      .filter(p => p.solvedAt)
      .sort((a, b) => b.solvedAt!.seconds - a.solvedAt!.seconds);

    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;
    let lastDate: Date | null = null;

    solvedProblems.forEach(problem => {
      const problemDate = new Date(problem.solvedAt!.seconds * 1000);
      problemDate.setHours(0, 0, 0, 0);

      if (!lastDate) {
        tempStreak = 1;
        lastDate = problemDate;
      } else {
        const diffTime = (lastDate as Date).getTime() - problemDate.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays === 1) {
          tempStreak++;
        } else if (diffDays > 1) {
          maxStreak = Math.max(maxStreak, tempStreak);
          tempStreak = 1;
        }
        lastDate = problemDate;
      }
    });

    maxStreak = Math.max(maxStreak, tempStreak);
    
    // Calculate current streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (lastDate && ((today.getTime() - (lastDate as Date).getTime()) / (1000 * 60 * 60 * 24) <= 1)) {
      currentStreak = tempStreak;
    }

    return { currentStreak, maxStreak };
  };

  return {
    problems,
    topicProgress,
    loading,
    error,
    addProblem,
    updateProblem,
    deleteProblem,
    toggleProblemStatus,
    updateProblemRating,
    updateProblemNotes,
    incrementAttempts,
    updateTimeSpent,
    getProblemsByTopic,
    getProblemsByDifficulty,
    getProblemsByStatus,
    getSolvedProblems,
    getProgressStats,
    getStreakData
  };
};
