"use client";

import Link from "next/link";
import { FaHome, FaHeart, FaCog } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col p-6 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200">
      
      <h1 className="text-2xl font-bold mb-10 text-slate-900 dark:text-white">
        Dashboard
      </h1>

      <nav className="flex flex-col gap-5">

        <Link
          href="/"
          className="flex items-center gap-3 hover:text-cyan-600 dark:hover:text-cyan-400 transition"
        >
          <FaHome />
          Home
        </Link>

        <Link
          href="/favorites"
          className="flex items-center gap-3 hover:text-cyan-600 dark:hover:text-cyan-400 transition"
        >
          <FaHeart />
          Favorites
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-3 hover:text-cyan-600 dark:hover:text-cyan-400 transition"
        >
          <FaCog />
          Settings
        </Link>

      </nav>
    </aside>
  );
}