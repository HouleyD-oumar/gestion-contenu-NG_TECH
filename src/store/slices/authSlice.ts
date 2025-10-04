import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../services/api";
import type { User } from "../../types";

export interface AuthState {
  user: User | null;
  token?: string | null;
  loading: boolean;
  error?: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk("auth/login", async ({ email, password }: { email: string; password: string }) => {
  const res = await loginApi(email, password);
  return res;
});

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    builder.addCase(login.fulfilled, (s, a) => {
      s.loading = false;
      s.user = a.payload.user;
      s.token = a.payload.token;
    });
    builder.addCase(login.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message ?? "Login failed";
    });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;
