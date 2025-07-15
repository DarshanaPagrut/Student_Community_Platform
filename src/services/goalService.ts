import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import { Goal } from '@/src/types/firebase';

export class GoalService {
  // Create new goal
  static async createGoal(userId: string, goalData: Omit<Goal, 'id' | 'userId' | 'createdAt'>) {
    try {
      const goalRef = doc(collection(db, 'goals'));
      const goal: Goal = {
        ...goalData,
        id: goalRef.id,
        userId,
        createdAt: Timestamp.now()
      };

      await setDoc(goalRef, goal);
      return { success: true, goal };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get user goals
  static async getUserGoals(userId: string) {
    try {
      const goalsRef = collection(db, 'goals');
      const q = query(
        goalsRef, 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const goals: Goal[] = [];
      querySnapshot.forEach((doc) => {
        goals.push(doc.data() as Goal);
      });

      return { success: true, goals };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Update goal progress
  static async updateGoalProgress(goalId: string, progress: number) {
    try {
      const goalRef = doc(db, 'goals', goalId);
      const goalDoc = await getDoc(goalRef);
      
      if (!goalDoc.exists()) {
        return { success: false, error: 'Goal not found' };
      }

      const goalData = goalDoc.data() as Goal;
      const newStatus = progress >= goalData.targetNumber ? 'completed' : 'active';

      await updateDoc(goalRef, {
        currentProgress: progress,
        status: newStatus
      });

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Delete goal
  static async deleteGoal(goalId: string) {
    try {
      await deleteDoc(doc(db, 'goals', goalId));
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get goal by ID
  static async getGoalById(goalId: string) {
    try {
      const goalDoc = await getDoc(doc(db, 'goals', goalId));
      if (goalDoc.exists()) {
        return { success: true, goal: goalDoc.data() as Goal };
      } else {
        return { success: false, error: 'Goal not found' };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Update goal
  static async updateGoal(goalId: string, updates: Partial<Goal>) {
    try {
      const goalRef = doc(db, 'goals', goalId);
      await updateDoc(goalRef, updates);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}