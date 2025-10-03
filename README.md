# Gestion-Contenu

Gestion-Contenu est une application front-end de gestion de contenu développée avec Next.js (App Router). Elle fournit un tableau de bord permettant de gérer les contenus et les utilisateurs. Le code source se trouve dans le dossier `src/` et le projet utilise TailwindCSS, TypeScript et ESLint.

## Démarrage rapide

Installer les dépendances et lancer le serveur de développement :

```powershell
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

Scripts principaux (dans `package.json`) :

- `dev` — lance Next.js en développement (turbopack)
- `build` — construit l'application pour la production
- `start` — démarre le serveur en production
- `lint` — lance ESLint

## Structure du projet

Dossiers importants :

- `src/app/` — pages et layouts Next.js
- `src/components/` — composants UI réutilisables
- `src/lib/` — bibliothèques utilitaires et hooks
- `src/services/` — wrappers et adaptateurs pour les API
- `src/store/` — logique de gestion d'état (Redux Toolkit)
- `src/types/` — types TypeScript partagés
- `src/utils/` — fonctions utilitaires diverses

Consultez `architectur.md` et `design-pattern.md` pour plus de détails sur l'architecture et les choix de conception.

## Spécification : page d'accueil (résumé)

La page d'accueil doit comprendre :

- Un `Header` affichant le nom du projet et un avatar utilisateur (menu avec bouton déconnexion et lien vers le tableau de bord adapté au rôle).
- Un bouton "Publier" visible uniquement pour les rôles `admin` et `éditeur`.
- Un composant `Filters` pour filtrer la liste des contenus par `tags` et `categories`.
- Une `ContentList` affichant des `ContentCard` (aperçu 100-150 caractères, avatar+nom+date, lien "Voir plus").
- Un `Footer` listant les équipes (backend, frontend, mobile).

## Spécification : tableau de bord (résumé)

Le tableau de bord est une interface d'administration (accessible uniquement aux `admin`) pour gérer les contenus et les utilisateurs. Il doit contenir :

- Une `Header` globale.
- Une `Sidebar` avec navigation (Contenus, Utilisateurs, Paramètres).
- Une zone `Main` pour afficher listes, formulaires et détails.

Bonnes pratiques : modals pour formulaires, confirmation avant suppression, protection des routes selon les rôles, formatage centralisé des dates, skeleton loaders pour le préchargement.

## Notes de développement

- Le projet utilise TypeScript et TailwindCSS.
- Version Node recommandée : 18 ou supérieure.

## Contribution

Voir `contribution.md` pour les règles de contribution, conventions de branche et commits.

## Licence

Aucun fichier de licence n'est présent. Ajoutez un fichier `LICENSE` si vous souhaitez publier le projet.
