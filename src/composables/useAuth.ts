import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

export const useAuth = () => {
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);
  const router = useRouter();

  const logout = async () => {
    try {
      authStore.logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return {
    isAuthenticated,
    logout
  };
};
