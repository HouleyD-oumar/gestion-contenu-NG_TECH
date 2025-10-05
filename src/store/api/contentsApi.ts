import { apiSlice } from './apiSlice';
import type {
  Content,
  ContentWithAuthor,
  CreateContentDto,
  UpdateContentDto,
  PaginatedResponse,
  ContentFilters,
} from '@/types';

export const contentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all contents with filters and pagination
    getContents: builder.query<PaginatedResponse<ContentWithAuthor>, ContentFilters>({
      query: (params) => ({
        url: '/contents',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Content' as const, id })),
              { type: 'Content', id: 'LIST' },
            ]
          : [{ type: 'Content', id: 'LIST' }],
    }),

    // Get user's own contents
    getMyContents: builder.query<PaginatedResponse<Content>, ContentFilters>({
      query: (params) => ({
        url: '/contents/my',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Content' as const, id })),
              { type: 'Content', id: 'MY_LIST' },
            ]
          : [{ type: 'Content', id: 'MY_LIST' }],
    }),

    // Get single content by ID
    getContentById: builder.query<ContentWithAuthor, string>({
      query: (id) => `/contents/${id}`,
      providesTags: (result, error, id) => [{ type: 'Content', id }],
    }),

    // Create new content
    createContent: builder.mutation<Content, CreateContentDto>({
      query: (body) => ({
        url: '/contents',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'Content', id: 'LIST' },
        { type: 'Content', id: 'MY_LIST' },
        { type: 'Stats' },
      ],
    }),

    // Update content
    updateContent: builder.mutation<Content, { id: string; data: UpdateContentDto }>({
      query: ({ id, data }) => ({
        url: `/contents/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Content', id },
        { type: 'Content', id: 'LIST' },
        { type: 'Content', id: 'MY_LIST' },
        { type: 'Stats' },
      ],
    }),

    // Delete content
    deleteContent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contents/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'Content', id: 'LIST' },
        { type: 'Content', id: 'MY_LIST' },
        { type: 'Stats' },
      ],
    }),

    // Get content categories
    getCategories: builder.query<string[], void>({
      query: () => '/contents/categories',
    }),
  }),
});

export const {
  useGetContentsQuery,
  useGetMyContentsQuery,
  useGetContentByIdQuery,
  useCreateContentMutation,
  useUpdateContentMutation,
  useDeleteContentMutation,
  useGetCategoriesQuery,
} = contentsApi;
