<template>
  <div class="space-y-1">
    <button
      v-if="!categoriesLoading"
      :class="[
        'w-full text-left px-4 py-2 rounded-md transition-colors',
        'hover:bg-gray-100 dark:hover:bg-gray-800',
        'text-sm font-medium',
        !currentCategory 
          ? 'bg-gray-100 dark:bg-gray-800 text-primary font-semibold' 
          : 'text-gray-700 dark:text-gray-300'
      ]"
      @click="selectCategory(null)"
    >
      <div class="flex items-center justify-between">
        <span>All Products</span>
        <span 
          v-if="!currentCategory" 
          class="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
        >
          {{ products.length || 0 }}
        </span>
      </div>
    </button>

    <template v-if="categoriesLoading">
      <div v-for="i in 5" :key="i" class="h-10 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"></div>
    </template>

    <template v-else>
      <button
        v-for="(category, index) in categories"
        :key="index"
        :class="[
          'w-full text-left px-4 py-2 rounded-md transition-colors',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'text-sm font-medium',
          currentCategory === category 
            ? 'bg-gray-100 dark:bg-gray-800 text-primary font-semibold' 
            : 'text-gray-700 dark:text-gray-300'
        ]"
        @click="selectCategory(category)"
      >
        <div class="flex items-center justify-between">
          <span class="capitalize">{{ category }}</span>
          <span 
            v-if="currentCategory === category && products.length>0" 
            class="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
          >
            {{ products.length || 0 }}
          </span>
        </div>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useCategories } from '@/composables/productsView/useCategories';
import { useProductsDataCtx } from '@/composables/productsView/useProductsData';

const { products } = useProductsDataCtx();
const {
  categories,
  categoriesLoading,
  currentCategory,
  selectCategory
} =  useCategories();
</script>
