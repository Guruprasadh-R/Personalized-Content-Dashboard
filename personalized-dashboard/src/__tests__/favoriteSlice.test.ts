import favoriteReducer, { addFavorite, removeFavorite, setFavorites } from "@/redux/slices/favoriteSlice";

describe("favoriteSlice reducer", () => {
  const initialState = {
    items: [] as any[],
  };

  it("should return the initial state when passed an empty action", () => {
    expect(favoriteReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle addFavorite and avoid duplicates", () => {
    const item = { id: "1", type: "news", title: "Test News" };
    
    // Add once
    let state = favoriteReducer(initialState, addFavorite(item));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(item);

    // Try adding duplicate
    state = favoriteReducer(state, addFavorite(item));
    expect(state.items).toHaveLength(1);
  });

  it("should handle removeFavorite", () => {
    const item = { id: "1", type: "news", title: "Test News" };
    const populatedState = { items: [item] };

    const state = favoriteReducer(populatedState, removeFavorite("1"));
    expect(state.items).toHaveLength(0);
  });

  it("should handle setFavorites", () => {
    const items = [
      { id: "1", type: "news", title: "Test 1" },
      { id: "2", type: "movie", title: "Test 2" },
    ];
    const state = favoriteReducer(initialState, setFavorites(items));
    expect(state.items).toEqual(items);
  });
});
