import { configureStore } from "@reduxjs/toolkit";
import preferenceReducer from "./slices/preferenceSlice";
import favoriteReducer from "./slices/favoriteSlice";
import feedReducer from "./slices/feedSlice";

export const store = configureStore({
  reducer: {
    preferences: preferenceReducer,
    favorites: favoriteReducer,
    feed: feedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;