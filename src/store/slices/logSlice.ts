import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLogsApi } from "../../services/api";
import type { LogEntry } from "../../types";

export interface LogState {
  items: LogEntry[];
  loading: boolean;
  error?: string | null;
}

const initialState: LogState = { items: [], loading: false, error: null };

export const fetchLogs = createAsyncThunk("logs/fetch", async () => {
  const res = await fetchLogsApi();
  return res;
});

const slice = createSlice({
  name: "logs",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchLogs.pending, (s) => {
      s.loading = true;
    });
    b.addCase(fetchLogs.fulfilled, (s, a) => {
      s.loading = false;
      s.items = a.payload;
    });
    b.addCase(fetchLogs.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message ?? "Failed fetching logs";
    });
  },
});

export default slice.reducer;
