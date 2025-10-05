import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Notification {
  id: string;
  message: string;
  type?: "info" | "error" | "success";
}

export interface StatusState {
  globalLoading: boolean;
  error?: string | null;
  notifications: Notification[];
}

const initialState: StatusState = { globalLoading: false, error: null, notifications: [] };

const slice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.globalLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    pushNotification(state, action: PayloadAction<Notification>) {
      state.notifications.push(action.payload);
    },
    clearNotifications(state) {
      state.notifications = [];
    },
  },
});

export const { setGlobalLoading, setError, pushNotification, clearNotifications } = slice.actions;
export default slice.reducer;
