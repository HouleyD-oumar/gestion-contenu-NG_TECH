import { apiSlice } from './apiSlice';
import type { DashboardStats } from '@/types';

export const statsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get dashboard statistics
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => '/stats/dashboard',
      providesTags: [{ type: 'Stats', id: 'DASHBOARD' }],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
} = statsApi;
