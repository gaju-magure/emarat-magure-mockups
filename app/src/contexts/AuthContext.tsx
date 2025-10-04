import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithSSO: (provider: 'microsoft' | 'google') => Promise<void>;
  logout: () => void;
  switchUser: (email: string) => void;
  verify2FA: (code: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const savedUser = localStorage.getItem('emarat-user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user database for testing different flows
      const mockUsers: Record<string, User> = {
        'sarah@emarat.ae': {
          id: '1',
          email: 'sarah@emarat.ae',
          name: 'Sarah Johnson',
          role: 'Store Manager',
          department: 'Retail Operations',
        },
        'fatima@emarat.ae': {
          id: '2',
          email: 'fatima@emarat.ae',
          name: 'Fatima Al Mansoori',
          role: 'HR Manager',
          department: 'Human Resources',
        },
        'ali@emarat.ae': {
          id: '3',
          email: 'ali@emarat.ae',
          name: 'Ali Hassan',
          role: 'Fuel Station Attendant',
          department: 'Operations',
        },
        'rashid@emarat.ae': {
          id: '4',
          email: 'rashid@emarat.ae',
          name: 'Rashid Ahmed',
          role: 'Finance Manager',
          department: 'Finance',
        },
        'layla@emarat.ae': {
          id: '5',
          email: 'layla@emarat.ae',
          name: 'Layla Ibrahim',
          role: 'Retail Store Employee',
          department: 'Retail',
        },
        'mohammed@emarat.ae': {
          id: '6',
          email: 'mohammed@emarat.ae',
          name: 'Mohammed Khalil',
          role: 'Procurement Specialist',
          department: 'Procurement',
        },
      };

      // Find user by email or use default
      const mockUser = mockUsers[email.toLowerCase()] || {
        id: '999',
        email,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        role: 'Employee',
        department: 'General',
      };

      setUser(mockUser);
      localStorage.setItem('emarat-user', JSON.stringify(mockUser));
      localStorage.setItem('emarat-auth-token', 'mock-jwt-token');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithSSO = async (provider: 'microsoft' | 'google') => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual SSO implementation
      console.log(`SSO login with ${provider}`);

      // Simulate SSO flow
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockUser: User = {
        id: '1',
        email: 'user@emarat.ae',
        name: 'SSO User',
        role: 'Employee',
        department: 'Operations',
      };

      setUser(mockUser);
      localStorage.setItem('emarat-user', JSON.stringify(mockUser));
      localStorage.setItem('emarat-auth-token', 'mock-sso-token');
    } catch (error) {
      console.error('SSO login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('emarat-user');
    localStorage.removeItem('emarat-auth-token');
  };

  const switchUser = (email: string) => {
    // Mock user database for demo/testing
    const mockUsers: Record<string, User> = {
      'sarah@emarat.ae': {
        id: '1',
        email: 'sarah@emarat.ae',
        name: 'Sarah Johnson',
        role: 'Store Manager',
        department: 'Retail Operations',
      },
      'fatima@emarat.ae': {
        id: '2',
        email: 'fatima@emarat.ae',
        name: 'Fatima Al Mansoori',
        role: 'HR Manager',
        department: 'Human Resources',
      },
      'ali@emarat.ae': {
        id: '3',
        email: 'ali@emarat.ae',
        name: 'Ali Hassan',
        role: 'Fuel Station Attendant',
        department: 'Operations',
      },
      'rashid@emarat.ae': {
        id: '4',
        email: 'rashid@emarat.ae',
        name: 'Rashid Ahmed',
        role: 'Finance Manager',
        department: 'Finance',
      },
      'layla@emarat.ae': {
        id: '5',
        email: 'layla@emarat.ae',
        name: 'Layla Ibrahim',
        role: 'Retail Store Employee',
        department: 'Retail',
      },
      'mohammed@emarat.ae': {
        id: '6',
        email: 'mohammed@emarat.ae',
        name: 'Mohammed Khalil',
        role: 'Procurement Specialist',
        department: 'Procurement',
      },
    };

    const selectedUser = mockUsers[email];
    if (selectedUser) {
      setUser(selectedUser);
      localStorage.setItem('emarat-user', JSON.stringify(selectedUser));
    }
  };

  const verify2FA = async (code: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual 2FA verification
      await new Promise(resolve => setTimeout(resolve, 800));

      if (code !== '123456') {
        throw new Error('Invalid 2FA code');
      }

      // 2FA verified, update user state
      console.log('2FA verified');
    } catch (error) {
      console.error('2FA verification failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const requestPasswordReset = async (email: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Password reset email sent to:', email);
    } catch (error) {
      console.error('Password reset request failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Password reset successful for token:', token);
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    loginWithSSO,
    logout,
    switchUser,
    verify2FA,
    requestPasswordReset,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
