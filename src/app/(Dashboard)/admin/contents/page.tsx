'use client';

import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Edit, Trash2, Filter, Eye } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { CardSkeleton } from '@/components/ui/SkeletonLoader';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { CreateContentModal } from '@/components/modals/CreateContentModal';
import { ViewContentModal } from '@/components/modals/ViewContentModal';
import { EditContentModal } from '@/components/modals/EditContentModal';
import {
  useGetContentsQuery,
  useCreateContentMutation,
  useUpdateContentMutation,
  useDeleteContentMutation,
  useGetCategoriesQuery,
} from '@/store/api/mockApiSlice';
import { formatDate, truncateText, getInitials } from '@/utils/formatters';
import { ContentTag } from '@/types';
import type { ContentWithAuthor } from '@/types';

export default function AdminContentsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');
  const [selectedContent, setSelectedContent] = useState<ContentWithAuthor | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const { data, isLoading, error } = useGetContentsQuery({
    page,
    limit: 12,
    search,
    category: category || undefined,
    tags: tag ? [tag as ContentTag] : undefined,
  });

  const { data: categories } = useGetCategoriesQuery();
  const [createContent, { isLoading: isCreating }] = useCreateContentMutation();
  const [updateContent, { isLoading: isUpdating }] = useUpdateContentMutation();
  const [deleteContent, { isLoading: isDeleting }] = useDeleteContentMutation();

  const handleCreateContent = async (data: any) => {
    try {
      await createContent(data).unwrap();
      setShowCreateModal(false);
      toast.success('Contenu créé avec succès !');
    } catch (err) {
      toast.error('Erreur lors de la création du contenu');
    }
  };

  const handleViewContent = (content: ContentWithAuthor) => {
    setSelectedContent(content);
    setShowViewModal(true);
    setOpenMenuId(null);
  };

  const handleEditContent = (content: ContentWithAuthor) => {
    setSelectedContent(content);
    setShowEditModal(true);
    setOpenMenuId(null);
  };

  const handleUpdateContent = async (data: any) => {
    if (!selectedContent) return;
    try {
      await updateContent({ id: selectedContent.id, data }).unwrap();
      setShowEditModal(false);
      setSelectedContent(null);
      toast.success('Contenu modifié avec succès !');
    } catch (err) {
      toast.error('Erreur lors de la modification');
    }
  };

  const handleDeleteContent = async () => {
    if (!selectedContent) return;

    try {
      await deleteContent(selectedContent.id).unwrap();
      setShowDeleteModal(false);
      setSelectedContent(null);
      toast.success('Contenu supprimé avec succès !');
    } catch (err) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const openDeleteModal = (content: ContentWithAuthor) => {
    setSelectedContent(content);
    setShowDeleteModal(true);
    setOpenMenuId(null);
  };

  const getTagColor = (tag: string): 'primary' | 'secondary' | 'success' | 'warning' | 'danger' => {
    const colors: Record<string, 'primary' | 'secondary' | 'success' | 'warning' | 'danger'> = {
      TECHNOLOGY: 'primary',
      BUSINESS: 'warning',
      LIFESTYLE: 'success',
      EDUCATION: 'secondary',
      HEALTH: 'danger',
      ENTERTAINMENT: 'primary',
    };
    return colors[tag] || 'secondary';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Contenus</h1>
          <p className="text-gray-600 mt-1">
            Administration complète de tous les contenus
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4" />
          Nouveau contenu
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Rechercher un contenu..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                Filtres
              </Button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <Select
                  label="Catégorie"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  options={[
                    { value: '', label: 'Toutes les catégories' },
                    ...(categories?.map((cat) => ({ value: cat, label: cat })) || []),
                  ]}
                />
                <Select
                  label="Tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  options={[
                    { value: '', label: 'Tous les tags' },
                    ...Object.values(ContentTag).map((t) => ({ value: t, label: t })),
                  ]}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contents Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <Card>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-red-600">
                Erreur lors du chargement des contenus
              </p>
            </div>
          </CardContent>
        </Card>
      ) : data && data.data.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.data.map((content) => (
              <Card
                key={content.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200">
                  {content.image ? (
                    <Image
                      src={content.image}
                      alt={content.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400">Pas d&apos;image</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">
                      {truncateText(content.title, 50)}
                    </h3>
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === content.id ? null : content.id
                          )
                        }
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>

                      {openMenuId === content.id && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                          <button 
                            onClick={() => handleViewContent(content)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            Voir
                          </button>
                          <button 
                            onClick={() => handleEditContent(content)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            Modifier
                          </button>
                          <button
                            onClick={() => openDeleteModal(content)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">
                    {truncateText(content.description, 100)}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {content.tags.map((tag) => (
                      <Badge key={tag} variant={getTagColor(tag)}>
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs text-blue-600 font-semibold">
                        {getInitials(content.author.firstName, content.author.lastName)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-600">
                      {content.author.firstName} {content.author.lastName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{content.category}</span>
                    <span>{formatDate(content.createdAt)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {data.totalPages > 1 && (
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Page {data.page} sur {data.totalPages} ({data.total} contenus)
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
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Aucun contenu trouvé</p>
              <Button>
                <Plus className="w-4 h-4" />
                Créer le premier contenu
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Modal */}
      <CreateContentModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onConfirm={handleCreateContent}
        categories={categories || []}
        isLoading={isCreating}
      />

      {/* View & Edit Modals */}
      {selectedContent && (
        <>
          <ViewContentModal
            isOpen={showViewModal}
            onClose={() => {
              setShowViewModal(false);
              setSelectedContent(null);
            }}
            content={selectedContent}
          />

          <EditContentModal
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setSelectedContent(null);
            }}
            onConfirm={handleUpdateContent}
            content={selectedContent}
            categories={categories || []}
            isLoading={isUpdating}
          />

          <ConfirmModal
            isOpen={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false);
              setSelectedContent(null);
            }}
            onConfirm={handleDeleteContent}
            title="Supprimer le contenu"
            message={`Êtes-vous sûr de vouloir supprimer "${selectedContent.title}" créé par ${selectedContent.author.firstName} ${selectedContent.author.lastName} ? Cette action est irréversible.`}
            confirmText="Supprimer"
            isLoading={isDeleting}
            variant="danger"
          />
        </>
      )}
    </div>
  );
}
