<template>
  <Card 
    class="group relative flex flex-col h-full overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
    @click="navigateToProduct"
  >
    <!-- Favorite Button -->
    <Button
      variant="ghost"
      size="icon"
      class="absolute top-1 right-1 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/60 transition-colors"
      :class="{ 'text-red-500': isFavorite(product.id) }"
      @click.stop="onToggleFavorite"
      :aria-label="isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'"
    >
      <Heart class="h-4 w-4" :class="{ 'fill-current': isFavorite(product.id) }" />
    </Button>
    
    <!-- Product Image -->
    <div class="relative flex items-center justify-center h-36 xs:h-40 sm:h-44 bg-white p-2 sm:p-3">
      <img
        :src="product.image"
        :alt="product.title"
        class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <!-- Category Badge -->
      <div class="absolute bottom-2 left-2 bg-background/90 text-foreground text-xs px-2 py-1 rounded-md capitalize shadow-sm">
        {{ product.category }}
      </div>
    </div>
    
    <!-- Product Info -->
    <div class="flex flex-col flex-grow p-2 sm:p-3">
      <h3 class="font-medium text-foreground text-sm sm:text-base line-clamp-2 mb-0.5 leading-tight">
        {{ product.title }}
      </h3>
      
      <div class="flex items-center justify-between mt-auto pt-1.5 sm:pt-2 border-t border-border">
        <div class="flex items-center space-x-0.5">
          <Star class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-500 fill-current flex-shrink-0" />
          <span class="text-xs sm:text-sm font-medium whitespace-nowrap">
            {{ product.rating?.rate ? product.rating.rate.toFixed(1) : 'N/A' }}
            <span class="text-muted-foreground text-[10px] sm:text-xs">({{ product.rating?.count || 0 }})</span>
          </span>
        </div>
        <div class="text-right">
          <div class="text-base sm:text-lg font-semibold text-foreground leading-none">
            ${{ product.price.toFixed(2) }}
          </div>
          <div v-if="product.price > 100" class="text-[10px] sm:text-xs text-green-600 font-medium whitespace-nowrap">
            Free Shipping
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Heart, Star } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Product } from '@/types';
import { useFavorites } from '@/composables/useFavorites';
import { useRouter } from 'vue-router';

const props = defineProps<{
  product: Product
}>()

const { isFavorite, toggleFavorite } = useFavorites();

const router = useRouter();

const onToggleFavorite = (e: MouseEvent) => {
  e.stopPropagation();
  toggleFavorite(props.product.id);
}

const navigateToProduct = () => {
  router.push(`/product/${props.product.id}`);
}
</script>
