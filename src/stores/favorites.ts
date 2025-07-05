import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

const FAVORITES_KEY = 'favorites';

export const useFavoritesStore = defineStore('favorites', () => {
  // Initialize from localStorage if available
  const ids = ref<number[]>([]);
  
  // Load favorites from localStorage
  const loadFavorites = () => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        ids.value = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse favorites from localStorage', e);
        localStorage.removeItem(FAVORITES_KEY);
      }
    }
  };

  // Save to localStorage when favorites change
  watch(ids, (newIds) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newIds));
  }, { deep: true });

  // Actions
  const toggleFavorite = (productId: number) => {
    const index = ids.value.indexOf(productId);
    if (index === -1) {
      ids.value.push(productId);
    } else {
      ids.value.splice(index, 1);
    }
  };

  const isFavorite = (productId: number) => {
    return ids.value.includes(productId);
  };

  const clearFavorites = () => {
    ids.value = [];
  };

  // Load favorites on store initialization
  loadFavorites();

  return {
    // State
    ids,
    
    // Getters
    isFavorite,
    
    // Actions
    toggleFavorite,
    clearFavorites,
  };
});
