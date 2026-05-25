import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type {Dragon} from '../types'

type FavoritesContextType = {
  favorites: Dragon[];
  addFavorite: (dragon: Dragon) => void;
  removeFavorite: (dragonId: number) => void;
  isFavorite: (dragonId: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

type FavoritesProviderProps = {
  children: ReactNode;
};

export function FavoritesProvider({
  children,
}: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Dragon[]>([]);

  function addFavorite(dragon: Dragon) {
    setFavorites((prev) => {
      const exists = prev.find(
        (item) => item.id === dragon.id
      );

      if (exists) return prev;

      return [...prev, dragon];
    });
  }

  function removeFavorite(dragonId: number) {
    setFavorites((prev) =>
      prev.filter((dragon) => dragon.id !== dragonId)
    );
  }

  function isFavorite(dragonId: number) {
    return favorites.some(
      (dragon) => dragon.id === dragonId
    );
  }

  const value: FavoritesContextType = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites debe usarse dentro de FavoritesProvider"
    );
  }

  return context;
}