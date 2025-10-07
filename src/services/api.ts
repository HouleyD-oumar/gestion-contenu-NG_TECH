import type { Content, User, LogEntry, Pagination } from "../types";

const wait = (ms = 500) => new Promise((r) => setTimeout(r, ms));

// Données mock pour les utilisateurs
const mockUsers: User[] = [
  {
    id: "1",
    firstName: "Amadou",
    lastName: "Diallo",
    email: "admin@gestion-contenu.com",
    password: "admin123",
    role: "admin"
  },
  {
    id: "2",
    firstName: "Fatoumata",
    lastName: "Camara",
    email: "marie@gestion-contenu.com",
    password: "editor123",
    role: "editor"
  },
  {
    id: "3",
    firstName: "Ibrahim",
    lastName: "Sylla",
    email: "pierre@gestion-contenu.com",
    password: "viewer123",
    role: "viewer"
  }
];

// Données mock pour le contenu
const mockContents: Content[] = [
  {
    id: "1",
    title: "Introduction à React 18",
    description: "Découvrez les nouvelles fonctionnalités de React 18 incluant les composants concurrents et les nouvelles APIs de rendu.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    authorId: "2",
    tags: ["react", "javascript", "frontend"],
    category: "technology",
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
    category: "design",
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
    category: "business",
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
    category: "lifestyle",
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
    category: "technology",
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
    category: "design",
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
    category: "technology",
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
    category: "business",
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
    category: "lifestyle",
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
    category: "education",
    createdAt: "2024-01-06T12:20:00Z",
    updatedAt: "2024-01-06T12:20:00Z"
  }
];

export async function fetchContentsApi(params?: {
  page?: number;
  perPage?: number;
  tags?: string[];
  category?: string;
}): Promise<{ items: Content[]; pagination: Pagination }> {
  await wait(600);

  let filteredItems = [...mockContents];

  // Filtrer par tags si spécifiés
  if (params?.tags && params.tags.length > 0) {
    filteredItems = filteredItems.filter(content =>
      params.tags!.some(tag => content.tags.includes(tag))
    );
  }

  // Filtrer par catégorie si spécifiée
  if (params?.category && params.category !== "all") {
    filteredItems = filteredItems.filter(content => content.category === params.category);
  }

  // Pagination
  const page = params?.page ?? 1;
  const perPage = params?.perPage ?? 8;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    pagination: {
      page,
      perPage,
      total: filteredItems.length
    },
  };
}

export async function fetchUsersApi(page = 1, perPage = 10): Promise<{ items: User[]; pagination: Pagination }> {
  await wait(400);

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedUsers = mockUsers.slice(startIndex, endIndex);

  return {
    items: paginatedUsers,
    pagination: { page, perPage, total: mockUsers.length }
  };
}

export async function loginApi(email: string, password: string): Promise<{ token: string; user: User }> {
  await wait(500);

  // Recherche de l'utilisateur par email
  const user = mockUsers.find(u => u.email === email);

  if (!user || user.password !== password) {
    throw new Error("Identifiants invalides");
  }

  return {
    token: user.role === "admin" ? "admintoken" : "usertoken",
    user
  };
}

export async function fetchLogsApi(): Promise<LogEntry[]> {
  await wait(300);

  return [
    {
      id: "1",
      performedBy: "1", // Jean Dupont (admin)
      performedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      action: "create"
    },
    {
      id: "2",
      performedBy: "2", // Marie Martin (editor)
      performedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      action: "update"
    },
    {
      id: "3",
      performedBy: "1", // Jean Dupont (admin)
      performedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      action: "publish"
    },
    {
      id: "4",
      performedBy: "3", // Pierre Durand (viewer)
      performedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      action: "login"
    },
    {
      id: "5",
      performedBy: "2", // Marie Martin (editor)
      performedAt: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
      action: "create"
    },
    {
      id: "6",
      performedBy: "1", // Jean Dupont (admin)
      performedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      action: "delete"
    },
    {
      id: "7",
      performedBy: "2", // Marie Martin (editor)
      performedAt: new Date(Date.now() - 1000 * 60 * 210).toISOString(),
      action: "update"
    },
    {
      id: "8",
      performedBy: "3", // Pierre Durand (viewer)
      performedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
      action: "logout"
    },
    {
      id: "9",
      performedBy: "1", // Jean Dupont (admin)
      performedAt: new Date(Date.now() - 1000 * 60 * 270).toISOString(),
      action: "publish"
    },
    {
      id: "10",
      performedBy: "2", // Marie Martin (editor)
      performedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      action: "create"
    }
  ];
}
