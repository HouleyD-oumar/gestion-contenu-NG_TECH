import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersApi } from "../../services/api";
import type { User } from "../../types";

export interface UserState {
  items: User[];
  loading: boolean;
  pagination: { page: number; perPage: number; total: number };
  error?: string | null;
}

const initialState: UserState = {
  items: [],
  loading: false,
  pagination: { page: 1, perPage: 10, total: 0 },
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetch", async ({ page = 1, perPage = 10 }: { page?: number; perPage?: number } = {}) => {
  const res = await fetchUsersApi(page, perPage);
  return res;
});

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (s) => {
      s.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (s, a) => {
      s.loading = false;
      s.items = a.payload.items;
      s.pagination = a.payload.pagination;
    });
    builder.addCase(fetchUsers.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message ?? "Failed fetching users";
    });
  },
});

export default slice.reducer;
