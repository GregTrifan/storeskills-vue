import { useFavoritesStore } from '@/stores/favorites';

export function useFavorites() {
  const favoritesStore = useFavoritesStore();
  
  return {
    isFavorite: favoritesStore.isFavorite,
    toggleFavorite: favoritesStore.toggleFavorite
  };
}

export type Favorites = ReturnType<typeof useFavorites>;