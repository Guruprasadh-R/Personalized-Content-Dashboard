"use client";

import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/slices/feedSlice";
import debounce from "lodash.debounce";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  // Create the debounced search function
  const debouncedDispatch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(setSearchQuery(value));
      }, 300),
    [dispatch]
  );

  // Clean up debounce on unmount
  useEffect(() => {
    return () => {
      debouncedDispatch.cancel();
    };
  }, [debouncedDispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedDispatch(value);
  };

  return (
    <div className="relative w-full md:w-80">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
        <FaSearch className="text-sm" />
      </div>
      <input
        type="text"
        placeholder="Search posts, movies, tags..."
        value={inputValue}
        onChange={handleInputChange}
        className="bg-slate-100 border border-slate-200 hover:border-slate-300 focus:border-cyan-500 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none w-full transition-all duration-300 shadow-inner dark:bg-slate-950/60 dark:border-slate-800/80 dark:hover:border-slate-700/80 dark:focus:border-cyan-500/80 dark:text-slate-200 dark:placeholder-slate-500"
      />
    </div>
  );
}