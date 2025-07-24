"use client";

import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import { CollegeUpdate } from '@/types';

export const useCollegeUpdates = () => {
  const [updates, setUpdates] = useState<CollegeUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updatesRef = collection(db, 'college_updates');
    const q = query(
      updatesRef, 
      where('isPublic', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const updatesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as CollegeUpdate[];
        
        setUpdates(updatesData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching college updates:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const getUpdatesByType = (type: CollegeUpdate['type']) => {
    return updates.filter(update => update.type === type);
  };

  const getUpdatesByPriority = (priority: CollegeUpdate['priority']) => {
    return updates.filter(update => update.priority === priority);
  };

  const getUpcomingUpdates = () => {
    const now = new Date();
    return updates.filter(update => {
      const updateDate = new Date(update.date);
      return updateDate >= now;
    });
  };

  return {
    updates,
    loading,
    error,
    getUpdatesByType,
    getUpdatesByPriority,
    getUpcomingUpdates
  };
};
