import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base API configuration
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    prepareHeaders: (headers) => {
      // Add auth token if available
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Content', 'Activity', 'Stats'],
  endpoints: () => ({}),
});
