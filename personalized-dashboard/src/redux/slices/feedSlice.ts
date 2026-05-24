import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ContentItem } from "@/types/content";

interface FeedState {
  data: ContentItem[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: FeedState = {
  data: [],
  loading: false,
  error: null,
  searchQuery: "",
};

const feedSlice = createSlice({
  name: "feed",
  initialState,

  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setFeedData: (state, action: PayloadAction<ContentItem[]>) => {
      state.data = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setLoading,
  setFeedData,
  setError,
  setSearchQuery,
} = feedSlice.actions;

export default feedSlice.reducer;
