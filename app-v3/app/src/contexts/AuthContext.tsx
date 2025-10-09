/**
 * AuthContext
 *
 * Manages user authentication and session
 * Uses mock authentication for demo purposes
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, LoginCredentials, AuthState } from '@/types/user.types';

interface AuthContextType extends AuthState {
  /** Login with credentials */
  login: (credentials: LoginCredentials) => Promise<void>;
  /** Logout current user */
  logout: () => void;
  /** Update user profile */
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'emarat-auth';

/**
 * Mock User Data (Sarah Al-Mansouri from UX Strategy)
 */
const MOCK_USER: User = {
  id: 'user-001',
  name: 'Sarah Al-Mansouri',
  email: 'sarah.almansouri@emarat.ae',
  role: 'manager',
  department: 'Procurement',
  title: 'VP of Procurement',
  avatar: undefined, // Can add avatar URL later
  language: 'en',
  theme: 'system',
  createdAt: '2024-01-15T08:00:00Z',
  lastLogin: new Date().toISOString(),
};

/**
 * Mock login function
 * In production, this would call an API
 */
async function mockLogin(credentials: LoginCredentials): Promise<User> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock validation - accept any email with password "demo"
  if (credentials.password !== 'demo') {
    throw new Error('Invalid credentials. Use password: "demo"');
  }

  // Return mock user with updated lastLogin
  return {
    ...MOCK_USER,
    email: credentials.email || MOCK_USER.email,
    lastLogin: new Date().toISOString(),
  };
}

/**
 * Get stored auth from localStorage
 */
function getStoredAuth(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to read auth from localStorage:', error);
  }
  return null;
}

/**
 * Store auth to localStorage
 */
function storeAuth(user: User | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Failed to save auth to localStorage:', error);
  }
}

interface AuthProviderProps {
  children: ReactNode;
  /** Auto-login for demo (skips login screen) */
  autoLogin?: boolean;
}

/**
 * AuthProvider Component
 *
 * Wraps the app to provide authentication
 * Manages user session and persistence
 */
export function AuthProvider({ children, autoLogin = false }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Initialize auth from localStorage
  useEffect(() => {
    const storedUser = getStoredAuth();

    if (storedUser) {
      setState({
        user: storedUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } else if (autoLogin) {
      // Auto-login with mock user for demo
      setState({
        user: MOCK_USER,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      storeAuth(MOCK_USER);
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [autoLogin]);

  const login = async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const user = await mockLogin(credentials);

      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      storeAuth(user);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: message,
      });
      throw error;
    }
  };

  const logout = () => {
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    storeAuth(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!state.user) return;

    const updatedUser = { ...state.user, ...updates };
    setState((prev) => ({ ...prev, user: updatedUser }));
    storeAuth(updatedUser);
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth Hook
 *
 * Access authentication state and methods in any component
 *
 * @example
 * ```tsx
 * const { user, isAuthenticated, login, logout } = useAuth();
 *
 * // Show user info
 * {isAuthenticated && (
 *   <div>
 *     <p>Welcome, {user?.name}!</p>
 *     <button onClick={logout}>Logout</button>
 *   </div>
 * )}
 *
 * // Login form
 * <button onClick={() => login({ email: 'user@example.com', password: 'demo' })}>
 *   Login
 * </button>
 * ```
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Named exports for convenience
AuthProvider.displayName = 'AuthProvider';
