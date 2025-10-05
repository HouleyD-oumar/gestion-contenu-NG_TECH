import type { 
  DashboardStats, 
  UserResponse, 
  ContentWithAuthor, 
  ActivityWithUser,
  PaginatedResponse 
} from '@/types';
import { UserRole, ContentTag, ActivityAction } from '@/types';

// Mock Users
export const mockUsers: UserResponse[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: UserRole.ADMIN,
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    role: UserRole.EDITOR,
  },
  {
    id: '3',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    role: UserRole.VIEWER,
  },
];

// Mock Contents
export const mockContents: ContentWithAuthor[] = [
  {
    id: '1',
    title: 'Introduction à React et TypeScript',
    description: 'Découvrez comment créer des applications modernes avec React et TypeScript. Ce guide complet vous accompagne pas à pas.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    authorId: '1',
    tags: [ContentTag.TECHNOLOGY, ContentTag.EDUCATION],
    category: 'Développement Web',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
    author: mockUsers[0],
  },
  {
    id: '2',
    title: 'Les meilleures pratiques en entreprise',
    description: 'Comment optimiser votre productivité et celle de votre équipe avec des méthodes éprouvées.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    authorId: '2',
    tags: [ContentTag.BUSINESS],
    category: 'Management',
    createdAt: new Date('2024-02-10').toISOString(),
    updatedAt: new Date('2024-02-10').toISOString(),
    author: mockUsers[1],
  },
  {
    id: '3',
    title: 'Bien-être et équilibre de vie',
    description: 'Des conseils pratiques pour maintenir un équilibre sain entre vie professionnelle et personnelle.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    authorId: '1',
    tags: [ContentTag.LIFESTYLE, ContentTag.HEALTH],
    category: 'Bien-être',
    createdAt: new Date('2024-03-05').toISOString(),
    updatedAt: new Date('2024-03-05').toISOString(),
    author: mockUsers[0],
  },
];

// Mock Activities
export const mockActivities: ActivityWithUser[] = [
  {
    id: '1',
    performedBy: '1',
    performedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    action: ActivityAction.CREATE,
    resourceType: 'Content',
    resourceId: '1',
    details: 'Création d\'un nouveau contenu',
    user: mockUsers[0],
  },
  {
    id: '2',
    performedBy: '2',
    performedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    action: ActivityAction.UPDATE,
    resourceType: 'Content',
    resourceId: '2',
    details: 'Modification du contenu',
    user: mockUsers[1],
  },
  {
    id: '3',
    performedBy: '1',
    performedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    action: ActivityAction.LOGIN,
    user: mockUsers[0],
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalUsers: 3,
  totalContents: 3,
  totalActivities: 15,
  recentActivities: mockActivities,
  contentsByCategory: {
    'Développement Web': 1,
    'Management': 1,
    'Bien-être': 1,
  },
  usersByRole: {
    [UserRole.ADMIN]: 1,
    [UserRole.EDITOR]: 1,
    [UserRole.VIEWER]: 1,
  },
};

// Helper function to create paginated response
export function createPaginatedResponse<T>(
  data: T[],
  page: number = 1,
  limit: number = 10
): PaginatedResponse<T> {
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = data.slice(start, end);

  return {
    data: paginatedData,
    total: data.length,
    page,
    limit,
    totalPages: Math.ceil(data.length / limit),
  };
}

export const mockCategories = [
  'Développement Web',
  'Management',
  'Bien-être',
  'Marketing',
  'Design',
];
