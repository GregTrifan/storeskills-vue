import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService } from '@/services';
import type { LoginCredentials } from '@/types';

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref<string | null>(authService.getToken());
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!token.value||authService.isAuthenticated());

  // Actions
  const setToken = (newToken: string | null) => {
    token.value = newToken;
  };

  /**
   * Log in a user with username and password
   */
  const login = async (credentials: LoginCredentials) => {
    loading.value = true;
    error.value = null;
    
    try {
      const { token: authToken } = await authService.login({
        username: credentials.username.trim(),
        password: credentials.password
      });
      
      // Update state with the new token
      setToken(authToken);
      
      return true;
    } catch (err: any) {
      // Only update error state if it's not a validation error from the service
      if (err.message !== 'Please enter both username and password') {
        error.value = err.message || 'Login failed. Please check your credentials.';
      }
      throw err; // Re-throw to allow the composable to handle it
    } finally {
      loading.value = false;
    }
  };

  /**
   * Log out the current user
   */
  const logout = () => {
    // Clear the token
    setToken(null);
    
    // Clear the token from storage
    authService.logout();
  };

  /**
   * Initialize the auth state
   */
  const initialize = () => {
    // Check if we have a valid token in storage
    const storedToken = authService.getToken();
    if (storedToken) {
      setToken(storedToken);
    }
  };

  // Initialize the store
  initialize();

  return {
    // State
    token,
    loading,
    error,
    
    // Getters
    isAuthenticated,
    
    // Actions
    login,
    logout,
    initialize
  };
});
