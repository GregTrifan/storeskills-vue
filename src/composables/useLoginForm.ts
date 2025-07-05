import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import type { LoginCredentials } from '@/types';


interface LoginFormReturn {
  form: Ref<LoginCredentials>;
  errors: Ref<Record<string, string>>; // Changed to allow string keys for better flexibility
  error: Ref<string>;
  success: Ref<boolean>;
  successMessage: Ref<string>;
  isLoading: Ref<boolean>;
  performLogin: () => Promise<boolean>;
  clearError: (field?: string) => void; // Changed to string for better compatibility
  validate: () => boolean;
  setSuccess: (message: string) => void;
  onInput: (field: string) => void; // Added this to match LoginView usage
}

// Simple auth composable, since the auth itself is kinda basic (just a token from API)
export function useLoginForm(): LoginFormReturn {
  const authStore = useAuthStore();
  const router = useRouter();
  const error = ref<string>('');
  const success = ref<boolean>(false);
  const successMessage = ref<string>('');
  const isLoading = ref<boolean>(false);
  const form = ref<LoginCredentials>({
    username: '',
    password: ''
  });
  const errors = ref<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!form.value.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (form.value.username.trim().length < 2) {
      newErrors.username = 'Username must be at least 2 characters';
    }
    
    if (!form.value.password) {
      newErrors.password = 'Password is required';
    } else if (form.value.password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
    }
    
    errors.value = newErrors;
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field?: string): void => {
    if (field) {
      const newErrors = { ...errors.value };
      delete newErrors[field];
      errors.value = newErrors;
    } else {
      error.value = '';
      errors.value = {};
      success.value = false;
      successMessage.value = '';
    }
  };

  const setSuccess = (message: string): void => {
    success.value = true;
    successMessage.value = message;
    error.value = '';
    errors.value = {};
  };

  const performLogin = async (): Promise<boolean> => {
    if (!validate()) return false;
    
    error.value = '';
    isLoading.value = true;

    try {
      const loginSuccess = await authStore.login({
        username: form.value.username.trim(),
        password: form.value.password
      } as LoginCredentials);

      if (!loginSuccess) {
        error.value = 'Invalid username or password';
        return false;
      }

      // Get redirect URL from query params or default to '/products'
      const urlParams = new URLSearchParams(window.location.search);
      const redirectTo = urlParams.get('redirect') || '/products';
      
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        router.push(redirectTo);
      }, 1500);
      return true;
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const onInput = (field: string): void => {
    if (errors.value[field]) {
      clearError(field);
    }
  };

  return {
    form,
    errors,
    error,
    success,
    successMessage,
    isLoading,
    performLogin,
    clearError,
    validate,
    setSuccess,
    onInput
  };
}
