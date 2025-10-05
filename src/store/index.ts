import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { mockApiSlice } from './api/mockApiSlice';

// Utiliser mockApiSlice pour le développement sans backend
export const store = configureStore({
  reducer: {
    [mockApiSlice.reducerPath]: mockApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mockApiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
