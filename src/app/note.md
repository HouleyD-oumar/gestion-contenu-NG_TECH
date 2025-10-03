# src/app

Contient les pages, layouts et ressources liées aux routes Next.js (App Router).

Fichiers clés:

- `page.tsx` — page d'accueil
- `layout.tsx` — layout global
- Sous-dossiers `(auth)`, `(Dashboard)` — routes groupées et pages de l'application.

Utilisation: modifier les pages ici pour changer l'interface et la navigation.

Spécification de la page d'accueil (résumé) :

- Header : nom du projet + avatar utilisateur (menu: déconnexion, lien vers tableau de bord selon rôle).
- Bouton "Publier" : visible uniquement pour les rôles `admin` et `éditeur`.
- Filters : filtrer par `tags` et `categories`.
- ContentList / ContentCard : carte affichant avatar de l'auteur, nom et date, extrait de 100-150 caractères (espaces inclus) et lien "Voir plus" pour l'intégralité.
- Footer : liste des équipes (backend, frontend, mobile).
