"use client";

import { useState, useEffect } from 'react';
import { 
  doc, 
  onSnapshot, 
  setDoc, 
  serverTimestamp, 
  increment,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/src/lib/firebase';

import { DashboardStats } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export const useDashboardStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const statsDocRef = doc(db, 'users', user.uid, 'dashboard_stats', 'current');
    
    const unsubscribe = onSnapshot(statsDocRef, 
      (doc) => {
        if (doc.exists()) {
          setStats(doc.data() as DashboardStats);
        } else {
          // Initialize stats if they don't exist
          initializeStats();
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching dashboard stats:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  const initializeStats = async () => {
    if (!user) return;
    
    const statsDocRef = doc(db, 'users', user.uid, 'dashboard_stats', 'current');
    const initialStats: DashboardStats = {
      problemsSolved: 0,
      currentStreak: 0,
      bestStreak: 0,
      groupRank: 0,
      contestRank: 0,
      weeklyGoal: 10,
      weeklyProgress: 0,
      studyTimeToday: 0,
      studyTimeWeek: 0,
      lastUpdated: serverTimestamp() as Timestamp,
    };
    
    await setDoc(statsDocRef, initialStats);
  };

  const updateStats = async (updates: Partial<DashboardStats>) => {
    if (!user) return;

    try {
      const statsDocRef = doc(db, 'users', user.uid, 'dashboard_stats', 'current');
      await setDoc(statsDocRef, {
        ...updates,
        lastUpdated: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error('Error updating dashboard stats:', error);
      setError((error as Error).message);
    }
  };

  const incrementProblemsSolved = async () => {
    if (!user || !stats) return;
    
    const newCount = stats.problemsSolved + 1;
    const newWeeklyProgress = stats.weeklyProgress + 1;
    const newStreak = stats.currentStreak + 1;
    
    await updateStats({
      problemsSolved: newCount,
      weeklyProgress: newWeeklyProgress,
      currentStreak: newStreak,
      bestStreak: Math.max(stats.bestStreak, newStreak)
    });
  };

  const updateStudyTime = async (minutes: number) => {
    if (!user || !stats) return;
    
    await updateStats({
      studyTimeToday: stats.studyTimeToday + minutes,
      studyTimeWeek: stats.studyTimeWeek + minutes
    });
  };

  const resetDailyStats = async () => {
    if (!user) return;
    
    await updateStats({
      studyTimeToday: 0
    });
  };

  const resetWeeklyStats = async () => {
    if (!user) return;
    
    await updateStats({
      weeklyProgress: 0,
      studyTimeWeek: 0
    });
  };

  const updateWeeklyGoal = async (goal: number) => {
    await updateStats({ weeklyGoal: goal });
  };

  const updateRanks = async (groupRank: number, contestRank: number) => {
    await updateStats({ groupRank, contestRank });
  };

  return {
    stats,
    loading,
    error,
    updateStats,
    incrementProblemsSolved,
    updateStudyTime,
    resetDailyStats,
    resetWeeklyStats,
    updateWeeklyGoal,
    updateRanks
  };
};
