import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },

  reducers: {
    addFavorite: (state, action) => {
      const exists = state.items.some((item: any) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFavorite: (state, action) => {
      state.items = state.items.filter(
        (item: any) => item.id !== action.payload
      );
    },

    setFavorites: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;