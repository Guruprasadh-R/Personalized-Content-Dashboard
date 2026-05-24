import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Feed from "@/components/feed/Feed";
import feedReducer from "@/redux/slices/feedSlice";
import preferenceReducer from "@/redux/slices/preferenceSlice";
import favoriteReducer from "@/redux/slices/favoriteSlice";

// Mock API services to prevent live requests during tests
jest.mock("@/services/newsApi", () => ({
  fetchNews: jest.fn(() => Promise.resolve([])),
}));
jest.mock("@/services/movieApi", () => ({
  fetchMovies: jest.fn(() => Promise.resolve([])),
}));
jest.mock("@/services/socialApi", () => ({
  fetchSocialPosts: jest.fn(() => Promise.resolve([])),
}));

// Mock framer-motion animations
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }: any) => <div className={className} {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock dnd-kit modules
jest.mock("@dnd-kit/core", () => ({
  DndContext: ({ children }: any) => <div>{children}</div>,
  KeyboardSensor: jest.fn(),
  PointerSensor: jest.fn(),
  useSensor: jest.fn(),
  useSensors: jest.fn(),
  closestCenter: jest.fn(),
}));
jest.mock("@dnd-kit/sortable", () => ({
  SortableContext: ({ children }: any) => <div>{children}</div>,
  sortableKeyboardCoordinates: jest.fn(),
  rectSortingStrategy: {},
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    transition: null,
    isDragging: false,
  }),
}));

describe("Feed Component Search Integration", () => {
  it("filters items based on searchQuery from Redux store state", () => {
    // Initialize standard Redux store preloaded with test cards and active search query
    const store = configureStore({
      reducer: {
        preferences: preferenceReducer,
        favorites: favoriteReducer,
        feed: feedReducer,
      },
      preloadedState: {
        preferences: {
          darkMode: true,
          categories: ["technology"],
        },
        favorites: {
          items: [],
        },
        feed: {
          loading: false,
          error: null,
          searchQuery: "React", // Set query to filter items matching "React"
          data: [
            { id: "1", type: "news", title: "React 19 Innovations", description: "All new hooks", image: "", url: "https://react.dev" },
            { id: "2", type: "news", title: "Angular Architecture", description: "Signals and state", image: "", url: "https://angular.io" },
            { id: "3", type: "social", title: "Learning React in 2026", description: "Awesome tips", image: "", url: "" },
          ],
        },
      },
    });

    render(
      <Provider store={store}>
        <Feed />
      </Provider>
    );

    // Verify correct items are visible and filtered items are hidden
    expect(screen.getByText("React 19 Innovations")).toBeInTheDocument();
    expect(screen.getByText("Learning React in 2026")).toBeInTheDocument();
    expect(screen.queryByText("Angular Architecture")).not.toBeInTheDocument();
  });
});
