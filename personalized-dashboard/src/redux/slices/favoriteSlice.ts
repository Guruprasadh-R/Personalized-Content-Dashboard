import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ContentItem } from "@/types/content";

interface FavoritesState {
  items: ContentItem[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,

  reducers: {
    addFavorite: (state, action: PayloadAction<ContentItem>) => {
      const exists = state.items.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    setFavorites: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
