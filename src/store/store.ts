import { configureStore } from "@reduxjs/toolkit";
// import favoritesReducer from "@/src/features/favorites/favoritesSlice";

export const store = configureStore({
  reducer: {
    // favorites: favoritesReducer,
  },
  // middleware y devTools vienen bien por defecto
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
