import { api } from '@/lib/api';

interface LoginResponse {
  token: string;
}

export const authService = {
  /**
   * Log in a user with FakeStoreAPI
   * @param credentials The login credentials
   * @returns The authentication token
   */
  async login(credentials: { username: string; password: string }): Promise<{ token: string }> {
    // Basic validation
    if (!credentials.username || !credentials.password) {
      throw new Error('Please enter both username and password');
    }

    try {
      const response = await api.post<LoginResponse>('/auth/login', {
        username: credentials.username,
        password: credentials.password
      });
      
      if (!response?.token) {
        throw new Error('Authentication failed: No token received');
      }
      
      // Store the token in localStorage
      localStorage.setItem('token', response.token);
      
      return { token: response.token };
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          throw new Error('Invalid username or password');
        } else if (error.response.data?.message) {
          throw new Error(error.response.data.message);
        } else {
          throw new Error(`Authentication failed: ${error.response.status} ${error.response.statusText}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('Unable to connect to the server. Please check your connection.');
      } else {
        // Something happened in setting up the request
        throw new Error('An error occurred while processing your request');
      }
    }
  },

  /**
   * Check if user is authenticated
   * @returns boolean indicating if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  /**
   * Get the stored token
   * @returns The stored token or null if not found
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  },

  /**
   * Log out the current user
   */
  logout(): void {
    localStorage.removeItem('token');
  }
};
