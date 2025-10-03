# src/app/(Dashboard)

Contient les routes et pages du tableau de bord (zone d'administration). Ce dossier est destiné aux vues accessibles uniquement aux administrateurs.

Structure recommandée :

- `layout.tsx` — layout du dashboard (Header + Sidebar + Main).
- `contents/` — pages pour lister/créer/modifier/supprimer des contenus.
- `users/` — pages pour gérer les utilisateurs (créer, modifier, rôles, supprimer).

Composants recommandés : Header, Sidebar, ContentList, ContentCard, UserList, UserCard, Modals (Create/Edit), ConfirmModal, SkeletonLoader.

Règles / Contraintes :

- Restreindre l'accès : vérifier le rôle `admin` avant de rendre les pages du dashboard.
- Utiliser des modals pour les formulaires et des modals de confirmation pour suppression/modification.
- Centraliser le formatage des dates (utilitaire) et utiliser des skeleton loaders pour les chargements.

Remarque : ceci est une spécification documentaire — aucune implémentation n'a été ajoutée ici.
