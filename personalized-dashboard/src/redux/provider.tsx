"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { store, RootState } from "./store";
import { setFavorites } from "./slices/favoriteSlice";
import { setDarkMode, setCategories } from "./slices/preferenceSlice";

function StateSynchronizer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const darkMode = useSelector((state: RootState) => state.preferences.darkMode);
  const categories = useSelector((state: RootState) => state.preferences.categories);
  const [mounted, setMounted] = useState(false);

  // 1. Initial load on client mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("favorites");
      if (savedFavorites) {
        dispatch(setFavorites(JSON.parse(savedFavorites)));
      }

      const savedDarkMode = localStorage.getItem("darkMode");
      if (savedDarkMode !== null) {
        dispatch(setDarkMode(savedDarkMode === "true"));
      }

      const savedCategories = localStorage.getItem("categories");
      if (savedCategories) {
        dispatch(setCategories(JSON.parse(savedCategories)));
      }
    } catch (e) {
      console.error("Failed to load state from localStorage:", e);
    }
    setMounted(true);
  }, [dispatch]);

  // 2. Sync favorites changes to localStorage (only after mount/hydration is complete)
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to save favorites to localStorage:", e);
    }
  }, [favorites, mounted]);

  // 3. Sync preferences changes to localStorage and apply theme
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("darkMode", String(darkMode));
    } catch (e) {
      console.error("Failed to save darkMode to localStorage:", e);
    }
  }, [darkMode, mounted]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  }, [darkMode]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("categories", JSON.stringify(categories));
    } catch (e) {
      console.error("Failed to save categories to localStorage:", e);
    }
  }, [categories, mounted]);

  // Prevent flash of unstyled content during client hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100" />
    );
  }

  return <>{children}</>;
}

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <StateSynchronizer>{children}</StateSynchronizer>
    </Provider>
  );
}