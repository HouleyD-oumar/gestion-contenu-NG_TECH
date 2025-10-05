'use client';

import React, { useState } from 'react';
import { Search, UserPlus, MoreVertical, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { TableSkeleton } from '@/components/ui/SkeletonLoader';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { UpdateRoleModal } from '@/components/modals/UpdateRoleModal';
import { CreateUserModal } from '@/components/modals/CreateUserModal';
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} from '@/store/api/mockApiSlice';
import { formatDate, formatRole, getInitials } from '@/utils/formatters';
import type { UserResponse } from '@/types';
import { UserRole } from '@/types';

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const { data, isLoading, error } = useGetUsersQuery({ page, limit: 10, search });
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateRole, { isLoading: isUpdatingRole }] = useUpdateUserRoleMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleCreateUser = async (data: any) => {
    try {
      await createUser(data).unwrap();
      setShowCreateModal(false);
      toast.success('Utilisateur créé avec succès !');
    } catch (err) {
      toast.error('Erreur lors de la création de l\'utilisateur');
    }
  };

  const handleUpdateRole = async (role: UserRole) => {
    if (!selectedUser) return;

    try {
      await updateRole({ id: selectedUser.id, role }).unwrap();
      setShowRoleModal(false);
      setSelectedUser(null);
      toast.success('Rôle mis à jour avec succès !');
    } catch (err) {
      toast.error('Erreur lors de la mise à jour du rôle');
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser.id).unwrap();
      setShowDeleteModal(false);
      setSelectedUser(null);
      toast.success('Utilisateur supprimé avec succès !');
    } catch (err) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const openRoleModal = (user: UserResponse) => {
    setSelectedUser(user);
    setShowRoleModal(true);
    setOpenMenuId(null);
  };

  const openDeleteModal = (user: UserResponse) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
    setOpenMenuId(null);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'danger';
      case 'EDITOR':
        return 'warning';
      case 'VIEWER':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <ProtectedRoute requiredRole={UserRole.ADMIN}>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
          <p className="text-gray-600 mt-1">Gérer les utilisateurs et leurs rôles</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <UserPlus className="w-4 h-4" />
          Ajouter un utilisateur
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Rechercher un utilisateur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardContent>
          {isLoading ? (
            <TableSkeleton rows={5} />
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">
                Erreur lors du chargement des utilisateurs
              </p>
            </div>
          ) : data && data.data.length > 0 ? (
            <div className="space-y-4">
              {data.data.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-semibold">
                      {getInitials(user.firstName, user.lastName)}
                    </span>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {formatRole(user.role)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>

                  {/* Actions Menu */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === user.id ? null : user.id)
                      }
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>

                    {openMenuId === user.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                        <button
                          onClick={() => openRoleModal(user)}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Modifier le rôle
                        </button>
                        <button
                          onClick={() => openDeleteModal(user)}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucun utilisateur trouvé</p>
            </div>
          )}

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Page {data.page} sur {data.totalPages} ({data.total} utilisateurs)
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Précédent
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={page === data.totalPages}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <CreateUserModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onConfirm={handleCreateUser}
        isLoading={isCreating}
      />

      {selectedUser && (
        <>
          <UpdateRoleModal
            isOpen={showRoleModal}
            onClose={() => {
              setShowRoleModal(false);
              setSelectedUser(null);
            }}
            onConfirm={handleUpdateRole}
            currentRole={selectedUser.role}
            userName={`${selectedUser.firstName} ${selectedUser.lastName}`}
            isLoading={isUpdatingRole}
          />

          <ConfirmModal
            isOpen={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false);
              setSelectedUser(null);
            }}
            onConfirm={handleDeleteUser}
            title="Supprimer l'utilisateur"
            message={`Êtes-vous sûr de vouloir supprimer ${selectedUser.firstName} ${selectedUser.lastName} ? Cette action est irréversible.`}
            confirmText="Supprimer"
            isLoading={isDeleting}
            variant="danger"
          />
        </>
      )}
    </div>
    </ProtectedRoute>
  );
}
