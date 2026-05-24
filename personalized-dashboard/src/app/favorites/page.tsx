"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ContentCard from "@/components/cards/ContentCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { FaHeart, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

export default function FavoritesPage() {
  const favorites = useSelector((state: RootState) => state.favorites.items);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 border-b border-slate-200 pb-6 flex items-center justify-between dark:border-slate-800/60">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent dark:from-red-400 dark:via-pink-400 dark:to-purple-400">
              My Favorites
            </h1>
            <p className="text-slate-600 text-sm mt-1 dark:text-slate-400">
              Your hand-picked collection of technology news, movies, and social posts.
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 transition duration-200 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700 dark:text-slate-300 dark:hover:text-white"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to Feed</span>
          </Link>
        </div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-20 text-center bg-white border border-slate-200 rounded-3xl p-8 dark:bg-slate-900/40 dark:border-slate-800/60 backdrop-blur-md"
          >
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20 shadow-lg shadow-red-500/5">
              <FaHeart className="text-red-500 text-2xl animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 dark:text-slate-100">No Favorites Yet</h2>
            <p className="text-slate-600 max-w-md mb-8 text-sm leading-relaxed dark:text-slate-400">
              Explore your feed, click the heart icon on any post or movie, and save it here to view it later.
            </p>
            <Link
              href="/"
              className="bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-200 shadow-lg shadow-cyan-500/15 dark:text-slate-950"
            >
              Explore Feed
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {favorites.map((item: any) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}