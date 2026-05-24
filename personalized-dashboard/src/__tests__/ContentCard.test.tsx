import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ContentCard from "@/components/cards/ContentCard";
import favoriteReducer from "@/redux/slices/favoriteSlice";
import preferenceReducer from "@/redux/slices/preferenceSlice";

// Mock framer-motion to bypass animation triggers in jsdom
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }: any) => <div className={className} {...props}>{children}</div>,
  },
}));

describe("ContentCard Component", () => {
  const mockItem = {
    id: "news1",
    type: "news",
    title: "Revolution in Artificial Intelligence",
    description: "AI is reshaping our daily routines and software paradigms.",
    image: "https://images.unsplash.com/photo-1518770660439-4636195",
    url: "https://example.com/ai",
  };

  it("renders card details correctly", () => {
    // Configure isolated store for the card test
    const store = configureStore({
      reducer: {
        favorites: favoriteReducer,
        preferences: preferenceReducer,
      },
      preloadedState: {
        favorites: { items: [] },
        preferences: { darkMode: true, categories: ["technology"] },
      },
    });

    render(
      <Provider store={store}>
        <ContentCard item={mockItem} />
      </Provider>
    );

    expect(screen.getByText("Revolution in Artificial Intelligence")).toBeInTheDocument();
    expect(screen.getByText("AI is reshaping our daily routines and software paradigms.")).toBeInTheDocument();
    expect(screen.getByText("news")).toBeInTheDocument();
    
    const readMoreLink = screen.getByRole("link", { name: "Read More" });
    expect(readMoreLink).toBeInTheDocument();
    expect(readMoreLink).toHaveAttribute("href", "https://example.com/ai");
  });
});
