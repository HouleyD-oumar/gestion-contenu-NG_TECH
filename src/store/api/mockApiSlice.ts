// Mock API Slice - À utiliser pendant le développement sans backend
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  mockUsers,
  mockContents,
  mockActivities,
  mockDashboardStats,
  mockCategories,
  createPaginatedResponse,
} from '@/lib/mockData';
import type {
  UserResponse,
  ContentWithAuthor,
  Content,
  ActivityWithUser,
  DashboardStats,
  PaginatedResponse,
  PaginationParams,
  ContentFilters,
  ActivityFilters,
  UserRole,
} from '@/types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApiSlice = createApi({
  reducerPath: 'mockApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['User', 'Content', 'Activity', 'Stats'],
  endpoints: (builder) => ({
    // Users
    getUsers: builder.query<PaginatedResponse<UserResponse>, PaginationParams>({
      async queryFn(params) {
        await delay(500);
        const { page = 1, limit = 10, search = '' } = params;
        
        let filteredUsers = mockUsers;
        if (search) {
          filteredUsers = mockUsers.filter(u => 
            u.firstName.toLowerCase().includes(search.toLowerCase()) ||
            u.lastName.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
          );
        }
        
        return { data: createPaginatedResponse(filteredUsers, page, limit) };
      },
      providesTags: ['User'],
    }),

    updateUserRole: builder.mutation<UserResponse, { id: string; role: UserRole }>({
      async queryFn({ id, role }) {
        await delay(300);
        const userIndex = mockUsers.findIndex(u => u.id === id);
        if (userIndex !== -1) {
          // Créer une copie modifiable
          mockUsers[userIndex] = { ...mockUsers[userIndex], role };
          return { data: mockUsers[userIndex] };
        }
        return { error: { status: 404, data: 'User not found' } };
      },
      invalidatesTags: [{ type: 'User', id: 'LIST' }, { type: 'Stats' }],
    }),

    createUser: builder.mutation<UserResponse, any>({
      async queryFn(body) {
        await delay(300);
        const newUser: UserResponse = {
          id: String(mockUsers.length + 1),
          ...body,
        };
        mockUsers.push(newUser);
        return { data: newUser };
      },
      invalidatesTags: ['User', 'Stats'],
    }),

    deleteUser: builder.mutation<void, string>({
      async queryFn(id) {
        await delay(300);
        const index = mockUsers.findIndex(u => u.id === id);
        if (index !== -1) {
          mockUsers.splice(index, 1);
          return { data: undefined };
        }
        return { error: { status: 404, data: 'User not found' } };
      },
      invalidatesTags: ['User', 'Stats'],
    }),

    // Contents
    getContents: builder.query<PaginatedResponse<ContentWithAuthor>, ContentFilters>({
      async queryFn(params) {
        const { page = 1, limit = 12, search = '', category, tags } = params;
        
        let filteredContents = mockContents;
        
        if (search) {
          filteredContents = filteredContents.filter(c =>
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase())
          );
        }
        
        if (category) {
          filteredContents = filteredContents.filter(c => c.category === category);
        }
        
        if (tags && tags.length > 0) {
          filteredContents = filteredContents.filter(c =>
            tags.some(tag => c.tags.includes(tag))
          );
        }
        
        return { data: createPaginatedResponse(filteredContents, page, limit) };
      },
      providesTags: ['Content'],
    }),

    getMyContents: builder.query<PaginatedResponse<Content>, ContentFilters>({
      async queryFn(params) {
        await delay(500);
        // Simuler les contenus de l'utilisateur connecté (id: 1)
        const myContents = mockContents.filter(c => c.authorId === '1');
        const { page = 1, limit = 12 } = params;
        return { data: createPaginatedResponse(myContents as any, page, limit) };
      },
      providesTags: ['Content'],
    }),

    createContent: builder.mutation<Content, any>({
      async queryFn(body) {
        await delay(300);
        const newContent: any = {
          id: String(mockContents.length + 1),
          ...body,
          authorId: '1', // Utilisateur connecté mocké
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          author: mockUsers[0],
        };
        mockContents.push(newContent);
        return { data: newContent };
      },
      invalidatesTags: ['Content', 'Stats'],
    }),

    updateContent: builder.mutation<Content, { id: string; data: any }>({
      async queryFn({ id, data }) {
        await delay(300);
        const index = mockContents.findIndex(c => c.id === id);
        if (index !== -1) {
          mockContents[index] = {
            ...mockContents[index],
            ...data,
            updatedAt: new Date().toISOString(),
          };
          return { data: mockContents[index] as any };
        }
        return { error: { status: 404, data: 'Content not found' } };
      },
      invalidatesTags: ['Content', 'Stats'],
    }),

    deleteContent: builder.mutation<void, string>({
      async queryFn(id) {
        await delay(300);
        const index = mockContents.findIndex(c => c.id === id);
        if (index !== -1) {
          mockContents.splice(index, 1);
          return { data: undefined };
        }
        return { error: { status: 404, data: 'Content not found' } };
      },
      invalidatesTags: ['Content', 'Stats'],
    }),

    getCategories: builder.query<string[], void>({
      async queryFn() {
        await delay(200);
        return { data: mockCategories };
      },
    }),

    // Activities
    getActivities: builder.query<PaginatedResponse<ActivityWithUser>, ActivityFilters>({
      async queryFn(params) {
        await delay(500);
        const { page = 1, limit = 20, action } = params;
        
        let filteredActivities = mockActivities;
        
        if (action) {
          filteredActivities = filteredActivities.filter(a => a.action === action);
        }
        
        return { data: createPaginatedResponse(filteredActivities, page, limit) };
      },
      providesTags: ['Activity'],
    }),

    getRecentActivities: builder.query<ActivityWithUser[], number | undefined>({
      async queryFn(limit) {
        await delay(300);
        const actualLimit = limit || 10;
        return { data: mockActivities.slice(0, actualLimit) };
      },
      providesTags: ['Activity'],
    }),

    // Stats
    getDashboardStats: builder.query<DashboardStats, void>({
      async queryFn() {
        await delay(500);
        return { data: mockDashboardStats };
      },
      providesTags: ['Stats'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useGetContentsQuery,
  useGetMyContentsQuery,
  useCreateContentMutation,
  useUpdateContentMutation,
  useDeleteContentMutation,
  useGetCategoriesQuery,
  useGetActivitiesQuery,
  useGetRecentActivitiesQuery,
  useGetDashboardStatsQuery,
} = mockApiSlice;
