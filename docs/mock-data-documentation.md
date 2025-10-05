# Documentation des Données Mock

Ce document explique comment les données mock correspondent exactement aux modèles définis dans `docs/models.md`.

## 📋 Modèles de Référence

### Users
```typescript
interface User {
  id: string;           // Identifiant unique
  firstName: string;    // Prénom
  lastName: string;     // Nom de famille
  email: string;        // Adresse email
  password: string;     // Mot de passe hashé
  role: UserRole;       // Rôle utilisateur
}

type UserRole = "admin" | "editor" | "viewer";
```

### Content / Blog
```typescript
interface Content {
  id: string;              // Identifiant unique
  title: string;           // Titre du contenu
  description: string;     // Description complète
  image: string;           // URL de l'image
  authorId: string;        // ID de l'auteur
  tags: string[];          // Mots-clés
  category: ContentCategory; // Catégorie
  createdAt: string;       // Date de création (ISO)
  updatedAt: string;       // Date de modification (ISO)
}

type ContentCategory = "technology" | "design" | "business" | "lifestyle" | "education";
```

### Activity/Logs
```typescript
interface LogEntry {
  id: string;           // Identifiant unique
  performedBy: string;  // ID de l'utilisateur
  performedAt: string;  // Date de l'action (ISO)
  action: LogAction;    // Type d'action
}

type LogAction = "create" | "update" | "delete" | "login" | "logout" | "publish";
```

## 🎯 Données Mock Disponibles

### Utilisateurs de Test

| ID | Prénom | Nom | Email | Rôle | Mot de passe |
|----|---------|-----|-------|------|--------------|
| 1 | Jean | Dupont | admin@gestion-contenu.com | admin | admin123 |
| 2 | Marie | Martin | marie@gestion-contenu.com | editor | editor123 |
| 3 | Pierre | Durand | pierre@gestion-contenu.com | viewer | viewer123 |
| 4 | Sophie | Lopez | sophie@gestion-contenu.com | editor | editor456 |
| 5 | Thomas | Garcia | thomas@gestion-contenu.com | viewer | viewer789 |

### Contenu de Test (10 articles)

#### Technologie (3 articles)
- Introduction à React 18 (Marie Martin)
- Nouveautés de TypeScript 5.0 (Marie Martin)
- Intelligence artificielle en entreprise (Marie Martin)

#### Design (2 articles)
- Design System avec Tailwind CSS (Jean Dupont)
- UX Design : principes fondamentaux (Jean Dupont)

#### Business (2 articles)
- Stratégies de croissance pour startups (Jean Dupont)
- Marketing digital : tendances 2024 (Jean Dupont)

#### Lifestyle (2 articles)
- Guide complet du télétravail (Pierre Durand)
- Bien-être au travail (Pierre Durand)

#### Éducation (1 article)
- Apprendre à coder : parcours complet (Marie Martin)

### Logs d'Activité (10 entrées)

Actions représentées :
- **create** : Création de contenu
- **update** : Modification de contenu
- **delete** : Suppression de contenu
- **publish** : Publication de contenu
- **login** : Connexion utilisateur
- **logout** : Déconnexion utilisateur

## 🚀 Utilisation pour les Tests

### Identifiants de Test Rapide

```typescript
import { TEST_CREDENTIALS } from '../data/mockData';

// Connexion Admin
const adminLogin = {
  email: TEST_CREDENTIALS.admin.email,
  password: TEST_CREDENTIALS.admin.password
};

// Connexion Éditeur
const editorLogin = {
  email: TEST_CREDENTIALS.editor.email,
  password: TEST_CREDENTIALS.editor.password
};

// Connexion Viewer
const viewerLogin = {
  email: TEST_CREDENTIALS.viewer.email,
  password: TEST_CREDENTIALS.viewer.password
};
```

### Fonctions Utilitaires

```typescript
import {
  getUserById,
  getContentById,
  getContentsByCategory,
  getContentsByAuthor,
  getLogsByUser
} from '../data/mockData';

// Récupérer un utilisateur par ID
const admin = getUserById("1");

// Récupérer le contenu d'une catégorie
const techArticles = getContentsByCategory("technology");

// Récupérer les articles d'un auteur
const marieArticles = getContentsByAuthor("2");

// Récupérer les logs d'un utilisateur
const jeanLogs = getLogsByUser("1");
```

## ✅ Validation des Modèles

### Vérifications Effectuées

✅ **Types TypeScript** correspondent exactement aux modèles
✅ **Données mock** utilisent tous les champs requis
✅ **Énums** correctement définis et utilisés
✅ **Relations** entre modèles préservées (authorId référence User.id)
✅ **Formats de données** respectés (timestamps ISO, URLs valides)
✅ **Cohérence** entre les données de différents modèles

### Tests Automatisés

Les données mock sont conçues pour fonctionner avec :
- ✅ Tests unitaires des composants
- ✅ Tests d'intégration des API
- ✅ Tests end-to-end de l'interface
- ✅ Vérifications de types TypeScript

## 📊 Couverture des Cas d'Usage

### Par Rôles Utilisateur
- **Admin** : Peut créer, modifier, supprimer, publier
- **Editor** : Peut créer et modifier du contenu
- **Viewer** : Consultation seule + authentification

### Par Catégories de Contenu
- **Technology** : Articles techniques et tutoriels
- **Design** : Guides de design et UX
- **Business** : Stratégies et marketing
- **Lifestyle** : Conseils et bien-être
- **Education** : Formation et apprentissage

### Par Actions Système
- **CRUD** : Création, lecture, modification, suppression
- **Auth** : Connexion et déconnexion
- **Publication** : Workflow de publication

---

**Toutes les données mock correspondent maintenant parfaitement aux modèles définis dans `models.md` !** 🎉
