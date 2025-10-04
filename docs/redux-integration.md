# Intégration Redux Toolkit

Ce document explique l'intégration de Redux Toolkit (RTK) dans ce projet Next.js (app router + TypeScript), les fichiers ajoutés, et des exemples d'utilisation.

## Pourquoi

- Centraliser l'état (auth, contenus, utilisateurs, logs, UI) pour faciliter la communication entre composants.
- Utiliser `createAsyncThunk` pour gérer les actions asynchrones (fetch API) avec loading / error.
- Être compatible avec le nouveau modèle d'apps Next.js (Server Components + Client Components) en plaçant le `Provider` côté client.

## Fichiers ajoutés

- `src/store/store.ts` — configuration du store (reducers combinés : `auth`, `content`, `users`, `logs`, `ui`, `status`).
- `src/store/hooks.ts` — hooks typés `useAppDispatch` et `useAppSelector`.
- `src/store/ReduxProvider.tsx` — composant client qui exporte `<Provider store={store}>` (utilisé dans `src/app/layout.tsx`).
- `src/store/slices/*.ts` — slices RTK : `authSlice.ts`, `contentSlice.ts`, `userSlice.ts`, `logSlice.ts`, `uiSlice.ts`, `statusSlice.ts`.
- `src/services/api.ts` — service mock utilisé par les thunks (remplacez par vos endpoints réels).
- `src/components/content/ContentList.tsx` — exemple de composant client qui utilise `fetchContents` et `setFilters`.
- `src/components/TestPanel.tsx` & `src/app/test/page.tsx` — page de test interactive (dispatch des thunks et inspection des états).
- `middleware.ts` — middleware Next.js (mock) pour protéger certaines routes admin côté serveur.

## Installation

Installez les paquets nécessaires si ce n'est pas déjà fait :

```powershell
npm install react-redux @reduxjs/toolkit
npm install -D @types/react-redux
```

Si TypeScript remonte des erreurs pour l'import CSS (`import './globals.css'`), ajoutez une déclaration globale :

`src/global.d.ts`

```ts
declare module '*.css';
```

## Où placer le Provider (Server vs Client)

Next.js App Router rend majoritairement des Server Components. `react-redux` Provider doit être utilisé dans un Client Component, car il dépend de hooks et du runtime client. Pour cela le pattern suivi ici :

1. `src/store/ReduxProvider.tsx` contient "use client" et exporte le Provider.
2. `src/app/layout.tsx` (Server Component) importe `ReduxProvider` et enveloppe `{children}` avec celui-ci — ainsi le Provider s'exécute côté client seulement.

Exemple d'utilisation dans un composant client :

```tsx
// "use client"
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchContents } from '../store/slices/contentSlice';

const Comp = () => {
  const dispatch = useAppDispatch();
  const content = useAppSelector(s => s.content);

  useEffect(() => { dispatch(fetchContents({ page: 1 })); }, [dispatch]);

  return <div>{content.loading ? 'loading' : JSON.stringify(content.items)}</div>
}
```

## Exemples rapides

- Login mock (dispatch `login({ email, password })`) : met à jour `state.auth.user` et `state.auth.token`.
- fetchContents : `dispatch(fetchContents({ page: 1, perPage: 8 }))` met `state.content.items`.
- setFilters : `dispatch(setFilters({ tags: ['demo'] }))` met à jour le filtre et déclenche une nouvelle recherche si souhaité.

## Middleware

- `middleware.ts` contient un exemple simple qui vérifie un cookie `token` pour protéger des routes (`/admin` ou `/Dashboard/Gestion`). C'est un mock : remplacez par une validation réelle (vérification JWT, introspection, etc.) en production.

## Tests / page de debug

- `src/app/test/page.tsx` expose un panneau interactif `TestPanel` pour tester les thunks et afficher l'état des slices. Utilisez-le pour vérifier vos intégrations avant de brancher votre backend réel.

## Remarques et bonnes pratiques

- Remplacez le service mock par un vrai client HTTP (fetch/axios) et gérez le refresh/expiration du token.
- Pour la SSR/SSG et les pages sensibles, préférez la protection serveur (middleware ou edge functions) plutôt que des gardes client uniquement.
- Utilisez `createEntityAdapter` de RTK pour des listes volumineuses si vous avez besoin d'opérations performantes.

---

Si vous voulez, je peux :
- ajouter un fichier `src/global.d.ts` pour supprimer l'avertissement CSS,
- convertir le service mock en un client `fetch` prêt pour votre API (si vous me donnez les endpoints),
- ou générer quelques tests unitaires pour un slice.
