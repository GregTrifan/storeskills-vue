import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductsStore } from '@/stores/products';
import { useCategoriesStore } from '@/stores/categories';

export function useCategories() {
  const productsStore = useProductsStore();
  const categoriesStore = useCategoriesStore();
  
  // State
  const isCategoriesDrawerOpen = ref(false);
  
  // Get categories from store
  const { items: categories, loading: categoriesLoading } = storeToRefs(categoriesStore);
  const { filterCategory: currentCategory } = storeToRefs(productsStore);

  const selectCategory = (category: string | null) => {
    productsStore.setFilterCategory(category);
    isCategoriesDrawerOpen.value = false;
  };

  return {
    // State
    categories,
    categoriesLoading,
    currentCategory,
    
    // Methods
    selectCategory,
  };
}

export type Categories = ReturnType<typeof useCategories>;