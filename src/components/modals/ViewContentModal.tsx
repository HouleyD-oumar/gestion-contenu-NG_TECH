'use client';

import React from 'react';
import Image from 'next/image';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { formatDate, getInitials } from '@/utils/formatters';
import type { ContentWithAuthor, Content } from '@/types';

interface ViewContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: ContentWithAuthor | Content;
}

export function ViewContentModal({
  isOpen,
  onClose,
  content,
}: ViewContentModalProps) {
  const hasAuthor = 'author' in content;

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Détails du contenu"
      size="lg"
    >
      <div className="space-y-6">
        {/* Image */}
        {content.image && (
          <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src={content.image}
              alt={content.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{content.title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Créé le {formatDate(content.createdAt)}
            {content.updatedAt !== content.createdAt && (
              <> • Modifié le {formatDate(content.updatedAt)}</>
            )}
          </p>
        </div>

        {/* Author */}
        {hasAuthor && (
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm text-blue-600 font-semibold">
                {getInitials(content.author.firstName, content.author.lastName)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {content.author.firstName} {content.author.lastName}
              </p>
              <p className="text-xs text-gray-500">{content.author.email}</p>
            </div>
          </div>
        )}

        {/* Description */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
          <p className="text-gray-700 leading-relaxed">{content.description}</p>
        </div>

        {/* Category */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Catégorie</h3>
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
            {content.category}
          </span>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {content.tags.map((tag) => (
              <Badge key={tag} variant={getTagColor(tag)}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
