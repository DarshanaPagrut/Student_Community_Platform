"use client";

import { useState, useEffect } from 'react';
import { 
  collection, 
  doc,
  onSnapshot, 
  addDoc,
  updateDoc,
  query, 
  orderBy, 
  where,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Contest, ContestParticipation } from '@/types';

export const useContests = () => {
  const { user } = useAuth();
  const [contests, setContests] = useState<Contest[]>([]);
  const [userParticipations, setUserParticipations] = useState<ContestParticipation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load contests
    const contestsRef = collection(db, 'contests');
    const q = query(contestsRef, orderBy('date', 'asc'));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const contestsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Contest[];
        
        setContests(contestsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching contests:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) return;

    // Load user participations
    const participationsRef = collection(db, 'contest_participations');
    const q = query(participationsRef, where('userId', '==', user.uid));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const participationsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ContestParticipation[];
        
        setUserParticipations(participationsData);
      },
      (error) => {
        console.error('Error fetching user participations:', error);
        setError(error.message);
      }
    );

    return unsubscribe;
  }, [user]);

  const addReminder = async (contestId: string) => {
    if (!user) return;

    try {
      const participationsRef = collection(db, 'contest_participations');
      const participation: Omit<ContestParticipation, 'id'> = {
        contestId,
        userId: user.uid,
        isReminded: true,
        createdAt: serverTimestamp() as Timestamp
      };
      
      await addDoc(participationsRef, participation);
    } catch (error) {
      console.error('Error adding reminder:', error);
      setError((error as Error).message);
    }
  };

  const removeReminder = async (contestId: string) => {
    if (!user) return;

    try {
      const participation = userParticipations.find(p => p.contestId === contestId);
      if (participation) {
        const participationRef = doc(db, 'contest_participations', participation.id);
        await updateDoc(participationRef, {
          isReminded: false
        });
      }
    } catch (error) {
      console.error('Error removing reminder:', error);
      setError((error as Error).message);
    }
  };

  const recordParticipation = async (
    contestId: string, 
    rank: number, 
    score: number, 
    problemsSolved: number, 
    timeSpent: number
  ) => {
    if (!user) return;

    try {
      const participation = userParticipations.find(p => p.contestId === contestId);
      if (participation) {
        const participationRef = doc(db, 'contest_participations', participation.id);
        await updateDoc(participationRef, {
          rank,
          score,
          problemsSolved,
          timeSpent,
          participatedAt: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Error recording participation:', error);
      setError((error as Error).message);
    }
  };

  const getUpcomingContests = () => {
    const now = new Date();
    return contests.filter(contest => {
      const contestDate = new Date(contest.date);
      return contestDate >= now && contest.status === 'upcoming';
    });
  };

  const getOngoingContests = () => {
    return contests.filter(contest => contest.status === 'ongoing');
  };

  const getContestsByPlatform = (platform: Contest['platform']) => {
    return contests.filter(contest => contest.platform === platform);
  };

  const isUserReminded = (contestId: string) => {
    return userParticipations.some(p => p.contestId === contestId && p.isReminded);
  };

  const hasUserParticipated = (contestId: string) => {
    return userParticipations.some(p => p.contestId === contestId && p.participatedAt);
  };

  return {
    contests,
    userParticipations,
    loading,
    error,
    addReminder,
    removeReminder,
    recordParticipation,
    getUpcomingContests,
    getOngoingContests,
    getContestsByPlatform,
    isUserReminded,
    hasUserParticipated
  };
};
