# 📘 Guide Complet - Développeur A (Structure & Sécurité)

## 🎯 Vue d'Ensemble

Vous êtes responsable de la **structure, navigation et sécurité** de l'application. Le Développeur B a déjà créé toutes les pages fonctionnelles. Votre mission est de sécuriser l'accès et gérer l'authentification.

---

## ✅ Ce qui est Déjà Fait par le Développeur B

- ✅ Projet Next.js initialisé avec TailwindCSS
- ✅ Redux Toolkit + RTK Query configurés
- ✅ Layout Dashboard (Header + Sidebar + contenu)
- ✅ Skeleton Loaders créés
- ✅ Composants UI réutilisables (Button, Modal, Input, Select, Badge, Card)
- ✅ Formatage des dates avec fonctions utilitaires
- ✅ Toutes les pages fonctionnelles

---

## 📋 Votre Checklist

### 1. ✅ Navigation Dynamique selon Rôle
**Statut**: Partiellement fait - À améliorer

**Fichier**: `src/components/layout/Sidebar.tsx` (ligne 56-60)

**Ce qui existe**:
```tsx
const userRole = 'ADMIN'; // Mock
const isAdmin = userRole === 'ADMIN';
```

**À faire**:

#### Étape 1: Créer un Context d'Authentification

Créez `src/contexts/AuthContext.tsx`:

```tsx
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

  // Charger le token au démarrage
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Remplacer par votre vraie API
    // Pour l'instant, simulation avec données mockées
    
    // Simulation d'appel API
    const mockUser: User = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: email,
      role: UserRole.ADMIN, // Changez selon l'utilisateur
    };
    
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

#### Étape 2: Intégrer le AuthProvider

Modifiez `src/app/layout.tsx`:

```tsx
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <StoreProvider>
            {children}
            <Toaster />
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
```

#### Étape 3: Utiliser le Context dans la Sidebar

Modifiez `src/components/layout/Sidebar.tsx`:

```tsx
import { useAuth } from '@/contexts/AuthContext';

export function Sidebar({ isOpen, onClose, isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const { user, isAdmin } = useAuth(); // ← Utiliser le context

  return (
    // ... reste du code
  );
}
```

---

### 2. ⚠️ Composant ProtectedRoute
**Statut**: À créer

Créez `src/components/auth/ProtectedRoute.tsx`:

```tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requireAuth?: boolean;
}

export function ProtectedRoute({ 
  children, 
  requiredRole,
  requireAuth = true 
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Si l'authentification est requise et l'utilisateur n'est pas connecté
    if (requireAuth && !isAuthenticated) {
      router.push('/login');
      return;
    }

    // Si un rôle spécifique est requis
    if (requiredRole && user?.role !== requiredRole) {
      // Si l'utilisateur n'est pas admin et que admin est requis
      if (requiredRole === UserRole.ADMIN && user?.role !== UserRole.ADMIN) {
        router.push('/dashboard'); // Rediriger vers dashboard
        return;
      }
    }
  }, [isAuthenticated, user, requiredRole, requireAuth, router]);

  // Afficher un loader pendant la vérification
  if (requireAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
```

#### Utilisation dans les pages

**Pour les pages Admin** (users, admin/contents, logs):

Modifiez `src/app/(Dashboard)/users/page.tsx`:

```tsx
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types';

export default function UsersPage() {
  // ... votre code existant

  return (
    <ProtectedRoute requiredRole={UserRole.ADMIN}>
      <div className="space-y-6">
        {/* Votre contenu existant */}
      </div>
    </ProtectedRoute>
  );
}
```

**Pour les pages accessibles à tous** (dashboard, contents):

```tsx
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      {/* Votre contenu */}
    </ProtectedRoute>
  );
}
```

---

### 3. ⚠️ Page de Login
**Statut**: À créer

Créez `src/app/login/page.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Connexion réussie !');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">NT</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">NG TECH</h1>
            <p className="text-gray-600 mt-2">Gestion de Contenu</p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
            />

            <Input
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              Se connecter
            </Button>
          </form>

          {/* Comptes de test */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Comptes de test :</p>
            <div className="text-xs text-gray-600 space-y-1">
              <p>👑 Admin: john.doe@example.com</p>
              <p>✏️ Editor: jane.smith@example.com</p>
              <p>👁️ Viewer: bob.johnson@example.com</p>
              <p className="mt-2 text-gray-500">Mot de passe: password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### 4. ⚠️ Bouton de Déconnexion
**Statut**: À ajouter

Modifiez `src/components/layout/Header.tsx`:

```tsx
import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <header className="...">
      {/* Votre code existant */}
      
      {/* Ajouter le bouton de déconnexion */}
      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-sm text-gray-700">
              {user.firstName} {user.lastName}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </>
        )}
      </div>
    </header>
  );
}
```

---

### 5. ⚠️ Redirection de la Page d'Accueil
**Statut**: À créer

Modifiez `src/app/page.tsx`:

```tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}
```

---

### 6. ✅ Stockage du Token
**Statut**: Déjà implémenté dans AuthContext

Le token est stocké dans `localStorage` :
- `auth_token` : Le token JWT
- `auth_user` : Les informations de l'utilisateur

---

### 7. ✅ Skeleton Loaders
**Statut**: Déjà créés par le Développeur B

Fichier: `src/components/ui/SkeletonLoader.tsx`

Disponibles:
- `CardSkeleton` - Pour les cartes
- `TableSkeleton` - Pour les tableaux

---

### 8. ✅ Composants UI Réutilisables
**Statut**: Déjà créés par le Développeur B

Fichiers disponibles:
- `src/components/ui/Button.tsx`
- `src/components/ui/Modal.tsx`
- `src/components/ui/Input.tsx`
- `src/components/ui/Select.tsx`
- `src/components/ui/Badge.tsx`
- `src/components/ui/Card.tsx`
- `src/components/modals/ConfirmModal.tsx`

---

### 9. ✅ Formatage des Dates
**Statut**: Déjà implémenté

Fichier: `src/utils/formatters.ts`

Fonctions disponibles:
```tsx
import { formatDate, formatRelativeTime } from '@/utils/formatters';

formatDate('2024-01-15') // → "15 janvier 2024"
formatRelativeTime('2024-01-15') // → "il y a 2 jours"
```

---

## 🔄 Intégration avec le Backend Réel

Quand le backend sera prêt, modifiez `AuthContext.tsx`:

```tsx
const login = async (email: string, password: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const { token, user } = await response.json();
  
  localStorage.setItem('auth_token', token);
  localStorage.setItem('auth_user', JSON.stringify(user));
  
  setToken(token);
  setUser(user);
};
```

---

## 📝 Tests Unitaires (Optionnel)

### Installer Jest et React Testing Library

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### Exemple de test pour ProtectedRoute

Créez `src/components/auth/__tests__/ProtectedRoute.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { ProtectedRoute } from '../ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';

describe('ProtectedRoute', () => {
  it('redirects to login when not authenticated', () => {
    render(
      <AuthProvider>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </AuthProvider>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
```

---

## 🎯 Résumé de Votre Travail

### À Créer (Priorité Haute)

1. ✅ **AuthContext** (`src/contexts/AuthContext.tsx`)
2. ✅ **ProtectedRoute** (`src/components/auth/ProtectedRoute.tsx`)
3. ✅ **Page Login** (`src/app/login/page.tsx`)
4. ✅ **Bouton Déconnexion** (modifier `Header.tsx`)
5. ✅ **Redirection accueil** (modifier `src/app/page.tsx`)

### À Modifier (Priorité Haute)

1. ✅ **Sidebar** - Utiliser `useAuth()` au lieu du mock
2. ✅ **Layout principal** - Ajouter `AuthProvider`
3. ✅ **Toutes les pages** - Envelopper avec `ProtectedRoute`

### Déjà Fait ✅

- Redux Toolkit + RTK Query
- Layout Dashboard
- Skeleton Loaders
- Composants UI
- Formatage des dates

---

## 📦 Structure Finale des Fichiers

```
src/
├── app/
│   ├── login/
│   │   └── page.tsx                    ← À CRÉER
│   ├── page.tsx                        ← À MODIFIER
│   └── layout.tsx                      ← À MODIFIER
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx          ← À CRÉER
│   ├── layout/
│   │   ├── Header.tsx                  ← À MODIFIER
│   │   └── Sidebar.tsx                 ← À MODIFIER
│   └── ui/                             ← DÉJÀ FAIT ✅
├── contexts/
│   └── AuthContext.tsx                 ← À CRÉER
└── utils/
    └── formatters.ts                   ← DÉJÀ FAIT ✅
```

---

## 🚀 Ordre d'Implémentation Recommandé

1. **Jour 1**: Créer `AuthContext.tsx`
2. **Jour 1**: Créer la page `login/page.tsx`
3. **Jour 2**: Créer `ProtectedRoute.tsx`
4. **Jour 2**: Modifier `Sidebar.tsx` pour utiliser `useAuth()`
5. **Jour 3**: Protéger toutes les pages avec `ProtectedRoute`
6. **Jour 3**: Ajouter le bouton de déconnexion dans `Header.tsx`
7. **Jour 4**: Tests et ajustements

---

## 💡 Conseils

- Testez avec les 3 rôles (Admin, Editor, Viewer)
- Vérifiez que les redirections fonctionnent
- Assurez-vous que le token persiste après rechargement
- Testez la déconnexion

---

**Bon courage ! Tout est prêt pour que vous puissiez implémenter la sécurité facilement. 🎉**
