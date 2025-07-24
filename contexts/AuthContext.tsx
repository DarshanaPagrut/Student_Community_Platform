"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  AuthError,
  UserCredential,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  DocumentData,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "@/src/lib/firebase";

// Enhanced Types for User System
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
  preferences: {
    theme: "light" | "dark";
    notifications: boolean;
    publicProfile: boolean;
  };
  stats: {
    totalProblems: number;
    solvedProblems: number;
    currentStreak: number;
    bestStreak: number;
    rank: number;
  };
}

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

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  dashboardStats: DashboardStats | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    username: string,
    leetcodeUsername: string
  ) => Promise<UserCredential>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updateDashboardStats: (updates: Partial<DashboardStats>) => Promise<void>;
  initializeDashboardStats: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize user profile and dashboard stats
  const initializeUserData = async (user: User) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Create new user profile
        const newUserProfile: UserProfile = {
          uid: user.uid,
          email: user.email || "",
          username: user.displayName || "",
          displayName: user.displayName || "",
          leetcodeUsername: "",
          photoURL: user.photoURL || "",
          group: null,
          createdAt: serverTimestamp() as Timestamp,
          lastLoginAt: serverTimestamp() as Timestamp,
          preferences: {
            theme: "light",
            notifications: true,
            publicProfile: false,
          },
          stats: {
            totalProblems: 0,
            solvedProblems: 0,
            currentStreak: 0,
            bestStreak: 0,
            rank: 0,
          },
        };

        await setDoc(userDocRef, newUserProfile);
        await initializeDashboardStats();
      } else {
        // Update last login
        await setDoc(
          userDocRef,
          {
            lastLoginAt: serverTimestamp(),
          },
          { merge: true }
        );
      }

      // Set up real-time listeners
      setupUserProfileListener(user.uid);
      setupDashboardStatsListener(user.uid);
    } catch (error) {
      console.error("Error initializing user data:", error);
      setError((error as Error).message);
    }
  };

  // Real-time user profile listener
  const setupUserProfileListener = (userId: string) => {
    const userDocRef = doc(db, "users", userId);

    const unsubscribe = onSnapshot(
      userDocRef,
      (doc) => {
        if (doc.exists()) {
          setUserProfile(doc.data() as UserProfile);
        }
      },
      (error) => {
        console.error("Error listening to user profile:", error);
        setError(error.message);
      }
    );

    return unsubscribe;
  };

  // Real-time dashboard stats listener
  const setupDashboardStatsListener = (userId: string) => {
    const statsDocRef = doc(db, "users", userId, "dashboard_stats", "current");

    const unsubscribe = onSnapshot(
      statsDocRef,
      (doc) => {
        if (doc.exists()) {
          setDashboardStats(doc.data() as DashboardStats);
        }
      },
      (error) => {
        console.error("Error listening to dashboard stats:", error);
        setError(error.message);
      }
    );

    return unsubscribe;
  };

  // Initialize dashboard stats for new users
  const initializeDashboardStats = async () => {
    if (!user) return;

    try {
      const statsDocRef = doc(
        db,
        "users",
        user.uid,
        "dashboard_stats",
        "current"
      );
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
    } catch (error) {
      console.error("Error initializing dashboard stats:", error);
      setError((error as Error).message);
    }
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    try {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(
        userDocRef,
        {
          ...updates,
          lastLoginAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating user profile:", error);
      setError((error as Error).message);
    }
  };

  // Update dashboard stats
  const updateDashboardStats = async (updates: Partial<DashboardStats>) => {
    if (!user) return;

    try {
      const statsDocRef = doc(
        db,
        "users",
        user.uid,
        "dashboard_stats",
        "current"
      );
      await setDoc(
        statsDocRef,
        {
          ...updates,
          lastUpdated: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating dashboard stats:", error);
      setError((error as Error).message);
    }
  };

  // Enhanced error handling
  const handleAuthError = (e: AuthError) => {
    switch (e.code) {
      case "auth/user-not-found":
        return "No user found with this email.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/email-already-in-use":
        return "Email already exists.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      case "auth/network-request-failed":
        return "Network error. Please check your connection.";
      default:
        return e.message;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await initializeUserData(userCredential.user);
    } catch (e) {
      const error = e as AuthError;
      setError(handleAuthError(error));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    username: string,
    leetcodeUsername: string
  ): Promise<UserCredential> => {
    try {
      setError(null);
      setLoading(true);

      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: username });

      // Create user profile with enhanced data
      const userProfile: UserProfile = {
        uid: cred.user.uid,
        email,
        username,
        displayName: username,
        leetcodeUsername,
        photoURL: "",
        group: null,
        createdAt: serverTimestamp() as Timestamp,
        lastLoginAt: serverTimestamp() as Timestamp,
        preferences: {
          theme: "light",
          notifications: true,
          publicProfile: false,
        },
        stats: {
          totalProblems: 0,
          solvedProblems: 0,
          currentStreak: 0,
          bestStreak: 0,
          rank: 0,
        },
      };

      await setDoc(doc(db, "users", cred.user.uid), userProfile);
      await initializeDashboardStats();

      setUser(cred.user);
      return cred;
    } catch (e) {
      const error = e as AuthError;
      setError(handleAuthError(error));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
      setDashboardStats(null);
    } catch (e) {
      const error = e as AuthError;
      setError(handleAuthError(error));
      throw error;
    }
  };

  const clearError = () => setError(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        await initializeUserData(user);
      } else {
        setUser(null);
        setUserProfile(null);
        setDashboardStats(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        dashboardStats,
        loading,
        login,
        register,
        logout,
        error,
        clearError,
        updateUserProfile,
        updateDashboardStats,
        initializeDashboardStats,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
