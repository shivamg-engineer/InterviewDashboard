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