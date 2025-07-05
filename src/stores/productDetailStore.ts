import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Product } from '@/types';
import { productService } from '@/services';

export const useProductDetailStore = defineStore('productDetail', () => {
  const currentProduct = ref<Product | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProductById = async (id: number) => {
    if (currentProduct.value?.id === id) return;
    
    loading.value = true;
    error.value = null;
    
    try {
      currentProduct.value = await productService.getById(id);
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch product';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const clearProduct = () => {
    currentProduct.value = null;
    error.value = null;
  };

  return {
    currentProduct,
    loading,
    error,
    fetchProductById,
    clearProduct
  };
});
