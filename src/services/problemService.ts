import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import { Problem, UserProblem } from '@/src/types/firebase';

export class ProblemService {
  // Add predefined problems (run once to populate database)
  static async addPredefinedProblems() {
    const problems: Omit<Problem, 'id'>[] = [
      {
        name: "Two Sum",
        difficulty: "Easy",
        leetcodeLink: "https://leetcode.com/problems/two-sum/",
        tags: ["Array", "Hash Table"],
        category: "Array"
      },
      {
        name: "Add Two Numbers",
        difficulty: "Medium",
        leetcodeLink: "https://leetcode.com/problems/add-two-numbers/",
        tags: ["Linked List", "Math"],
        category: "Linked List"
      },
      {
        name: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        leetcodeLink: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        tags: ["Hash Table", "String", "Sliding Window"],
        category: "String"
      },
      {
        name: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        leetcodeLink: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
        tags: ["Array", "Binary Search", "Divide and Conquer"],
        category: "Array"
      },
      {
        name: "Valid Parentheses",
        difficulty: "Easy",
        leetcodeLink: "https://leetcode.com/problems/valid-parentheses/",
        tags: ["String", "Stack"],
        category: "Stack"
      }
    ];

    try {
      for (const problem of problems) {
        const problemRef = doc(collection(db, 'problems'));
        await setDoc(problemRef, {
          ...problem,
          id: problemRef.id
        });
      }
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get all problems
  static async getAllProblems() {
    try {
      const problemsRef = collection(db, 'problems');
      const querySnapshot = await getDocs(problemsRef);
      
      const problems: Problem[] = [];
      querySnapshot.forEach((doc) => {
        problems.push(doc.data() as Problem);
      });

      return { success: true, problems };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get user's problem status
  static async getUserProblems(userId: string) {
    try {
      const userProblemsRef = collection(db, 'userProblems');
      const q = query(userProblemsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      const userProblems: UserProblem[] = [];
      querySnapshot.forEach((doc) => {
        userProblems.push(doc.data() as UserProblem);
      });

      return { success: true, userProblems };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Update problem status
  static async updateProblemStatus(userId: string, problemId: string, status: 'Unsolved' | 'Solving' | 'Solved') {
    try {
      const userProblemRef = doc(db, 'userProblems', `${userId}_${problemId}`);
      const userProblemDoc = await getDoc(userProblemRef);

      if (userProblemDoc.exists()) {
        // Update existing record
        await updateDoc(userProblemRef, {
          status,
          ...(status === 'Solved' && { solvedAt: Timestamp.now() }),
          attempts: userProblemDoc.data().attempts + 1
        });
      } else {
        // Create new record
        const userProblem: UserProblem = {
          id: `${userId}_${problemId}`,
          userId,
          problemId,
          status,
          attempts: 1,
          ...(status === 'Solved' && { solvedAt: Timestamp.now() })
        };
        await setDoc(userProblemRef, userProblem);
      }

      // Update user's total solved count if problem is solved
      if (status === 'Solved') {
        await this.updateUserStats(userId);
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Update user statistics
  private static async updateUserStats(userId: string) {
    try {
      const userProblemsRef = collection(db, 'userProblems');
      const q = query(
        userProblemsRef, 
        where('userId', '==', userId),
        where('status', '==', 'Solved')
      );
      const querySnapshot = await getDocs(q);
      
      const totalSolved = querySnapshot.size;
      
      // Calculate weekly solved (last 7 days)
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      let weeklySolved = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data() as UserProblem;
        if (data.solvedAt && data.solvedAt.toDate() >= weekAgo) {
          weeklySolved++;
        }
      });

      // Update user profile
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        'profile.totalSolved': totalSolved,
        'profile.weeklySolved': weeklySolved,
        updatedAt: Timestamp.now()
      });

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get daily challenge
  static async getDailyChallenge() {
    try {
      // For now, return a random problem as daily challenge
      // In production, you might want to have a separate collection for daily challenges
      const problemsRef = collection(db, 'problems');
      const querySnapshot = await getDocs(problemsRef);
      
      const problems: Problem[] = [];
      querySnapshot.forEach((doc) => {
        problems.push(doc.data() as Problem);
      });

      if (problems.length > 0) {
        const randomIndex = Math.floor(Math.random() * problems.length);
        return { success: true, challenge: problems[randomIndex] };
      } else {
        return { success: false, error: 'No problems found' };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}