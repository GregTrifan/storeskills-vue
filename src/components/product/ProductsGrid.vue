<template>
  <div class="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script setup lang="ts">
import ProductCard from './ProductCard.vue';
import { useProductsDataCtx } from '@/composables/productsView/useProductsData';

const { products } = useProductsDataCtx();
</script>
