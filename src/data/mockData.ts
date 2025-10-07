/**
 * DONNÉES DE TEST POUR LES MODÈLES
 *
 * Ces données correspondent exactement aux modèles définis dans models.md
 * Utilisez-les pour tester l'application avec des données réalistes.
 */

// ============================================================================
// TYPES ENUMÉRÉS (d'après models.md)
// ============================================================================

export type UserRole = "admin" | "editor" | "viewer";
export type ContentCategory = "technology" | "design" | "business" | "lifestyle" | "education";
export type LogAction = "create" | "update" | "delete" | "login" | "logout" | "publish";

// ============================================================================
export const mockUsers = [
  {
    id: "1",
    firstName: "Amadou",
    lastName: "Diallo",
    email: "admin@gestion-contenu.com",
    password: "admin123",
    role: "admin" as UserRole
  },
  {
    id: "2",
    firstName: "Fatoumata",
    lastName: "Camara",
    email: "fatoumata@gestion-contenu.com",
    password: "editor123",
    role: "editor" as UserRole
  },
  {
    id: "3",
    firstName: "Ibrahim",
    lastName: "Sylla",
    email: "ibrahim@gestion-contenu.com",
    password: "viewer123",
    role: "viewer" as UserRole
  },
  {
    id: "4",
    firstName: "Mariama",
    lastName: "Sow",
    email: "mariama@gestion-contenu.com",
    password: "editor123",
    role: "editor" as UserRole
  },
  {
    id: "5",
    firstName: "Abdoulaye",
    lastName: "Barry",
    email: "abdoulaye@gestion-contenu.com",
    password: "viewer123",
    role: "viewer" as UserRole
  }
];

export const mockContents = [
  {
    id: "1",
    title: "Introduction à React 18",
    description: "Découvrez les nouvelles fonctionnalités de React 18 incluant les composants concurrents et les nouvelles APIs de rendu.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    authorId: "2",
    tags: ["react", "javascript", "frontend"],
    category: "technology" as ContentCategory,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    title: "Design System avec Tailwind CSS",
    description: "Apprenez à créer un système de design cohérent en utilisant Tailwind CSS et les meilleures pratiques du design moderne.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop",
    authorId: "1",
    tags: ["design", "tailwind", "css", "ui"],
    category: "design" as ContentCategory,
    createdAt: "2024-01-14T15:20:00Z",
    updatedAt: "2024-01-14T15:20:00Z"
  },
  {
    id: "3",
    title: "Stratégies de croissance pour startups",
    description: "Les meilleures stratégies pour développer votre startup de manière durable et efficace sur le marché actuel.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop",
    authorId: "1",
    tags: ["business", "startup", "croissance", "entrepreneuriat"],
    category: "business" as ContentCategory,
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T09:15:00Z"
  },
  {
    id: "4",
    title: "Guide complet du télétravail",
    description: "Tout ce que vous devez savoir pour réussir votre transition vers le télétravail et maintenir votre productivité.",
  // Original image returned 404; replaced with a stable Unsplash image
  image: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=800&h=400&fit=crop",
    authorId: "3",
    tags: ["lifestyle", "télétravail", "productivité", "équilibre"],
    category: "lifestyle" as ContentCategory,
    createdAt: "2024-01-12T14:45:00Z",
    updatedAt: "2024-01-12T14:45:00Z"
  },
  {
    id: "5",
    title: "Nouveautés de TypeScript 5.0",
    description: "Explorez les améliorations apportées par TypeScript 5.0 et comment elles impactent votre développement quotidien.",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    authorId: "2",
    tags: ["typescript", "javascript", "développement"],
    category: "technology" as ContentCategory,
    createdAt: "2024-01-11T11:30:00Z",
    updatedAt: "2024-01-11T11:30:00Z"
  },
  {
    id: "6",
    title: "UX Design : principes fondamentaux",
    description: "Les principes essentiels du design UX pour créer des expériences utilisateur exceptionnelles et intuitives.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
    authorId: "1",
    tags: ["ux", "design", "utilisateur", "expérience"],
    category: "design" as ContentCategory,
    createdAt: "2024-01-10T16:20:00Z",
    updatedAt: "2024-01-10T16:20:00Z"
  },
  {
    id: "7",
    title: "Intelligence artificielle en entreprise",
    description: "Comment intégrer l'IA dans votre stratégie d'entreprise pour améliorer l'efficacité et l'innovation.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    authorId: "2",
    tags: ["ia", "intelligence-artificielle", "entreprise", "innovation"],
    category: "technology" as ContentCategory,
    createdAt: "2024-01-09T13:10:00Z",
    updatedAt: "2024-01-09T13:10:00Z"
  },
  {
    id: "8",
    title: "Marketing digital : tendances 2024",
    description: "Les dernières tendances en marketing digital et comment les appliquer à votre stratégie de croissance.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    authorId: "1",
    tags: ["marketing", "digital", "tendances", "croissance"],
    category: "business" as ContentCategory,
    createdAt: "2024-01-08T10:45:00Z",
    updatedAt: "2024-01-08T10:45:00Z"
  },
  {
    id: "9",
    title: "Bien-être au travail : guide pratique",
    description: "Conseils pratiques pour améliorer votre bien-être au travail et maintenir un équilibre vie professionnelle/personnelle.",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=400&fit=crop",
    authorId: "3",
    tags: ["bien-être", "travail", "équilibre", "santé"],
    category: "lifestyle" as ContentCategory,
    createdAt: "2024-01-07T15:30:00Z",
    updatedAt: "2024-01-07T15:30:00Z"
  },
  {
    id: "10",
    title: "Apprendre à coder : parcours complet",
    description: "Un guide complet pour apprendre à programmer, de débutant à développeur expérimenté.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=400&fit=crop",
    authorId: "2",
    tags: ["apprentissage", "programmation", "développement", "formation"],
    category: "education" as ContentCategory,
    createdAt: "2024-01-06T12:20:00Z",
    updatedAt: "2024-01-06T12:20:00Z"
  }
];

export const mockLogs = [
  {
    id: "1",
    performedBy: "1", // Amadou Diallo (admin)
    performedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    action: "create" as LogAction
  },
  {
    id: "2",
    performedBy: "2", // Fatoumata Camara (editor)
    performedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    action: "update" as LogAction
  },
  {
    id: "3",
    performedBy: "1", // Amadou Diallo (admin)
    performedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    action: "publish" as LogAction
  },
  {
    id: "4",
    performedBy: "3", // Ibrahim Sylla (viewer)
    performedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    action: "login" as LogAction
  },
  {
    id: "5",
    performedBy: "2", // Fatoumata Camara (editor)
    performedAt: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
    action: "create" as LogAction
  },
  {
    id: "6",
    performedBy: "1", // Amadou Diallo (admin)
    performedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    action: "delete" as LogAction
  }
];

// ============================================================================
// FONCTIONS UTILITAIRES POUR LES TESTS
// ============================================================================

export const getUserById = (id: string) => mockUsers.find(user => user.id === id);
export const getUserByEmail = (email: string) => mockUsers.find(user => user.email === email);
export const getContentById = (id: string) => mockContents.find(content => content.id === id);
export const getContentsByCategory = (category: ContentCategory) =>
  mockContents.filter(content => content.category === category);
export const getContentsByAuthor = (authorId: string) =>
  mockContents.filter(content => content.authorId === authorId);
export const getLogsByUser = (userId: string) =>
  mockLogs.filter(log => log.performedBy === userId);

// ============================================================================
// CONSTANTES POUR LES TESTS
// ============================================================================

export const TEST_CREDENTIALS = {
  admin: { email: "admin@gestion-contenu.com", password: "admin123" },
  editor: { email: "fatoumata@gestion-contenu.com", password: "editor123" },
  viewer: { email: "ibrahim@gestion-contenu.com", password: "viewer123" }
};

export const CATEGORIES = [
  { id: "all", label: "Tous" },
  { id: "technology", label: "Technologie" },
  { id: "design", label: "Design" },
  { id: "business", label: "Business" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "education", label: "Éducation" }
];
