'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle } from 'lucide-react';
import { UserRole } from '@/types';

export default function AccessDeniedPage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleGoHome = () => {
    // Rediriger selon le rôle
    if (user?.role === UserRole.VIEWER) {
      router.push('/home'); // Viewer va vers la page d'accueil publique
    } else {
      router.push('/dashboard'); // Autres vont au Dashboard
    }
  };

  const isViewer = user?.role === UserRole.VIEWER;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Accès Refusé</h1>
        
        <p className="text-gray-600 mb-6">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Besoin d'accès ?</strong><br />
            Veuillez contacter votre administrateur pour obtenir les autorisations appropriées.
          </p>
        </div>

        <button
          onClick={handleGoHome}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retour à la page d'accueil
        </button>
      </div>
    </div>
  );
}
