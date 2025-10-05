'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { ContentTag } from '@/types';

interface CreateContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: {
    title: string;
    description: string;
    image: string;
    category: string;
    tags: ContentTag[];
  }) => void;
  categories: string[];
  isLoading?: boolean;
}

export function CreateContentModal({
  isOpen,
  onClose,
  onConfirm,
  categories,
  isLoading = false,
}: CreateContentModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<ContentTag[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Si un fichier est sélectionné, créer une URL temporaire
    const imageUrl = imageFile 
      ? URL.createObjectURL(imageFile)
      : image || 'https://placehold.co/800x600/6366f1/ffffff?text=Nouveau+Contenu';

    onConfirm({
      title,
      description,
      image: imageUrl,
      category,
      tags: selectedTags,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setImage('');
    setImageFile(null);
    setCategory('');
    setSelectedTags([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImage(''); // Clear URL input when file is selected
    }
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
      title="Créer un nouveau contenu"
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <div className="space-y-3">
            {/* File upload */}
            <div>
              <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    {imageFile ? imageFile.name : 'Cliquez pour parcourir une image'}
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 10MB</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OU</span>
              </div>
            </div>

            {/* URL input */}
            <Input
              label=""
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
                setImageFile(null); // Clear file when URL is entered
              }}
              placeholder="https://example.com/image.jpg"
              disabled={!!imageFile}
            />
          </div>
        </div>

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
            Créer le contenu
          </Button>
        </div>
      </form>
    </Modal>
  );
}
