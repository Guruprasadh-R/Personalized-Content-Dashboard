"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCategories, toggleDarkMode } from "@/redux/slices/preferenceSlice";
import { motion } from "framer-motion";
import { FaLaptopCode, FaRunning, FaChartLine, FaFilm, FaMoon, FaSun, FaCheck } from "react-icons/fa";

const AVAILABLE_CATEGORIES = [
  { id: "technology", label: "Technology", icon: FaLaptopCode, color: "from-cyan-500 to-blue-600" },
  { id: "sports", label: "Sports", icon: FaRunning, color: "from-orange-500 to-red-600" },
  { id: "finance", label: "Finance", icon: FaChartLine, color: "from-emerald-500 to-green-600" },
  { id: "entertainment", label: "Entertainment", icon: FaFilm, color: "from-purple-500 to-pink-600" },
];

export default function SettingsPage() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.preferences.darkMode);
  const selectedCategories = useSelector((state: RootState) => state.preferences.categories);

  const handleCategoryToggle = (categoryId: string) => {
    let updatedCategories;
    if (selectedCategories.includes(categoryId)) {
      // Don't let users deselect everything
      if (selectedCategories.length === 1) return;
      updatedCategories = selectedCategories.filter((c) => c !== categoryId);
    } else {
      updatedCategories = [...selectedCategories, categoryId];
    }
    dispatch(setCategories(updatedCategories));
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800/60">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:via-teal-400 dark:to-blue-400">
            Preferences & Settings
          </h1>
          <p className="text-slate-600 text-sm mt-1 dark:text-slate-400">
            Customize your feed topics, system display configurations, and themes.
          </p>
        </div>

        <div className="space-y-8">
          {/* Theme Settings Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white border border-slate-200 rounded-2xl shadow-lg dark:bg-slate-900/60 dark:border-slate-800/80 dark:shadow-xl backdrop-blur-md"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 dark:text-slate-100">
              <span>Display Theme</span>
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-800 font-medium dark:text-slate-200">Dark Mode Appearance</p>
                <p className="text-slate-600 text-xs mt-0.5 dark:text-slate-400">Toggle between a modern dark layout and classic light theme.</p>
              </div>
              <button
                onClick={() => dispatch(toggleDarkMode())}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 p-1 flex items-center cursor-pointer ${
                  darkMode ? "bg-cyan-500" : "bg-slate-300 dark:bg-slate-700"
                }`}
              >
                <motion.div
                  layout
                  className="w-6 h-6 rounded-full bg-white dark:bg-slate-950 flex items-center justify-center shadow-lg"
                  animate={{ x: darkMode ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {darkMode ? (
                    <FaMoon className="text-cyan-400 text-[10px]" />
                  ) : (
                    <FaSun className="text-amber-400 text-[10px]" />
                  )}
                </motion.div>
              </button>
            </div>
          </motion.div>

          {/* Categories Settings Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-white border border-slate-200 rounded-2xl shadow-lg dark:bg-slate-900/60 dark:border-slate-800/80 dark:shadow-xl backdrop-blur-md"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-2 dark:text-slate-100">Content Preferences</h2>
            <p className="text-slate-600 text-xs mb-6 dark:text-slate-400">Select the categories you want to see inside your dashboard. At least one must be selected.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AVAILABLE_CATEGORIES.map((category) => {
                const isSelected = selectedCategories.includes(category.id);
                const Icon = category.icon;

                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryToggle(category.id)}
                    className={`p-5 rounded-2xl border text-left flex items-start justify-between cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "bg-cyan-50 border-cyan-500/80 shadow-md shadow-cyan-500/10 dark:bg-slate-800/50 dark:shadow-cyan-500/5"
                        : "bg-slate-50 border-slate-200 opacity-80 hover:opacity-100 dark:bg-slate-950/40 dark:border-slate-800/80 dark:opacity-60 dark:hover:opacity-90"
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-slate-950`}>
                        <Icon className="text-lg" />
                      </div>
                      <div>
                        <h3 className="text-slate-900 font-semibold text-base dark:text-slate-100">{category.label}</h3>
                        <p className="text-slate-600 text-[11px] mt-0.5 dark:text-slate-400">Show trending {category.id} posts.</p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-[10px] text-slate-950 font-bold">
                        <FaCheck />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}