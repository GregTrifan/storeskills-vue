<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { SpinnerLarge } from '@/components/spinners';
import { Badge } from '@/components/ui/badge';
import { useProductDetail } from '@/composables/useProductDetail';
import { ArrowLeft, Heart } from 'lucide-vue-next';
import { useFavorites } from '@/composables/useFavorites';
const route = useRoute();
const productId = Number(route.params.id);
const currentImage = ref('');
const { isFavorite, toggleFavorite } = useFavorites();
const { 
  product, 
  loading: isLoading, 
  formattedRating, 
  formattedPrice,
  fetchProduct: fetchProductDetail
} = useProductDetail();

// Fetch product data when component mounts
onMounted(async () => {
  try {
    await fetchProduct(productId);
    if (product.value) {
      currentImage.value = product.value.image;
    }
  } catch (err) {
    console.error('Error loading product:', err);
  }
});

// Watch for route changes
watch(() => route.params.id, async (newId) => {
  if (newId) {
    await fetchProduct(Number(newId));
    if (product.value) {
      currentImage.value = product.value.image;
    }
  }
});

const fetchProduct = async (id: number) => {
  try {
    await fetchProductDetail(id);
  } catch (err) {
    console.error('Failed to fetch product:', err);
    // Optionally redirect to 404 or show error
  }
};

</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div v-if="isLoading" class="flex items-center justify-center min-h-[50vh]">
      <SpinnerLarge />
    </div>

    <div v-else class="container mx-auto px-4 sm:px-6 lg:px-8">
      <button 
        @click="$router.go(-1)" 
        class="mb-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors group"
      >
        <ArrowLeft class="mr-2 group-hover:-translate-x-1 transition-transform mt-1" :size="18" />
        <span>Back to products</span>
      </button>

      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="lg:flex">
          <!-- Product Image -->
          <div class="lg:w-1/2 p-6">
            <div class="h-full flex items-center justify-center bg-gray-50 rounded-lg p-4">
              <img 
                :src="currentImage || 'https://dummyimage.com/800x600?text=No+Image'" 
                :alt="product?.title || 'Product image'" 
                class="max-h-[500px] w-auto object-contain" 
                @error="currentImage = 'https://dummyimage.com/800x600?text=Image+Not+Available'"
              />
            </div>
          </div>

          <!-- Product Info -->
          <div class="lg:w-1/2 p-8">
            <div class="mb-6">
              <Badge 
                v-if="product?.category" 
                variant="outline" 
                class="text-xs font-medium capitalize mb-4"
              >
                {{ product.category }}
              </Badge>
              
              <div class="flex items-center justify-between mb-2">
                <h1 class="text-3xl font-bold text-gray-900">
                  {{ product?.title }}
                </h1>
                <button 
                  v-if="product"
                  @click.stop="toggleFavorite(product.id)" 
                  class="p-2 -mr-2 text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
                  :class="{ 'text-red-500': isFavorite(product.id) }"
                  :aria-label="isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'"
                >
                  <Heart :size="24" :class="isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'" />
                </button>
              </div>

              <div class="flex items-center mb-4">
                <div class="flex text-yellow-400">
                  <span v-for="i in 5" :key="i">
                    <svg 
                      v-if="i <= Math.round(product?.rating?.rate || 0)" 
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg 
                      v-else 
                      xmlns="http://www.w3.org/2000/svg" 
                      class="h-5 w-5 text-gray-300"
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                </div>
                <span v-if="product?.rating" class="text-gray-600 text-sm ml-2">
                  {{ formattedRating }} ({{ product.rating.count }} reviews)
                </span>
              </div>

              <div class="mb-6">
                <p class="text-3xl font-bold text-gray-900 inline-flex items-baseline">
                  {{ formattedPrice }}
                  <span v-if="product && product.price > 100" class="ml-3 px-2.5 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full flex items-center">
                    Free Shipping
                  </span>
                </p>
              </div>

              <p class="text-gray-700 mb-8 leading-relaxed">
                {{ product?.description }}
              </p>
            </div>

            <!-- Product Details -->
            <div class="mt-8 pt-6 border-t border-gray-200">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
              <div class="space-y-3">
                <div class="flex">
                  <span class="text-gray-500 w-32 flex-shrink-0">Category</span>
                  <span class="text-gray-900 font-medium">{{ product?.category }}</span>
                </div>
                <div class="flex">
                  <span class="text-gray-500 w-32 flex-shrink-0">Rating</span>
                  <div class="flex items-center">
                    <span class="text-yellow-400 mr-1">{{ formattedRating }}</span>
                    <span class="text-gray-500 text-sm">({{ product?.rating?.count }} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
