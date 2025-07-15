export interface User {
  id: string;
  email: string;
  leetcodeUsername: string;
  groupId: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  language: string;
  memberCount: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  currentStep: 'login' | 'register' | 'group-selection' | 'dashboard';
}

export interface CommunityUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'member';
  communityId: string;
  joinedAt: Date;
}

export interface Community {
  id: string;
  name: string;
  type: 'GDG' | 'IEEE' | 'ACM' | 'Other';
  description: string;
  college: string;
  adminId: string;
  inviteCode: string;
  createdAt: Date;
}

export interface CommunityAuthState {
  user: CommunityUser | null;
  community: Community | null;
  isAuthenticated: boolean;
  currentStep: 'type-selection' | 'dashboard';
}