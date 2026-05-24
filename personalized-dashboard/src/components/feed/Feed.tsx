"use client";

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setFeedData } from "@/redux/slices/feedSlice";
import ContentCard from "../cards/ContentCard";
import { fetchNews } from "@/services/newsApi";
import { fetchMovies } from "@/services/movieApi";
import { fetchSocialPosts } from "@/services/socialApi";
import { FaSearchMinus, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// dnd-kit imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

// Individual Sortable Card wrapper
function SortableCardWrapper({ id, children }: { id: string; children: React.ReactNode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="h-full select-none"
    >
      {children}
    </div>
  );
}

export default function Feed() {
  const dispatch = useDispatch();
  
  // Select states from Redux with bulletproof optional chaining and fallback defaults
  const feedItems = useSelector((state: RootState) => state.feed?.data || []);
  const searchQuery = useSelector((state: RootState) => state.feed?.searchQuery || "");
  const activeCategories = useSelector((state: RootState) => state.preferences?.categories || ["technology"]);

  const [loading, setLoading] = useState(feedItems.length === 0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Setup sensors for dnd-kit with distance constraints so click events still work
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Drag initiates only after moving cursor 8px
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 1. Initial Data Fetching based on chosen categories
  useEffect(() => {
    const loadAllContent = async () => {
      if (feedItems.length === 0) {
        setLoading(true);
      }
      try {
        // Fetch news for all selected categories in parallel
        const newsPromises = activeCategories.map((cat) => fetchNews(cat));
        const newsResults = await Promise.all(newsPromises);
        const flattenedNews = newsResults.flat();

        const movies = await fetchMovies();
        const social = await fetchSocialPosts();

        // Format all types dynamically
        const formattedNews = flattenedNews.map((item: any, index: number) => ({
          id: `news-${index}-${item.title?.substring(0, 5)}`,
          type: "news",
          title: item.title,
          description: item.description,
          image: item.urlToImage,
          url: item.url,
        }));

        const formattedMovies = movies.map((item: any) => ({
          id: `movie-${item.id}`,
          type: "movie",
          title: item.title,
          description: item.overview,
          image: item.poster_path,
        }));

        const formattedSocial = social.map((item: any) => ({
          ...item,
          type: "social",
        }));

        // Combine into unified feed
        const combined = [...formattedNews, ...formattedMovies, ...formattedSocial];
        dispatch(setFeedData(combined));
      } catch (error) {
        console.error("Failed to load feed data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAllContent();
  }, [activeCategories, dispatch]);

  // 2. Filter feed items dynamically based on search query
  const filteredItems = feedItems.filter((item: any) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const titleMatch = item.title?.toLowerCase().includes(query);
    const descMatch = item.description?.toLowerCase().includes(query);
    const typeMatch = item.type?.toLowerCase().includes(query);
    return titleMatch || descMatch || typeMatch;
  });

  // 3. Infinite Scroll: Setup Intersection Observer
  useEffect(() => {
    const target = observerTarget.current;
    if (!target || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && filteredItems.length > visibleCount && !loadingMore) {
          setLoadingMore(true);
          // Simulate loading latency for a luxurious UI experience
          setTimeout(() => {
            setVisibleCount((prev) => prev + 3);
            setLoadingMore(false);
          }, 800);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [filteredItems.length, visibleCount, loading, loadingMore]);

  // 4. Handle Drag End and Reorder
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = feedItems.findIndex((item: any) => item.id === active.id);
    const newIndex = feedItems.findIndex((item: any) => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const updatedList = arrayMove(feedItems, oldIndex, newIndex);
      dispatch(setFeedData(updatedList));
    }
  };

  const visibleItems = filteredItems.slice(0, visibleCount);

  // Loading Skeleton State
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden h-[420px] flex flex-col justify-between animate-pulse dark:bg-slate-900/60 dark:border-slate-800/80"
          >
            <div>
              <div className="h-52 bg-slate-200 w-full dark:bg-slate-800/50" />
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-6 bg-slate-200 w-16 rounded-full dark:bg-slate-800/50" />
                  <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800/50" />
                </div>
                <div className="h-6 bg-slate-200 w-3/4 rounded-lg mb-3 dark:bg-slate-800/50" />
                <div className="h-4 bg-slate-200 w-full rounded-lg mb-2 dark:bg-slate-800/50" />
                <div className="h-4 bg-slate-200 w-5/6 rounded-lg dark:bg-slate-800/50" />
              </div>
            </div>
            <div className="p-5 pt-0">
              <div className="h-10 bg-slate-200 w-full rounded-xl dark:bg-slate-800/50" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Search/Filters Empty State
  if (filteredItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center bg-white border border-slate-200 rounded-3xl p-8 dark:bg-slate-900/40 dark:border-slate-800/80 backdrop-blur"
      >
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-6 border border-slate-200 shadow-md dark:bg-slate-800/80 dark:border-slate-700/60">
          <FaSearchMinus className="text-slate-500 text-2xl dark:text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-1 dark:text-slate-200">No Results Match Your Search</h3>
        <p className="text-slate-600 max-w-sm text-sm leading-relaxed dark:text-slate-500">
          We couldn't find any articles, movies, or social posts matching "{searchQuery}". Try broadening your keywords.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Alert Note for Drag & Drop functionality */}
      <div className="text-xs text-slate-600 font-medium bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-2 max-w-max dark:text-slate-500 dark:bg-slate-900/40 dark:border-slate-800/80">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span>Tip: Drag and drop cards to custom-order your feed layout!</span>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={visibleItems.map((item) => item.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <SortableCardWrapper id={item.id}>
                    <ContentCard item={item} />
                  </SortableCardWrapper>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>
      </DndContext>

      {/* Infinite Scroll Trigger Section */}
      <div ref={observerTarget} className="h-10 w-full flex items-center justify-center mt-6">
        {loadingMore && (
          <div className="flex items-center gap-2.5 text-slate-600 text-sm font-medium dark:text-slate-400">
            <FaSpinner className="animate-spin text-cyan-500 text-lg" />
            <span>Loading older updates...</span>
          </div>
        )}
      </div>
    </div>
  );
}
