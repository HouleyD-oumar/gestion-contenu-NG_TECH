**Cahier des Charges -- Projet Collaboratif (Front & Back)**

**1. Objectif du projet**

Développer une mini-application de gestion de contenu (CMS simplifié) permettant :

-   L'inscription et la connexion des utilisateurs.

-   La gestion des rôles et permissions (admin, editor, viewer).

-   Le CRUD (ajout, lecture, modification, suppression) de contenus.

-   Un tableau de bord d'administration pour gérer les utilisateurs et leurs rôles.

-   Une interface claire et intuitive qui reflète les permissions de chaque rôle.

Le projet doit être développé en collaboration entre deux groupes (Frontend et Backend) et livré au plus tard mardi.

**2. Fonctionnalités principales**

**2.1 Authentification & Utilisateurs**

-   Inscription (signup) avec email + mot de passe (hashé).

-   Connexion (login) avec retour d'un JWT.

-   Déconnexion.

-   Middleware backend pour sécuriser les routes avec vérification du token.

-   Gestion des rôles :

    -   Admin : accès complet (gestion utilisateurs + contenus(ses contenus) ).

    -   Editor : créer ,modifier et supprimer ses contenus.

    -   Viewer : lecture seule.

**2.2 Gestion des utilisateurs (Admin seulement)**

-   Consulter la liste des utilisateurs.

-   Modifier le rôle d'un utilisateur.

**2.3 Gestion des contenus**

-   **CRUD complet** :

    -   Admin → CRUD total.

    -   Editor → création + modification + suppresion (seulement ses propres contenus).

    -   Viewer → lecture seule.

> NB : Chaque contenu est lié à son **auteur**.

**2.4 Frontend -- Interface utilisateur**

**Page d'accueil** :\
Fil d'actualité affichant les contenus publiés, consultables par tous les utilisateurs.\
Filtre sur les catégories et les tags

**Dashboard** :

-   Gestion de contenu : Liste, ajout et modification de contenus selon les droits utilisateur (chaque utilisateur gère son propre contenu).

-   Gestion des utilisateurs (admin uniquement) : Visualisation de la liste des utilisateurs et modification des rôles.

**Formulaires** : Connexion et inscription.

**Navigation** : Dynamique selon le rôle de l'utilisateur.

**3. Contraintes techniques**

**3.1 Backend**

-   Stack : Node.js, Express.js, PostgreSQL.

-   Sécurité :

    -   Hash des mots de passe (bcrypt).

    -   Tokens JWT avec expiration (24h).

    -   Middleware checkRole pour protéger les routes.

-   Documentation API : Swagger.

-   Organisation du code : séparation en routes, contrôleurs, middlewares, modèles.

**3.2 Frontend**

-   Stack: React ou Next.js.

-   State management : Redux Toolkit avec RTK Query (pour centraliser appels API et cache).

-   UI/UX : TailwindCSS.

-   Auth : stockage du token (localStorage ou cookie).

-   Protection des pages : redirection vers une page dédiée si rôle non autorisé.

**4. Critères de validation**

-   Un utilisateur viewer ne peut que consulter les contenus.

-   Un editor peut créer/modifier/ supprimer.

-   Un admin peut tout faire + gérer les utilisateurs.

-   L'API est documentée avec Swagger.

-   L'UI reflète les rôles avec une navigation claire.

**5. Fonctionnalités additionnelles**

-   Pagination des contenus.

-   Upload d'images pour les articles.

-   Logs d'activité (qui a modifié quoi).
