import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { productService } from '@/services';

interface CategoriesState {
  items: string[];
  loading: boolean;
  error: string | null;
}

export const useCategoriesStore = defineStore('categories', () => {
  // State
  const state = ref<CategoriesState>({
    items: [],
    loading: false,
    error: null
  });

  // Getters
  const items = computed(() => state.value.items);
  const loading = computed(() => state.value.loading);
  const error = computed(() => state.value.error);

  // Actions
  const setCategories = (newItems: string[]) => {
    state.value.items = newItems;
    state.value.error = null;
  };

  const setLoading = (isLoading: boolean) => {
    state.value.loading = isLoading;
  };

  const setError = (errorMessage: string | null) => {
    state.value.error = errorMessage;
  };

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const categories = await productService.getCategories();
      setCategories(categories);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch categories');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  fetchCategories();

  return {
    // State
    items,
    loading,
    error,
    
    // Actions
    fetchCategories,
    setCategories,
    setLoading,
    setError,
  };
});
