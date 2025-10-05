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

  const fillTestAccount = (role: 'admin' | 'editor' | 'viewer') => {
    const accounts = {
      admin: 'john.doe@example.com',
      editor: 'jane.smith@example.com',
      viewer: 'bob.johnson@example.com',
    };
    setEmail(accounts[role]);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <span className="text-white font-bold text-xl">NT</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">NG TECH</h1>
            <p className="text-sm text-gray-600 mt-1">Gestion de Contenu</p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="mt-6 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <p className="text-xs font-semibold text-gray-800 mb-2 text-center">
              🔐 Comptes de test
            </p>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => fillTestAccount('admin')}
                className="w-full text-left px-2.5 py-1.5 text-xs bg-white rounded-lg hover:bg-blue-50 transition-colors border border-gray-200"
              >
                <span className="font-medium text-blue-600">👑 Admin:</span>
                <span className="text-gray-600 ml-1.5 text-[11px]">john.doe@example.com</span>
              </button>
              <button
                type="button"
                onClick={() => fillTestAccount('editor')}
                className="w-full text-left px-2.5 py-1.5 text-xs bg-white rounded-lg hover:bg-blue-50 transition-colors border border-gray-200"
              >
                <span className="font-medium text-green-600">✏️ Editor:</span>
                <span className="text-gray-600 ml-1.5 text-[11px]">jane.smith@example.com</span>
              </button>
              <button
                type="button"
                onClick={() => fillTestAccount('viewer')}
                className="w-full text-left px-2.5 py-1.5 text-xs bg-white rounded-lg hover:bg-blue-50 transition-colors border border-gray-200"
              >
                <span className="font-medium text-purple-600">👁️ Viewer:</span>
                <span className="text-gray-600 ml-1.5 text-[11px]">bob.johnson@example.com</span>
              </button>
              <p className="text-[10px] text-gray-500 text-center mt-2">
                Mot de passe: <span className="font-mono font-semibold">password123</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          © 2024 NG TECH - Tous droits réservés
        </p>
      </div>
    </div>
  );
}
