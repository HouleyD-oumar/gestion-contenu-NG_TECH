'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { ContentTag } from '@/types';
import type { Content, ContentWithAuthor } from '@/types';

interface EditContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: {
    title: string;
    description: string;
    image: string;
    category: string;
    tags: ContentTag[];
  }) => void;
  content: Content | ContentWithAuthor;
  categories: string[];
  isLoading?: boolean;
}

export function EditContentModal({
  isOpen,
  onClose,
  onConfirm,
  content,
  categories,
  isLoading = false,
}: EditContentModalProps) {
  const [title, setTitle] = useState(content.title);
  const [description, setDescription] = useState(content.description);
  const [image, setImage] = useState(content.image);
  const [category, setCategory] = useState(content.category);
  const [selectedTags, setSelectedTags] = useState<ContentTag[]>(content.tags);

  useEffect(() => {
    setTitle(content.title);
    setDescription(content.description);
    setImage(content.image);
    setCategory(content.category);
    setSelectedTags(content.tags);
  }, [content]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    onConfirm({
      title,
      description,
      image,
      category,
      tags: selectedTags,
    });
  };

  const toggleTag = (tag: ContentTag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Modifier le contenu"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Titre *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre du contenu"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description du contenu"
            rows={4}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <Input
          label="URL de l'image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />

        <Select
          label="Catégorie *"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={[
            { value: '', label: 'Sélectionner une catégorie' },
            ...categories.map(cat => ({ value: cat, label: cat })),
          ]}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.values(ContentTag).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

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
            Enregistrer les modifications
          </Button>
        </div>
      </form>
    </Modal>
  );
}
