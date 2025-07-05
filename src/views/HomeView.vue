<script setup lang="ts">
import { ChevronRight, Sparkles, Package, Shield, Truck, ShoppingBag } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';

const features = [
  {
    icon: Package,
    title: 'Curated Selection',
    description: 'Handpicked items that meet our high standards of quality and design.'
  },
  {
    icon: Shield,
    title: 'Secure Checkout',
    description: 'Your transactions are protected with bank-level security.'
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    description: 'Quick delivery to your doorstep, wherever you are.'
  }
];
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 -skew-y-3 transform origin-top-left" />
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
        <div class="text-center">
          <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-gray-800 border border-gray-600 mb-6">
            <Sparkles class="w-4 h-4 text-gray-300 mr-2" />
            <span class="text-sm font-medium text-gray-300">New Collection</span>
          </div>
          <h1 class="text-4xl tracking-tight font-bold text-white sm:text-5xl md:text-6xl">
            <span class="block">Elevate Your Style</span>
            <span class="block text-gray-300 mt-2">With Timeless Pieces</span>
          </h1>
          <p class="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
            Discover handcrafted items that blend form and function in perfect harmony.
          </p>
          <div class="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <RouterLink
              to="/products"
              class="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-gray-900 bg-white hover:bg-gray-100 rounded-sm transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span>Explore Collection</span>
              <ChevronRight class="ml-2 h-4 w-4" />
            </RouterLink>
            <RouterLink
              to="/products"
              class="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white border-2 border-gray-600 hover:border-white rounded-sm transition-all duration-200"
            >
              <ShoppingBag class="mr-2 h-4 w-4" />
              <span>Shop Now</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="group p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg"
          >
            <div class="flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 group-hover:bg-gray-100 mb-6 transition-colors duration-200">
              <component :is="feature.icon" class="w-5 h-5 text-gray-900" />
            </div>
            <h3 class="text-xl font-medium text-gray-900 mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-gray-900 py-24">
      <div class="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-white sm:text-4xl">
          Ready to transform your shopping experience?
        </h2>
        <p class="mt-4 text-lg text-gray-300">
          Join thousands of satisfied customers who trust us for quality and style.
        </p>
        <div class="mt-8">
          <RouterLink
            to="/products"
            class="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-gray-900 bg-white hover:bg-gray-100 rounded-sm transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span>Start Shopping</span>
            <ShoppingBag class="ml-2 h-5 w-5" />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles here if needed */
</style>
