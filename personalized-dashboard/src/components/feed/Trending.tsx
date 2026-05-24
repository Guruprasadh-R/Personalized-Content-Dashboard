"use client";

import { useEffect, useState, useRef } from "react";
import { fetchNews } from "@/services/newsApi";
import { fetchMovies } from "@/services/movieApi";
import { motion } from "framer-motion";
import { FaFire, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Trending() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const news = await fetchNews();
        const movies = await fetchMovies();

        // Blend trending content: grab first 4 of each
        const formattedNews = news.slice(0, 4).map((item: any, i: number) => ({
          id: `trend-news-${i}`,
          type: "news",
          title: item.title,
          image: item.urlToImage,
          url: item.url,
        }));

        const formattedMovies = movies.slice(0, 4).map((item: any) => ({
          id: `trend-movie-${item.id}`,
          type: "movie",
          title: item.title,
          image: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
        }));

        setItems([...formattedNews, ...formattedMovies]);
      } catch (error) {
        console.error("Failed to load trending items:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTrending();
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading || items.length === 0) return null;

  return (
    <div className="mb-12 relative">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
            <FaFire className="text-amber-500 text-sm animate-bounce" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight dark:text-slate-100">Trending Now</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScroll("left")}
            className="p-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 transition cursor-pointer dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <FaChevronLeft className="text-xs" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="p-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 transition cursor-pointer dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <FaChevronRight className="text-xs" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((item, index) => (
          <motion.a
            key={item.id}
            href={item.url || "#"}
            target={item.url ? "_blank" : "_self"}
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className="flex-shrink-0 w-80 h-44 rounded-2xl border border-slate-200 bg-slate-100 overflow-hidden relative group snap-start block shadow-md cursor-pointer dark:border-slate-800/80 dark:bg-slate-900/60"
          >
            <img
              src={item.image || "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=600&auto=format&fit=crop&q=80"}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent dark:from-slate-950 dark:via-slate-950/60" />

            <div className="absolute bottom-4 left-4 right-4 flex flex-col justify-end">
              <span className={`self-start text-[10px] uppercase tracking-wide font-extrabold px-2 py-0.5 rounded-full mb-2 border ${
                item.type === "news" 
                  ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" 
                  : "bg-purple-500/10 text-purple-400 border-purple-500/20"
              }`}>
                {item.type}
              </span>
              <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-cyan-200 dark:group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
