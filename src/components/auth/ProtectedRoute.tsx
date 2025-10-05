'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requireAuth?: boolean;
  blockViewer?: boolean; // Nouvelle prop pour bloquer les viewers
}

export function ProtectedRoute({ 
  children, 
  requiredRole,
  requireAuth = true,
  blockViewer = false 
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Si l'authentification est requise et l'utilisateur n'est pas connecté
    if (requireAuth && !isAuthenticated) {
      router.push('/login');
      return;
    }

    // Bloquer les viewers si blockViewer est true
    if (blockViewer && user?.role === UserRole.VIEWER) {
      router.push('/access-denied');
      return;
    }

    // Si un rôle spécifique est requis
    if (requiredRole && user) {
      // Si l'utilisateur n'a pas le rôle requis
      if (requiredRole === UserRole.ADMIN && user.role !== UserRole.ADMIN) {
        router.push('/access-denied');
        return;
      }
      
      // Pour les autres rôles, vérifier la hiérarchie
      if (requiredRole === UserRole.EDITOR) {
        if (user.role !== UserRole.EDITOR && user.role !== UserRole.ADMIN) {
          router.push('/access-denied');
          return;
        }
      }
    }

    // Vérification terminée
    setIsChecking(false);
  }, [isAuthenticated, user, requiredRole, requireAuth, blockViewer, router]);

  // Afficher un loader pendant la vérification
  if (requireAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Afficher un loader si on vérifie les permissions
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
