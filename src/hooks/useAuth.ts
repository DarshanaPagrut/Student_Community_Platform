import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/src/lib/firebase';
import { AuthService } from '@/src/services/authService';
import { FirebaseUser } from '@/src/types/firebase';

export const useAuth = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (firebaseUser) {
        // Get user data from Firestore
        const result = await AuthService.getCurrentUser(firebaseUser.uid);
        if (result.success) {
          setUser(result.user ?? null);
        } else {
          setError(result.error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    const result = await AuthService.login(email, password);
    if (result.success) {
      setUser(result.user ?? null);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
    return result;
  };

  const register = async (email: string, password: string, username: string, leetcodeUsername?: string) => {
    setLoading(true);
    setError(null);
    
    const result = await AuthService.register(email, password, username, leetcodeUsername);
    if (result.success) {
      setUser(result.user ?? null);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
    return result;
  };

  const logout = async () => {
    setLoading(true);
    const result = await AuthService.signOut();
    if (result.success) {
      setUser(null);
    }
    setLoading(false);
    return result;
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };
};