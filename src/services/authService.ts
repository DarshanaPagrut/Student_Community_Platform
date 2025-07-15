import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  User 
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '@/src/lib/firebase';
import { FirebaseUser } from '@/src/types/firebase';

export class AuthService {
  // Register new user
  static async register(email: string, password: string, username: string, leetcodeUsername?: string) {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      const userData: FirebaseUser = {
        uid: user.uid,
        email: user.email!,
        username,
        leetcodeUsername,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        profile: {
          name: username,
          learningTopic: '',
          maxStreak: 0,
          currentStreak: 0,
          totalSolved: 0,
          weeklySolved: 0,
          badges: [],
          lastActiveDate: new Date().toISOString().split('T')[0]
        }
      };

      await setDoc(doc(db, 'users', user.uid), userData);
      return { success: true, user: userData };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Login user
  static async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data() as FirebaseUser;
        return { success: true, user: userData };
      } else {
        return { success: false, error: 'User data not found' };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Sign out user
  static async signOut() {
    try {
      await firebaseSignOut(auth);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get current user data
  static async getCurrentUser(uid: string) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return { success: true, user: userDoc.data() as FirebaseUser };
      } else {
        return { success: false, error: 'User not found' };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Update user profile
  static async updateProfile(uid: string, updates: Partial<FirebaseUser>) {
    try {
      await updateDoc(doc(db, 'users', uid), {
        ...updates,
        updatedAt: Timestamp.now()
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}