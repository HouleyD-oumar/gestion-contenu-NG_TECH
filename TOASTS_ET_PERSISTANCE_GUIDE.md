# 🔔 Guide d'Ajout des Toasts et Persistance Locale

## ✅ Déjà Fait
1. ✅ `react-hot-toast` installé
2. ✅ `Toaster` configuré dans `layout.tsx`
3. ✅ `placehold.co` ajouté dans `next.config.ts`

## 📝 À Faire : Ajouter les Toasts dans les Pages

### 1. Page Users (`src/app/(Dashboard)/users/page.tsx`)

Ajouter en haut du fichier :
```tsx
import toast from 'react-hot-toast';
```

Modifier les handlers :
```tsx
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
```

### 2. Page Mes Contenus (`src/app/(Dashboard)/contents/page.tsx`)

Ajouter en haut :
```tsx
import toast from 'react-hot-toast';
```

Modifier les handlers :
```tsx
const handleCreateContent = async (data: any) => {
  try {
    await createContent(data).unwrap();
    setShowCreateModal(false);
    toast.success('Contenu créé avec succès !');
  } catch (err) {
    toast.error('Erreur lors de la création du contenu');
  }
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
```

### 3. Page Admin Contenus (`src/app/(Dashboard)/admin/contents/page.tsx`)

Même chose que pour "Mes Contenus" ci-dessus.

## 💾 Persistance Locale avec localStorage

### Créer un fichier utilitaire (`src/lib/localStorage.ts`)

```tsx
// Clés de stockage
const STORAGE_KEYS = {
  USERS: 'ng_tech_users',
  CONTENTS: 'ng_tech_contents',
  ACTIVITIES: 'ng_tech_activities',
};

// Sauvegarder les données
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
};

// Récupérer les données
export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window !== 'undefined') {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  }
  return defaultValue;
};

// Supprimer les données
export const removeFromLocalStorage = (key: string): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

export { STORAGE_KEYS };
```

### Modifier `src/lib/mockData.ts`

Ajouter en haut :
```tsx
import { getFromLocalStorage, saveToLocalStorage, STORAGE_KEYS } from './localStorage';
```

Remplacer les exports par :
```tsx
// Charger depuis localStorage ou utiliser les données par défaut
const defaultUsers: UserResponse[] = [
  // ... vos utilisateurs par défaut
];

const defaultContents: ContentWithAuthor[] = [
  // ... vos contenus par défaut
];

// Exporter avec localStorage
export let mockUsers: UserResponse[] = getFromLocalStorage(
  STORAGE_KEYS.USERS,
  defaultUsers
);

export let mockContents: ContentWithAuthor[] = getFromLocalStorage(
  STORAGE_KEYS.CONTENTS,
  defaultContents
);

// Fonction pour sauvegarder après chaque modification
export const saveMockUsers = () => {
  saveToLocalStorage(STORAGE_KEYS.USERS, mockUsers);
};

export const saveMockContents = () => {
  saveToLocalStorage(STORAGE_KEYS.CONTENTS, mockContents);
};
```

### Modifier `src/store/api/mockApiSlice.ts`

Ajouter en haut :
```tsx
import { saveMockUsers, saveMockContents } from '@/lib/mockData';
```

Ajouter `saveMockUsers()` après chaque modification de `mockUsers` :
```tsx
createUser: builder.mutation<UserResponse, any>({
  async queryFn(body) {
    await delay(300);
    const newUser: UserResponse = {
      id: String(mockUsers.length + 1),
      ...body,
    };
    mockUsers.push(newUser);
    saveMockUsers(); // ← AJOUTER ICI
    return { data: newUser };
  },
  invalidatesTags: ['User', 'Stats'],
}),

updateUserRole: builder.mutation<UserResponse, { id: string; role: UserRole }>({
  async queryFn({ id, role }) {
    await delay(300);
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], role };
      saveMockUsers(); // ← AJOUTER ICI
      return { data: mockUsers[userIndex] };
    }
    return { error: { status: 404, data: 'User not found' } };
  },
  invalidatesTags: ['User', 'Stats'],
}),

deleteUser: builder.mutation<void, string>({
  async queryFn(id) {
    await delay(300);
    const index = mockUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      mockUsers.splice(index, 1);
      saveMockUsers(); // ← AJOUTER ICI
      return { data: undefined };
    }
    return { error: { status: 404, data: 'User not found' } };
  },
  invalidatesTags: ['User', 'Stats'],
}),
```

Faire la même chose pour les contenus avec `saveMockContents()` :
```tsx
createContent: builder.mutation<Content, any>({
  async queryFn(body) {
    await delay(300);
    const newContent: any = {
      id: String(mockContents.length + 1),
      ...body,
      authorId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: mockUsers[0],
    };
    mockContents.push(newContent);
    saveMockContents(); // ← AJOUTER ICI
    return { data: newContent };
  },
  invalidatesTags: ['Content', 'Stats'],
}),

updateContent: builder.mutation<Content, { id: string; data: any }>({
  async queryFn({ id, data }) {
    await delay(300);
    const index = mockContents.findIndex(c => c.id === id);
    if (index !== -1) {
      mockContents[index] = {
        ...mockContents[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      saveMockContents(); // ← AJOUTER ICI
      return { data: mockContents[index] as any };
    }
    return { error: { status: 404, data: 'Content not found' } };
  },
  invalidatesTags: ['Content', 'Stats'],
}),

deleteContent: builder.mutation<void, string>({
  async queryFn(id) {
    await delay(300);
    const index = mockContents.findIndex(c => c.id === id);
    if (index !== -1) {
      mockContents.splice(index, 1);
      saveMockContents(); // ← AJOUTER ICI
      return { data: undefined };
    }
    return { error: { status: 404, data: 'Content not found' } };
  },
  invalidatesTags: ['Content', 'Stats'],
}),
```

## 🎯 Résultat Final

Après ces modifications :
- ✅ Toasts de succès/erreur sur toutes les actions
- ✅ Données sauvegardées dans localStorage
- ✅ Données persistantes entre les rechargements de page
- ✅ Prêt pour l'upload d'images vers le cloud (backend)

## 📝 Note sur les Images

Pour l'upload d'images vers le cloud (Cloudinary, AWS S3, etc.) :
- Le backend fournira un endpoint `/api/upload`
- Vous enverrez le fichier en `multipart/form-data`
- Le backend retournera l'URL de l'image
- Vous stockerez cette URL dans le contenu

Exemple de composant d'upload (à créer plus tard) :
```tsx
const handleImageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
  
  const { url } = await response.json();
  return url; // URL de l'image sur le cloud
};
```

**Tout est prêt ! Suivez ce guide pour finaliser les toasts et la persistance locale. 🚀**
