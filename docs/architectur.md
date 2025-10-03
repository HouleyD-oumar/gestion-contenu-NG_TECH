# Architecture du projet

Ce document décrit l'architecture générale de l'application « Gestion-Contenu ».

## Vue d'ensemble

- Framework : Next.js (App Router)
- Langage : TypeScript
- Styling : TailwindCSS
- Gestion d'état : Redux Toolkit (présent dans les dépendances)

L'application suit une architecture front-end classique pour une SPA basée sur Next.js :

- `src/app/` contient les routes, les pages et les layouts du site.
- `src/components/` contient les composants UI réutilisables.
- `src/lib/` contient les utilitaires et fonctions partagées.
- `src/services/` contient les wrappers pour les appels API (fetch/axios) et la logique d'accès aux données.
- `src/store/` contient la configuration Redux (slices, store).
- `src/types/` contient les types TypeScript partagés.

## Flux de données

- Les composants récupèrent les données via des hooks qui utilisent `src/services` et le `store`.
- Les mutations de données passent par des actions Redux ou par des hooks qui appellent les services puis dispatchent les résultats.

## Déploiement

Prêt à être déployé sur Vercel (configuration Next.js compatible). Utiliser `npm run build` puis `npm start` en production.

## Spécification : page d'accueil

Cette section décrit la spécification fonctionnelle de la page d'accueil (document technique — pas d'implémentation ici).

Composants recommandés :

- `Header` : affiche le nom du projet, un avatar utilisateur et un menu (bouton déconnexion, lien vers tableau de bord). Le lien de tableau de bord redirige vers les vues appropriées selon le rôle (admin / éditeur).
- `PublishButton` : bouton d'action visible uniquement pour les rôles `admin` et `éditeur`.
- `Filters` : composant de filtrage permettant de filtrer la liste des contenus par `tags` et `categories`. Les filtres peuvent être combinés.
- `ContentList` et `ContentCard` : liste des contenus affichée sous forme de cartes.
- `Footer` : affiche la liste des équipes (backend, frontend, mobile).

Règles fonctionnelles :

- Affichage conditionnel du bouton "Publier" : le bouton est rendu uniquement si l'utilisateur connecté a le rôle `admin` ou `éditeur`.
- Filtrage : les contenus doivent pouvoir être filtrés par tags et catégories ; le filtrage est réactif côté client et peut aussi être complété par des paramètres d'URL pour partage de vues.
- Card de contenu (`ContentCard`) :
  - affiche l'avatar de l'auteur, le nom de l'auteur et la date de publication.
  - affiche un extrait de la description contenu entre 100 et 150 caractères (espaces inclus). Si la description est plus longue, un lien "Voir plus" est affiché.
  - le lien "Voir plus" ouvre un modal ou une vue détaillée montrant l'intégralité de la description.

- Accessibilité et internationalisation : prévoir des attributs ARIA pour les contrôles interactifs et préparer la localisation des textes.

Notes de déploiement :

- Aucune implémentation n'est faite ici — cette section sert de spécification à l'équipe front-end pour réaliser la page d'accueil.

## Spécification : tableau de bord (Dashboard)

But : fournir une interface sécurisée pour la gestion des contenus et des utilisateurs, accessible uniquement aux administrateurs.

Structure globale :

- `Header` — entête commune (titre, avatar, actions globales)
- `Sidebar` — navigation verticale avec sections: Contenus, Utilisateurs, Paramètres
- `Main` — contenu principal affichant les listes, formulaires et vues détaillées

Contraintes et bonnes pratiques :

- Modals pour les formulaires : utiliser des modals pour les formulaires de création/modification (ex: créer contenu, créer utilisateur).
- Protection des routes selon les rôles : seules les routes du dashboard (ou leurs API) doivent être accessibles aux utilisateurs ayant le rôle `admin`.
- Confirmation : utiliser des modals de confirmation avant toute suppression ou modification critique.
- Formatage des dates : centraliser le formatage des dates (p.ex. utilitaire `src/utils/date.ts`) et respecter un format lisible (ex: `DD MMM YYYY` ou ISO selon la locale).
- Skeleton loader : prévoir des skeleton loaders pour les listes et cartes lors du chargement des données.

Notes d'implémentation :

- Prévoir des contraintes d'autorisation côté client et serveur (double protection).
- Préparer des hooks réutilisables pour le fetch/pagination des listes (contents, users).
- Tester l'accessibilité (ARIA) des modals et du menu de navigation.
siradio diallo
