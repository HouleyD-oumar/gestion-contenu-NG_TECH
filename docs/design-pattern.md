# Design et patterns

Ce fichier explique les principaux choix de design et les patterns utilisés dans le projet.

## Principes

- Composants petits et réutilisables — chaque composant UI doit être responsable d'une seule chose.
- Séparation des responsabilités — présentation (`components`), logique métier (`services`, `store`).
- Typescript-first — utiliser des types partagés depuis `src/types`.

## Patterns utilisés

- Container/Presentational: les pages orchestrent les données et passent des props aux composants.
- Hooks personnalisés pour encapsuler la logique de fetching et d'état local.
- Redux Toolkit pour le state global (slices).

## Styling

- Utility-first via TailwindCSS.
- `class-variance-authority` et `clsx` pour composer les classes conditionnelles.

## Dashboard (bonnes pratiques)

- Utiliser des modals pour les formulaires afin d'éviter les navigations lourdes.
- Protéger les routes selon les rôles (middleware ou guards côté client) et vérifier également côté serveur.
- Utiliser des modals de confirmation avant suppression/modification.
- Utiliser des skeleton loaders pour améliorer la perception du chargement.
- Centraliser le formatage des dates dans des utilitaires réutilisables.
