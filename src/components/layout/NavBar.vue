<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { useAuth } from '@/composables/useAuth';
import { LogOut, LogIn } from 'lucide-vue-next';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const { isAuthenticated, logout } = useAuth();
const route = useRoute();

const isLoginPage = computed(() => route.path === '/login');
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-16 items-center justify-between">
      <div class="flex items-center space-x-4">
        <RouterLink to="/" class="flex items-center space-x-2 ml-4">
          <span class="font-bold text-xl">StoreSkills</span>
        </RouterLink>
      </div>
      
      <div v-if="!isLoginPage" class="flex items-center space-x-2 mr-4">
        <RouterLink v-if="!isAuthenticated" to="/login">
          <Button variant="ghost" class="text-foreground hover:bg-accent hover:text-accent-foreground">
            <LogIn class="mr-2 h-4 w-4" />
            <span>Login</span>
          </Button>
        </RouterLink>
        <Button
          v-if="isAuthenticated"
          variant="ghost"
          class="text-foreground hover:bg-accent hover:text-accent-foreground"
          @click="logout"
        >
          <LogOut class="mr-2 h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  </header>
</template>
