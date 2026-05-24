import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
  searchQuery: "",
};

const feedSlice = createSlice({
  name: "feed",
  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setFeedData: (state, action) => {
      state.data = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    setSearchQuery: (state, action) => {
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