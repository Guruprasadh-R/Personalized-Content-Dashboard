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

interface FeedItem {
  id: string;
  type: string;
  title: string;
  description: string;
  image: string;
  url?: string;
}

function SortableCardWrapper({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
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

  const feedItems = useSelector(
    (state: RootState) => state.feed?.data || []
  ) as FeedItem[];

  const searchQuery = useSelector(
    (state: RootState) => state.feed?.searchQuery || ""
  );

  const activeCategories = useSelector(
    (state: RootState) =>
      state.preferences?.categories || ["technology"]
  );

  const [loading, setLoading] = useState(
    feedItems.length === 0
  );

  const [loadingMore, setLoadingMore] =
    useState(false);

  const [visibleCount, setVisibleCount] =
    useState(6);

  const observerTarget =
    useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),

    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const loadAllContent = async () => {
      if (feedItems.length === 0) {
        setLoading(true);
      }

      try {
        const newsPromises = activeCategories.map(
          (cat: string) => fetchNews(cat)
        );

        const newsResults =
          await Promise.all(newsPromises);

        const flattenedNews =
          newsResults.flat();

        const movies = await fetchMovies();

        const social =
          await fetchSocialPosts();

        const formattedNews =
          flattenedNews.map(
            (item: any, index: number) => ({
              id: `news-${index}-${item.title?.substring(
                0,
                5
              )}`,
              type: "news",
              title: item.title,
              description: item.description,
              image: item.urlToImage,
              url: item.url,
            })
          );

        const formattedMovies =
          movies.map((item: any) => ({
            id: `movie-${item.id}`,
            type: "movie",
            title: item.title,
            description: item.overview,
            image: item.poster_path,
          }));

        const formattedSocial =
          social.map((item: any) => ({
            ...item,
            type: "social",
          }));

        const combined: FeedItem[] = [
          ...formattedNews,
          ...formattedMovies,
          ...formattedSocial,
        ];

        dispatch(setFeedData(combined));
      } catch (error) {
        console.error(
          "Failed to load feed data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadAllContent();
  }, [activeCategories, dispatch]);

  const filteredItems = feedItems.filter(
    (item: FeedItem) => {
      if (!searchQuery) return true;

      const query =
        searchQuery.toLowerCase();

      const titleMatch =
        item.title
          ?.toLowerCase()
          .includes(query);

      const descMatch =
        item.description
          ?.toLowerCase()
          .includes(query);

      const typeMatch =
        item.type
          ?.toLowerCase()
          .includes(query);

      return (
        titleMatch ||
        descMatch ||
        typeMatch
      );
    }
  );

  useEffect(() => {
    const target = observerTarget.current;

    if (!target || loading) return;

    const observer =
      new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            filteredItems.length >
              visibleCount &&
            !loadingMore
          ) {
            setLoadingMore(true);

            setTimeout(() => {
              setVisibleCount(
                (prev) => prev + 3
              );

              setLoadingMore(false);
            }, 800);
          }
        },
        { threshold: 0.1 }
      );

    observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [
    filteredItems.length,
    visibleCount,
    loading,
    loadingMore,
  ]);

  const handleDragEnd = (
    event: DragEndEvent
  ) => {
    const { active, over } = event;

    if (!over || active.id === over.id)
      return;

    const oldIndex =
      feedItems.findIndex(
        (item: FeedItem) =>
          item.id === active.id
      );

    const newIndex =
      feedItems.findIndex(
        (item: FeedItem) =>
          item.id === over.id
      );

    if (
      oldIndex !== -1 &&
      newIndex !== -1
    ) {
      const updatedList = arrayMove(
        feedItems,
        oldIndex,
        newIndex
      );

      dispatch(setFeedData(updatedList));
    }
  };

  const visibleItems: FeedItem[] =
    filteredItems.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <FaSpinner className="animate-spin text-4xl text-cyan-500" />
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <FaSearchMinus className="text-5xl mb-4 text-slate-500" />

        <h2 className="text-2xl font-bold mb-2">
          No Results Found
        </h2>

        <p className="text-slate-400">
          Try another search keyword.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-xs text-slate-500 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 max-w-max">
        Drag and drop cards to reorder your feed
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={visibleItems.map(
            (item: FeedItem) => item.id
          )}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleItems.map(
                (item: FeedItem) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                  >
                    <SortableCardWrapper
                      id={item.id}
                    >
                      <ContentCard item={item} />
                    </SortableCardWrapper>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </SortableContext>
      </DndContext>

      <div
        ref={observerTarget}
        className="h-10 flex items-center justify-center"
      >
        {loadingMore && (
          <div className="flex items-center gap-2 text-slate-400">
            <FaSpinner className="animate-spin" />
            Loading more...
          </div>
        )}
      </div>
    </div>
  );
}