export type UserRole = 'admin' | 'ta_member' | 'panelist';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  token: string;
  role: UserRole;
}

export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  image: string;
  university: string;
  bloodGroup: string;
  birthDate: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
  };
}

export interface DummyTodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface DummyPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: { likes: number; dislikes: number };
  views: number;
  userId: number;
}

export interface PaginatedResponse<T> {
  total: number;
  skip: number;
  limit: number;
  users?: T[];
  todos?: T[];
  posts?: T[];
}

// Simulated interview status derived from user data
export type InterviewStatus = 'scheduled' | 'completed' | 'no_show' | 'pending';

export interface RolePermission {
  canViewCandidates: boolean;
  canViewFeedback: boolean;
  canSubmitFeedback: boolean;
  canManageRoles: boolean;
  canViewSchedule: boolean;
  canViewDashboard: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermission> = {
  admin: {
    canViewCandidates: true,
    canViewFeedback: true,
    canSubmitFeedback: false,
    canManageRoles: true,
    canViewSchedule: true,
    canViewDashboard: true,
  },
  ta_member: {
    canViewCandidates: true,
    canViewFeedback: true,
    canSubmitFeedback: false,
    canManageRoles: false,
    canViewSchedule: true,
    canViewDashboard: true,
  },
  panelist: {
    canViewCandidates: true,
    canViewFeedback: true,
    canSubmitFeedback: true,
    canManageRoles: false,
    canViewSchedule: true,
    canViewDashboard: true,
  },
};

export interface FeedbackFormData {
  overallScore: number;
  strengths: string;
  areasForImprovement: string;
}

export interface SimulatedRoleAssignment {
  userId: number;
  username: string;
  assignedRole: UserRole;
}
