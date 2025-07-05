import { computed } from 'vue';
import { useProductDetailStore } from '@/stores/productDetailStore';

export function useProductDetail() {
  const store = useProductDetailStore();

  const product = computed(() => store.currentProduct);
  const loading = computed(() => store.loading);
  const error = computed(() => store.error);

  const fetchProduct = async (id: number) => {
    return await store.fetchProductById(id);
  };

  const clearProduct = () => {
    store.clearProduct();
  };

  // Format rating to show 1 decimal place
  const formattedRating = computed(() => {
    if (!product.value) return '0.0';
    return product.value.rating.rate.toFixed(1);
  });

  // Format price with 2 decimal places and currency
  const formattedPrice = computed(() => {
    if (!product.value) return '$0.00';
    return `$${product.value.price.toFixed(2)}`;
  });

  return {
    product,
    loading,
    error,
    fetchProduct,
    clearProduct,
    formattedRating,
    formattedPrice
  };
}
