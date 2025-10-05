import { apiSlice } from './apiSlice';
import type {
  Activity,
  ActivityWithUser,
  PaginatedResponse,
  ActivityFilters,
} from '@/types';

export const activitiesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all activities with filters and pagination
    getActivities: builder.query<PaginatedResponse<ActivityWithUser>, ActivityFilters>({
      query: (params) => ({
        url: '/activities',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Activity' as const, id })),
              { type: 'Activity', id: 'LIST' },
            ]
          : [{ type: 'Activity', id: 'LIST' }],
    }),

    // Get single activity by ID
    getActivityById: builder.query<ActivityWithUser, string>({
      query: (id) => `/activities/${id}`,
      providesTags: (result, error, id) => [{ type: 'Activity', id }],
    }),

    // Get recent activities (for dashboard)
    getRecentActivities: builder.query<ActivityWithUser[], number | void>({
      query: (limit = 10) => ({
        url: '/activities/recent',
        params: { limit },
      }),
      providesTags: [{ type: 'Activity', id: 'RECENT' }],
    }),
  }),
});

export const {
  useGetActivitiesQuery,
  useGetActivityByIdQuery,
  useGetRecentActivitiesQuery,
} = activitiesApi;
