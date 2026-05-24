"use client";

import SearchBar from "../ui/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/redux/slices/preferenceSlice";
import { RootState } from "@/redux/store";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Header() {

  const dispatch = useDispatch();

  const darkMode = useSelector(
    (state: RootState) => state.preferences.darkMode
  );

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur px-6 py-4 flex items-center justify-between dark:border-slate-800 dark:bg-slate-900/60">

      <SearchBar />

      <div className="flex items-center gap-4">

        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700/60 dark:hover:border-slate-500 dark:text-slate-300 dark:hover:text-white transition duration-200 cursor-pointer flex items-center justify-center"
        >
          {darkMode ? (
            <FaSun className="text-amber-400 text-sm" />
          ) : (
            <FaMoon className="text-cyan-400 text-sm" />
          )}
        </button>

        <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-slate-950">
          G
        </div>

      </div>
    </header>
  );
}