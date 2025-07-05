import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { productService } from '@/services';
import type { Product } from '@/types';

export type SortOption = 'name' | 'price-low' | 'price-high' | 'rating';

export const useProductsStore = defineStore('products', () => {
  // State
  const items = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const searchQuery = ref('');
  const sortBy = ref<SortOption>('name');
  const filterCategory = ref<string | null>(null);

  // Getters
  const filteredProducts = computed(() => {
    let result = [...items.value];
    
    // Apply category filter
    if (filterCategory.value) {
      result = result.filter(p => p.category === filterCategory.value);
    }
    
    // Apply search query
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.trim().toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortBy.value) {
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
    }
    
    return result;
  });

  // Actions
  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      items.value = await productService.getAll();
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch products';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchProductsByCategory = async (category: string) => {
    loading.value = true;
    error.value = null;
    
    try {
      items.value = await productService.getByCategory(category);
      filterCategory.value = category;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch products by category';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
  };

  const setSortBy = (sort: SortOption) => {
    sortBy.value = sort;
  };

  const setFilterCategory = (category: string | null) => {
    filterCategory.value = category;
    
    // If a category is set, fetch products for that category
    if (category) {
      fetchProductsByCategory(category);
    } else {
      // Otherwise, fetch all products
      fetchProducts();
    }
  };

  const resetSearch = () => {
    searchQuery.value = '';
    filterCategory.value = null;
    sortBy.value = 'name';
  };

  return {
    // State
    products: filteredProducts,
    items, // Keep for backward compatibility
    loading,
    error,
    searchQuery,
    sortBy,
    filterCategory,
    
    // Getters
    filteredProducts,
    
    // Actions
    fetchProducts,
    fetchProductsByCategory,
    setSearchQuery,
    setSortBy,
    setFilterCategory,
    resetSearch,
  };
});
