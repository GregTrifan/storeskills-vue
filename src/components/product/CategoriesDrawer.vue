<template>
  <div>
    <!-- Mobile Categories Button -->
    <Button 
      variant="outline" 
      class="w-full justify-start mb-4 lg:hidden"
      @click="isOpen = true"
    >
      <Menu class="h-4 w-4 mr-2" />
      Categories
    </Button>

    <!-- Mobile Drawer Overlay -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
      @click="isOpen = false"
    ></div>

    <!-- Mobile Drawer -->
    <div 
      ref="drawer"
      class="fixed top-0 left-0 z-50 h-full w-64 bg-background shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="p-4 border-b border-border">
        <h3 class="text-lg font-semibold">Categories</h3>
      </div>
      <div class="p-4 overflow-y-auto h-[calc(100%-56px)]">
        <CategoriesList @select="isOpen = false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-vue-next';
import CategoriesList from '@/components/product/CategoriesList.vue';

const isOpen = ref(false);
const drawer = ref<HTMLElement | null>(null);

// Close drawer when clicking outside on mobile
const handleClickOutside = (event: MouseEvent) => {
  if (drawer.value && !drawer.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

// Add/remove event listener for outside clicks
onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>
