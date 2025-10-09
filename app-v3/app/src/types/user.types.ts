/**
 * User and Authentication Types
 */

export interface User {
  /** User ID */
  id: string;
  /** Full name */
  name: string;
  /** Email address */
  email: string;
  /** User role */
  role: UserRole;
  /** Department */
  department: string;
  /** Job title */
  title: string;
  /** Avatar URL */
  avatar?: string;
  /** Preferred language */
  language?: 'en' | 'ar';
  /** Preferred theme */
  theme?: 'light' | 'dark' | 'system';
  /** Account created date */
  createdAt: string;
  /** Last login date */
  lastLogin?: string;
}

export type UserRole =
  | 'admin'           // Full system access
  | 'manager'         // Department/team management
  | 'user'            // Standard user
  | 'viewer';         // Read-only access

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthState {
  /** Current authenticated user */
  user: User | null;
  /** Is user authenticated */
  isAuthenticated: boolean;
  /** Is authentication being checked */
  isLoading: boolean;
  /** Authentication error */
  error: string | null;
}
