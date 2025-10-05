import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchContentsApi } from "../../services/api";
import type { Content } from "../../types";

export interface ContentState {
	items: Content[];
	loading: boolean;
	error?: string | null;
	filters: { tags: string[]; category?: string };
	pagination: { page: number; perPage: number; total: number };
}

const initialState: ContentState = {
	items: [],
	loading: false,
	error: null,
	filters: { tags: [], category: undefined },
	pagination: { page: 1, perPage: 8, total: 0 },
};

export const fetchContents = createAsyncThunk(
	"content/fetchContents",
	async (params: { page?: number; perPage?: number; tags?: string[]; category?: string } = {}) => {
		const res = await fetchContentsApi(params);
		return res;
	}
);

const slice = createSlice({
	name: "content",
	initialState,
	reducers: {
		setFilters(state, action: PayloadAction<{ tags?: string[]; category?: string }>) {
			state.filters = { ...state.filters, ...action.payload };
		},
		setPagination(state, action: PayloadAction<{ page?: number; perPage?: number }>) {
			state.pagination = { ...state.pagination, ...action.payload };
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchContents.pending, (s) => {
			s.loading = true;
			s.error = null;
		});
		builder.addCase(fetchContents.fulfilled, (s, a) => {
			s.loading = false;
			s.items = a.payload.items;
			s.pagination = a.payload.pagination;
		});
		builder.addCase(fetchContents.rejected, (s, a) => {
			s.loading = false;
			s.error = a.error.message ?? "Failed fetching contents";
		});
	},
});

export const { setFilters, setPagination } = slice.actions;
export default slice.reducer;

