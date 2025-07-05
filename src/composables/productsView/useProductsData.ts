import { computed, inject, provide, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductsStore, type SortOption } from '@/stores/products';
import type { Product } from '@/types';

// Create a unique injection key
export const ProductsDataKey = Symbol('productsData');

export type ProductsDataContext = {
  // State
  products: Ref<Product[]>;
  searchQuery: Ref<string>;
  sortBy: Ref<SortOption>;
  
  // Methods
  setSearchQuery: (query: string) => void;
  setSortBy: (value: SortOption) => void;
  resetSearch: () => void;
  fetchProducts: () => Promise<void>;
};

export function useProductsData() {
  const productsStore = useProductsStore();
  
  // Destructure store state with storeToRefs to maintain reactivity
  const { 
    products,
    loading, 
    error,
    searchQuery,
    sortBy,
    filterCategory: currentCategory
  } = storeToRefs(productsStore);

  // Computed properties
  const isEmpty = computed(() => !loading.value && products.value.length === 0);

  // Methods
  const setSearchQuery = (query: string) => {
    productsStore.setSearchQuery(query);
  };

  const setSortBy = (value: SortOption) => {
    productsStore.setSortBy(value);
  };

  const resetSearch = () => {
    productsStore.resetSearch();
  };

  const fetchProducts = () => {
    return productsStore.fetchProducts();
  };
  const sortOptions = [
    { value: 'name' as const, label: 'Name (A-Z)' },
    { value: 'price-low' as const, label: 'Price (Low to High)' },
    { value: 'price-high' as const, label: 'Price (High to Low)' },
    { value: 'rating' as const, label: 'Rating' },
  ] as const;

  const handleSearch = (query: string) => {
    productsStore.setSearchQuery(query);
  };

  const handleSortChange = (value: SortOption) => {
    productsStore.setSortBy(value);
  };
  // Provide the context to child components, added some extra methods/vars for further expansion on the UI side
  provide(ProductsDataKey, {
    products,
    setSearchQuery,
    searchQuery,
    sortBy,
    setSortBy,
    resetSearch,
    fetchProducts
  });


  return {
    // State
    products,
    loading,
    error,
    searchQuery,
    sortBy,
    currentCategory,
    isEmpty,
    sortOptions,
    
    // Methods
    setSearchQuery,
    setSortBy,
    resetSearch,
    fetchProducts,
    handleSearch,
    handleSortChange
  };
}

// For injection in children
export function useProductsDataCtx() {
  const context = inject<ProductsDataContext>(ProductsDataKey);
  if (!context) {
    throw new Error('useProductsDataCtx() is called without provider');
  }
  return context;
}

export type ProductsData = ReturnType<typeof useProductsData>;