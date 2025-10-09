'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '@/types';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isEditor: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger le token au démarrage
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulation d'appel API avec données mockées
    // TODO: Remplacer par votre vraie API quand le backend sera prêt
    
    // Utilisateurs de test
    const mockUsers: Record<string, User> = {
      'john.doe@example.com': {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: UserRole.ADMIN,
      },
      'jane.smith@example.com': {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        role: UserRole.EDITOR,
      },
      'bob.johnson@example.com': {
        id: '3',
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob.johnson@example.com',
        role: UserRole.VIEWER,
      },

      'sempybobo@gmail.com': {
        id: '4',
        firstName: 'sempy',
        lastName: 'bobo',
        email: 'sempybobo@gmail.com',
        role: UserRole.ADMIN,
      },
      'toureidiatou@gmail.com': {
        id: '5',
        firstName: 'toure',
        lastName: 'idiatou',
        email: 'toureidiatou@gmail.com',
        role: UserRole.EDITOR,
      },
      

    };

    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUser = mockUsers[email.toLowerCase()];
    
    if (!mockUser || password !== 'password123') {
      throw new Error('Email ou mot de passe incorrect');
    }
    
    const mockToken = 'mock_jwt_token_' + Date.now();
    
    // Sauvegarder dans localStorage
    localStorage.setItem('auth_token', mockToken);
    localStorage.setItem('auth_user', JSON.stringify(mockUser));
    
    setToken(mockToken);
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    isAdmin: user?.role === UserRole.ADMIN,
    isEditor: user?.role === UserRole.EDITOR || user?.role === UserRole.ADMIN,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
