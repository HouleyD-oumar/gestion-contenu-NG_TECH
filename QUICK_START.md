# 🚀 Guide de Démarrage Rapide - Dashboard NG TECH

## Installation

\`\`\`bash
# 1. Installer les dépendances
npm install

# 2. Créer le fichier de configuration
cp .env.local.example .env.local

# 3. Modifier l'URL de l'API dans .env.local
# NEXT_PUBLIC_API_URL=http://localhost:3001/api

# 4. Démarrer le serveur de développement
npm run dev
\`\`\`

## 🗺️ Navigation

| Route | Page | Accès |
|-------|------|-------|
| `/dashboard` | Dashboard avec statistiques | Tous |
| `/users` | Gestion des utilisateurs | Admin |
| `/contents` | Mes contenus | Tous |
| `/gestion/contents` | Gestion des contenus (Admin) | Admin |
| `/logs` | Logs d'activité | Admin |

## 🔑 Fonctionnalités Clés

### Dashboard (`/dashboard`)
- Vue d'ensemble avec 4 statistiques principales
- Graphiques: Contenus par catégorie, Utilisateurs par rôle
- Activités récentes

### Gestion Utilisateurs (`/users`)
- Liste paginée avec recherche
- **Modifier le rôle**: Clic sur menu (3 points) → "Modifier le rôle"
- **Supprimer**: Clic sur menu → "Supprimer" → Confirmer

### Mes Contenus (`/contents`)
- Grille de cartes avec images
- **Filtrer**: Clic sur "Filtres" → Sélectionner catégorie/tag
- **Supprimer**: Clic sur menu → "Supprimer" → Confirmer

### Gestion Contenus Admin (`/gestion/contents`)
- Identique à "Mes Contenus" mais pour TOUS les contenus
- Affiche l'auteur de chaque contenu

### Logs (`/logs`)
- Liste chronologique des activités
- **Filtrer**: Clic sur "Filtres" → Sélectionner type d'action

## 🎨 Composants Réutilisables

### Button
\`\`\`tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="md" isLoading={false}>
  Cliquez-moi
</Button>
\`\`\`

**Variantes**: `primary`, `secondary`, `danger`, `success`, `outline`, `ghost`

### Modal
\`\`\`tsx
import { Modal } from '@/components/ui/Modal';

<Modal isOpen={true} onClose={() => {}} title="Titre">
  Contenu du modal
</Modal>
\`\`\`

### Card
\`\`\`tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

<Card>
  <CardHeader>
    <CardTitle>Titre</CardTitle>
  </CardHeader>
  <CardContent>
    Contenu
  </CardContent>
</Card>
\`\`\`

## 📡 Utilisation de RTK Query

### Récupérer des données
\`\`\`tsx
import { useGetUsersQuery } from '@/store/api/usersApi';

const { data, isLoading, error } = useGetUsersQuery({ page: 1, limit: 10 });
\`\`\`

### Mutation (Créer/Modifier/Supprimer)
\`\`\`tsx
import { useDeleteUserMutation } from '@/store/api/usersApi';

const [deleteUser, { isLoading }] = useDeleteUserMutation();

const handleDelete = async (id: string) => {
  try {
    await deleteUser(id).unwrap();
    // Succès
  } catch (error) {
    // Erreur
  }
};
\`\`\`

## 🔧 Configuration

### Changer l'URL de l'API
Modifier `.env.local`:
\`\`\`env
NEXT_PUBLIC_API_URL=https://votre-api.com/api
\`\`\`

### Ajouter un nouveau endpoint
1. Ouvrir le fichier API correspondant dans `src/store/api/`
2. Ajouter un nouveau endpoint avec `builder.query()` ou `builder.mutation()`
3. Exporter le hook généré

Exemple:
\`\`\`tsx
// Dans src/store/api/usersApi.ts
getUserProfile: builder.query<UserProfile, void>({
  query: () => '/users/profile',
  providesTags: ['User'],
}),

// Utilisation
const { data } = useGetUserProfileQuery();
\`\`\`

## 🐛 Debugging

### Vérifier les requêtes API
1. Ouvrir DevTools → Network
2. Filtrer par "Fetch/XHR"
3. Vérifier les requêtes vers votre API

### Redux DevTools
1. Installer l'extension Redux DevTools
2. Ouvrir DevTools → Redux
3. Voir les actions et l'état du store

## 📚 Ressources

- **Documentation RTK Query**: https://redux-toolkit.js.org/rtk-query/overview
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Next.js**: https://nextjs.org/docs
- **TypeScript**: https://www.typescriptlang.org/docs

## 🆘 Problèmes Courants

### Erreur: "Cannot find module '@/...'"
→ Vérifier que `tsconfig.json` contient:
\`\`\`json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
\`\`\`

### Erreur: "API request failed"
→ Vérifier que:
1. Le backend est démarré
2. L'URL dans `.env.local` est correcte
3. Les endpoints existent sur le backend

### Les filtres ne fonctionnent pas
→ Vérifier que le backend supporte les paramètres de query:
- `?search=...`
- `?category=...`
- `?tags=...`
- `?page=...&limit=...`

## 💡 Astuces

1. **Hot Reload**: Les modifications sont automatiquement rechargées
2. **Cache RTK Query**: Les données sont mises en cache automatiquement
3. **Invalidation**: Les mutations invalident automatiquement le cache
4. **TypeScript**: Utilisez l'autocomplétion pour découvrir les props

## 📞 Support

Pour toute question, consultez:
- `README_DASHBOARD.md` - Documentation complète
- `IMPLEMENTATION_SUMMARY.md` - Résumé de l'implémentation
- Le code source avec commentaires

**Bon développement! 🎉**
