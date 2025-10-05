'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { UserRole } from '@/types';
import { formatRole } from '@/utils/formatters';

interface UpdateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (role: UserRole) => void;
  currentRole: UserRole;
  userName: string;
  isLoading?: boolean;
}

export function UpdateRoleModal({
  isOpen,
  onClose,
  onConfirm,
  currentRole,
  userName,
  isLoading = false,
}: UpdateRoleModalProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);

  const handleConfirm = () => {
    onConfirm(selectedRole);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Modifier le rôle de l'utilisateur"
      size="sm"
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Modifier le rôle de <span className="font-semibold">{userName}</span>
        </p>

        <div className="space-y-2">
          {Object.values(UserRole).map((role) => (
            <label
              key={role}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="role"
                value={role}
                checked={selectedRole === role}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{formatRole(role)}</p>
                <p className="text-xs text-gray-500">
                  {role === UserRole.ADMIN && 'Accès complet à toutes les fonctionnalités'}
                  {role === UserRole.EDITOR && 'Peut créer et modifier des contenus'}
                  {role === UserRole.VIEWER && 'Accès en lecture seule'}
                </p>
              </div>
            </label>
          ))}
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Annuler
          </Button>
          <Button onClick={handleConfirm} isLoading={isLoading}>
            Enregistrer
          </Button>
        </div>
      </div>
    </Modal>
  );
}
