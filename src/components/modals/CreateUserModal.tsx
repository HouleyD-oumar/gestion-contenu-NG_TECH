'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { UserRole } from '@/types';
import { formatRole } from '@/utils/formatters';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
  }) => void;
  isLoading?: boolean;
}

export function CreateUserModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: CreateUserModalProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.VIEWER);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email || !password) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    onConfirm({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    // Reset form
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setRole(UserRole.VIEWER);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ajouter un utilisateur"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Prénom *"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Prénom"
            required
          />
          <Input
            label="Nom *"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Nom"
            required
          />
        </div>

        <Input
          label="Email *"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          required
        />

        <Input
          label="Mot de passe *"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <Select
          label="Rôle *"
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
          options={Object.values(UserRole).map(r => ({
            value: r,
            label: formatRole(r),
          }))}
          required
        />

        <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Annuler
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Ajouter l&apos;utilisateur
          </Button>
        </div>
      </form>
    </Modal>
  );
}
