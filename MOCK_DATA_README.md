# 🎭 Système de Données Mockées

## ✅ Statut Actuel

Le projet utilise actuellement des **données mockées** pour permettre le développement et les tests sans backend.

## 📊 Données Disponibles

### Utilisateurs (3)
- **John Doe** (Admin) - john.doe@example.com
- **Jane Smith** (Editor) - jane.smith@example.com  
- **Bob Johnson** (Viewer) - bob.johnson@example.com

### Contenus (3)
1. **Introduction à React et TypeScript** (par John Doe)
   - Tags: TECHNOLOGY, EDUCATION
   - Catégorie: Développement Web

2. **Les meilleures pratiques en entreprise** (par Jane Smith)
   - Tags: BUSINESS
   - Catégorie: Management

3. **Bien-être et équilibre de vie** (par John Doe)
   - Tags: LIFESTYLE, HEALTH
   - Catégorie: Bien-être

### Activités (3)
- Création de contenu (il y a 5 minutes)
- Modification de contenu (il y a 30 minutes)
- Connexion (il y a 1 heure)

## 🔧 Comment ça fonctionne

### Fichiers Clés

1. **`src/lib/mockData.ts`** - Contient toutes les données mockées
2. **`src/store/api/mockApiSlice.ts`** - API mockée avec RTK Query
3. **`src/store/index.ts`** - Configure le store pour utiliser le mock API

### Fonctionnalités Mockées

✅ **Lecture des données** - Toutes les queries fonctionnent
✅ **Pagination** - Simule la pagination côté serveur
✅ **Recherche** - Filtre les données en temps réel
✅ **Filtres** - Par catégorie, tags, action, etc.
✅ **Mutations** - Modifier rôle, supprimer utilisateur/contenu
✅ **Délai réseau** - Simule 300-500ms de latence

## 🚀 Passer au Vrai Backend

Quand votre backend est prêt:

### Étape 1: Configurer l'URL de l'API

Créez `.env.local`:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
\`\`\`

### Étape 2: Changer les imports

Dans chaque page, remplacez:
\`\`\`tsx
// ❌ Mock API
import { useGetUsersQuery } from '@/store/api/mockApiSlice';

// ✅ Vrai API
import { useGetUsersQuery } from '@/store/api/usersApi';
\`\`\`

### Étape 3: Mettre à jour le store

Dans `src/store/index.ts`:
\`\`\`tsx
// Remplacer
import { mockApiSlice } from './api/mockApiSlice';

// Par
import { apiSlice } from './api/apiSlice';

// Et mettre à jour le store
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
\`\`\`

## 🎨 Personnaliser les Données Mockées

### Ajouter des utilisateurs

Dans `src/lib/mockData.ts`:
\`\`\`tsx
export const mockUsers: UserResponse[] = [
  // ... utilisateurs existants
  {
    id: '4',
    firstName: 'Votre',
    lastName: 'Nom',
    email: 'votre.email@example.com',
    role: UserRole.ADMIN,
  },
];
\`\`\`

### Ajouter des contenus

\`\`\`tsx
export const mockContents: ContentWithAuthor[] = [
  // ... contenus existants
  {
    id: '4',
    title: 'Votre Titre',
    description: 'Votre description',
    image: 'https://images.unsplash.com/photo-xxx',
    authorId: '1',
    tags: [ContentTag.TECHNOLOGY],
    category: 'Votre Catégorie',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: mockUsers[0],
  },
];
\`\`\`

## 🧪 Tester les Fonctionnalités

### Dashboard
- Visitez `/dashboard`
- Vous verrez les statistiques basées sur les données mockées

### Gestion des Utilisateurs
- Visitez `/users`
- Testez le changement de rôle (les changements sont temporaires)
- Testez la suppression (retire l'utilisateur de la liste mockée)

### Mes Contenus
- Visitez `/contents`
- Vous verrez les contenus de John Doe (utilisateur mocké connecté)
- Testez les filtres par catégorie et tags

### Gestion des Contenus (Admin)
- Visitez `/admin/contents`
- Vous verrez TOUS les contenus avec leurs auteurs

### Logs
- Visitez `/logs`
- Vous verrez l'historique des activités
- Testez les filtres par type d'action

## ⚠️ Limitations

- Les données sont **réinitialisées** à chaque rechargement de page
- Les mutations modifient les données en mémoire uniquement
- Pas de persistance des changements
- Pas d'authentification réelle

## 💡 Avantages

✅ Développement sans dépendance au backend
✅ Tests de l'UI immédiatement
✅ Prototypage rapide
✅ Démos fonctionnelles
✅ Facile à basculer vers le vrai API

## 📝 Notes

- Les images utilisent Unsplash pour les placeholders
- Les délais réseau sont simulés (300-500ms)
- L'utilisateur "connecté" est John Doe (id: 1)
- Toutes les fonctionnalités CRUD sont simulées

---

**Profitez du développement avec les données mockées ! 🎉**

Une fois le backend prêt, suivez les étapes ci-dessus pour basculer vers l'API réelle.
