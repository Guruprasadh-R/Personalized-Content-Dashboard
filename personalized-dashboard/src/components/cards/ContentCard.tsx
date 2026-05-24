"use client";

import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addFavorite, removeFavorite } from "@/redux/slices/favoriteSlice";

interface Props {
  item: any;
}

export default function ContentCard({ item }: Props) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some((fav: any) => fav.id === item.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(item.id));
    } else {
      dispatch(addFavorite(item));
    }
  };

  const typeColors: Record<string, string> = {
    news: "bg-cyan-500/10 text-cyan-600 border border-cyan-500/30 dark:text-cyan-400 dark:border-cyan-500/20",
    movie: "bg-purple-500/10 text-purple-600 border border-purple-500/30 dark:text-purple-400 dark:border-purple-500/20",
    social: "bg-pink-500/10 text-pink-600 border border-pink-500/30 dark:text-pink-400 dark:border-pink-500/20",
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-slate-200/80 dark:bg-slate-900/80 dark:border-slate-800/80 dark:shadow-lg dark:hover:shadow-cyan-500/5 transition-all duration-300 flex flex-col justify-between backdrop-blur-md"
    >
      <div>
        <div className="relative h-52 w-full overflow-hidden group">
          <img
            src={item.image || "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=600&auto=format&fit=crop&q=80"}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent dark:from-slate-950/40" />
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize border ${typeColors[item.type] || "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"}`}>
              {item.type}
            </span>

            <button
              onClick={handleFavoriteClick}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 dark:border-slate-700/60 dark:hover:border-slate-500 transition-all duration-200 cursor-pointer"
            >
              {isFavorite ? (
                <FaHeart className="text-red-500 text-sm" />
              ) : (
                <FaRegHeart className="text-slate-400 hover:text-red-400 text-sm transition dark:text-gray-400" />
              )}
            </button>
          </div>

          <h2 className="text-xl font-bold mb-2 text-slate-900 line-clamp-2 hover:text-cyan-600 dark:text-slate-100 dark:hover:text-cyan-400 transition-colors">
            {item.title}
          </h2>

          <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed dark:text-slate-400">
            {item.description || "No description available."}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0">
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white font-semibold px-4 py-2.5 rounded-xl transition duration-200 shadow-md shadow-cyan-500/20 dark:text-slate-950 dark:shadow-cyan-500/10 inline-block text-sm cursor-pointer"
          >
            Read More
          </a>
        )}
      </div>
    </motion.div>
  );
}
