import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import { FirebaseUser } from '@/src/types/firebase';

export interface LeaderboardEntry {
  userId: string;
  username: string;
  totalSolved: number;
  currentStreak: number;
  maxStreak: number;
  weeklySolved: number;
  contestRank?: number;
  score: number;
  groupId?: string;
}

export class LeaderboardService {
  // Calculate user score based on various factors
  private static calculateScore(user: FirebaseUser, contestRank?: number): number {
    const { totalSolved, currentStreak, maxStreak, weeklySolved } = user.profile;
    
    let score = 0;
    
    // Points for problems solved (Easy: 1, Medium: 3, Hard: 5)
    // For simplicity, assuming average difficulty gives 2.5 points per problem
    score += totalSolved * 2.5;
    
    // Streak bonus (2 points per day)
    score += currentStreak * 2;
    
    // Max streak achievement bonus
    score += maxStreak * 0.5;
    
    // Weekly activity bonus
    score += weeklySolved * 5;
    
    // Contest performance bonus (higher rank = lower number = more points)
    if (contestRank) {
      score += Math.max(0, 1000 - contestRank);
    }
    
    return Math.round(score);
  }

  // Get group leaderboard
  static async getGroupLeaderboard(groupId: string) {
    try {
      const usersRef = collection(db, 'users');
      const q = query(
        usersRef, 
        where('groupId', '==', groupId),
        orderBy('profile.totalSolved', 'desc'),
        limit(50)
      );
      
      const querySnapshot = await getDocs(q);
      const leaderboard: LeaderboardEntry[] = [];
      
      querySnapshot.forEach((doc) => {
        const user = doc.data() as FirebaseUser;
        const entry: LeaderboardEntry = {
          userId: user.uid,
          username: user.username,
          totalSolved: user.profile.totalSolved,
          currentStreak: user.profile.currentStreak,
          maxStreak: user.profile.maxStreak,
          weeklySolved: user.profile.weeklySolved,
          score: this.calculateScore(user),
          groupId: user.groupId
        };
        leaderboard.push(entry);
      });

      // Sort by score
      leaderboard.sort((a, b) => b.score - a.score);

      return { success: true, leaderboard };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get global leaderboard (across all groups)
  static async getGlobalLeaderboard() {
    try {
      const usersRef = collection(db, 'users');
      const q = query(
        usersRef,
        orderBy('profile.totalSolved', 'desc'),
        limit(100)
      );
      
      const querySnapshot = await getDocs(q);
      const leaderboard: LeaderboardEntry[] = [];
      
      querySnapshot.forEach((doc) => {
        const user = doc.data() as FirebaseUser;
        const entry: LeaderboardEntry = {
          userId: user.uid,
          username: user.username,
          totalSolved: user.profile.totalSolved,
          currentStreak: user.profile.currentStreak,
          maxStreak: user.profile.maxStreak,
          weeklySolved: user.profile.weeklySolved,
          score: this.calculateScore(user),
          groupId: user.groupId
        };
        leaderboard.push(entry);
      });

      // Sort by score
      leaderboard.sort((a, b) => b.score - a.score);

      return { success: true, leaderboard };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get inter-group leaderboard (average scores by group)
  static async getInterGroupLeaderboard() {
    try {
      const groupsRef = collection(db, 'groups');
      const groupsSnapshot = await getDocs(groupsRef);
      
      const groupLeaderboard: any[] = [];
      
      for (const groupDoc of groupsSnapshot.docs) {
        const group = groupDoc.data();
        
        // Get group members
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('groupId', '==', group.id));
        const usersSnapshot = await getDocs(q);
        
        let totalScore = 0;
        let memberCount = 0;
        
        usersSnapshot.forEach((userDoc) => {
          const user = userDoc.data() as FirebaseUser;
          totalScore += this.calculateScore(user);
          memberCount++;
        });
        
        if (memberCount > 0) {
          groupLeaderboard.push({
            groupId: group.id,
            groupName: group.name,
            averageScore: Math.round(totalScore / memberCount),
            memberCount,
            totalScore
          });
        }
      }

      // Sort by average score
      groupLeaderboard.sort((a, b) => b.averageScore - a.averageScore);

      return { success: true, groupLeaderboard };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get user rank in group
  static async getUserRankInGroup(userId: string, groupId: string) {
    try {
      const result = await this.getGroupLeaderboard(groupId);
      if (result.success && Array.isArray(result.leaderboard)) {
        const userIndex = result.leaderboard.findIndex(entry => entry.userId === userId);
        return { success: true, rank: userIndex + 1 };
      }
      return { success: false, error: 'Failed to get leaderboard' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}