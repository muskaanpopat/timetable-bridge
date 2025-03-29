
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';

export type UserRole = 'student' | 'committee-head' | 'exam-cell' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'Committee Admin',
    email: 'committee@somaiya.edu',
    password: 'password123',
    role: 'committee-head' as UserRole,
  },
  {
    id: '2',
    name: 'Student User',
    email: 'student@somaiya.edu',
    password: 'password123',
    role: 'student' as UserRole,
  },
  {
    id: '3',
    name: 'Exam Cell Admin',
    email: 'examcell@somaiya.edu',
    password: 'password123',
    role: 'exam-cell' as UserRole,
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('kj-connect-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string) => {
    // Simulating API call
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('kj-connect-user', JSON.stringify(userWithoutPassword));
      toast.success('Logged in successfully');
      return true;
    } else {
      toast.error('Invalid email or password');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kj-connect-user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
