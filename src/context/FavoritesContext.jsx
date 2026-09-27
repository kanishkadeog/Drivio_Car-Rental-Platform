// car-rental-platform/src/context/FavoritesContext.jsx

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const FavoritesContext = createContext(null);

const STORAGE_KEY = "velocity-favorites";

const readFavorites = () => {
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );
  } catch {
    return [];
  }
};

export const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] =
    useState(readFavorites);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(favoriteIds)
    );
  }, [favoriteIds]);

  const toggleFavorite = (carId) => {
    setFavoriteIds((current) => {
      if (current.includes(carId)) {
        return current.filter(
          (id) => id !== carId
        );
      }

      return [...current, carId];
    });
  };

  const isFavorite = (carId) =>
    favoriteIds.includes(carId);

  const value = useMemo(
    () => ({
      favoriteIds,
      favoriteCount: favoriteIds.length,
      toggleFavorite,
      isFavorite,
    }),
    [favoriteIds]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
};