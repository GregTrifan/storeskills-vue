<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { useAuth } from '@/composables/useAuth';
import { LogOut, LogIn } from 'lucide-vue-next';
import { useRoute } from 'vue-router';
import { computed, ref, onMounted, onUnmounted } from 'vue';

const { isAuthenticated, logout } = useAuth();
const route = useRoute();

const isLoginPage = computed(() => route.path === '/login');
const lastScrollY = ref(0);
const isVisible = ref(true);

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY <= 0) {
    // At the top of the page
    isVisible.value = true;
  } else if (currentScrollY < lastScrollY.value) {
    // Scrolling up - show
    isVisible.value = true;
  } else if (currentScrollY > 0) {
    // Scrolling down - hide immediately
    isVisible.value = false;
  }
  
  lastScrollY.value = currentScrollY;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <!-- Invisible spacer to maintain layout when navbar is hidden -->
  <div class="h-16 w-full"></div>
  
  <header 
    class="fixed top-0 left-0 right-0 z-50 w-full bg-zinc-900/95 text-white shadow-md backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60 transition-transform duration-200"
    :class="{ 'transform -translate-y-full': !isVisible }"
  >
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex-1">
        <RouterLink to="/" class="inline-flex items-center hover:text-zinc-200 transition-colors">
          <span class="font-bold text-xl">StoreSkills</span>
        </RouterLink>
      </div>
      
      <div v-if="!isLoginPage" class="flex items-center justify-end flex-1">
        <div class="flex space-x-2">
          <RouterLink v-if="!isAuthenticated" to="/login" class="flex items-center">
            <Button variant="ghost" class="text-white/90 hover:bg-zinc-800/80 hover:text-white">
              <LogIn class="mr-2 h-4 w-4" />
              <span>Login</span>
            </Button>
          </RouterLink>
          <Button
            v-if="isAuthenticated"
            variant="ghost"
            class="text-white/90 hover:bg-zinc-800/80 hover:text-white"
            @click="logout"
          >
            <LogOut class="mr-2 h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>
