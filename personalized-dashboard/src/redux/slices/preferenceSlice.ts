import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: true,
  categories: ["technology"],
};

const preferenceSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },

    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },

    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { toggleDarkMode, setDarkMode, setCategories } =
  preferenceSlice.actions;

export default preferenceSlice.reducer;